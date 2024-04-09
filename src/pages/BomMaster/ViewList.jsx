import React, { useEffect, useState } from "react";
import {
  Button,
  Datepicker,
  Label,
  Select,
  TextInput,
  ToggleSwitch,
  Modal,
  Checkbox,
  Table,
  FileInput,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteBoms,
  getBomByProductCode,
  updateBoms,
} from "../../slices/saveBomSlice";
import { NavLink } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import { CiImport } from "react-icons/ci";
import { AiFillDelete, AiOutlineAudit } from "react-icons/ai";
import {
  Audit,
  DownloadExcel,
  DownloadPdf,
} from "../../slices/ItemMasterSlice";
import { BsPencil } from "react-icons/bs";
import { useForm } from "react-hook-form";
import UpdateBom from "./UpdateBom";

const ViewList = () => {
  const { allBomsByProductCode } = useSelector((state) => state?.newBom);
  console.log("boms Jsx: ", allBomsByProductCode);
  const dispatch = useDispatch();
  const [openImportModal, setOpenImportModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(50);
  const [editData, setEditData] = useState();
  const { audit } = useSelector((state) => state?.item);
  const [pcode, setPcode] = useState("");
  const [pagination, setPagination] = useState({
    limit: 10,
    totalPages: 50,
    pageNumber: 1,
  });
  let filterBoms;
  const [id, setId] = useState(null);
  const [itemCode, setitemCode] = useState("");
  const [openUpdateModal, setopenUpdateModal] = useState(false);
  const roles = localStorage.getItem("userRole");
  console.log("item master Role: ", roles);

  const handleUpdateModal = (id, item_code) => {
    console.log(allBomsByProductCode, "allBomsByProductCode");
    // setId(id);
    // setitemCode(item_code);
    setopenUpdateModal(true);
    filterBoms = allBomsByProductCode.filter((bom) => {
      return bom.id === id && bom.item_code === item_code;
      // console.log(bom.id);
      // console.log("id: ", id);
    });
    setEditData(filterBoms);
    setId(id);
    setitemCode(item_code);
  };
  useEffect(() => {}, [editData]);
  useEffect(() => {
    dispatch(Audit());
  }, [dispatch]);
  // useEffect(() => {
  //   fetchData();
  // }, [pagination?.pageNumber, productCode]);
  useEffect(() => {
    fetchData();
  }, [productCode]);
  const fetchData = () => {
    dispatch(getBomByProductCode({ productCode }));
  };
  const handleProductCodeChange = (e) => {
    setProductCode(e.target.value);
  };

  // const handlePagination = (action) => {
  //   console.log(
  //     "pagination?.pageNumber < totalPages",
  //     pagination?.pageNumber < pagination?.totalPages
  //   );
  //   if (action === "prev" && pagination?.pageNumber > 1) {
  //     // setPageNumber(pageNumber - 1);
  //     setPagination((prevValues) => ({
  //       ...prevValues,
  //       pageNumber: prevValues.pageNumber - 1,
  //     }));
  //   } else if (
  //     action === "next" &&
  //     pagination?.pageNumber < pagination?.totalPages
  //   ) {
  //     console.log("hi");
  //     setPagination((prevValues) => ({
  //       ...prevValues,
  //       pageNumber: prevValues.pageNumber + 1,
  //     }));
  //   }
  //   console.log("Action: ", action);
  // };
  useEffect(() => {
    console.log("pageNumber in effect", pageNumber);
  }, [pageNumber]);
  const handleDelete = (product_code) => {
    console.log(product_code);
    dispatch(deleteBoms(product_code)).then(() => {
      getBomByProductCode({ productCode });
    });
  };
  const handleExcelClick = () => {
    dispatch(DownloadExcel())
      .then((response) => {
        // Create blob link to download
        const blob = new Blob([response.data]);
        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Download.xlsx"); // Specify filename for the download
        // Simulate click on the anchor element to trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading Execl file:", error);
      });
  };
  const handlePdfClick = () => {
    dispatch(DownloadPdf({ test: "test" }))
      .then((response) => {
        // Create blob link to download
        const blob = new Blob([response.data]);
        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Download.pdf"); // Specify filename for the download
        // Simulate click on the anchor element to trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF file:", error);
      });
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
        <div className="bg-white mb-4 md:mb-0 py-6 px-6 shadow-md rounded-xl w-full">
          <div className="my-5">
            {roles === "ROLE_HREXECUTIVE" ||
            roles === "ROLE_HRSUPERVISOR" ||
            roles === "ROLE_USER" ||
            roles === "ROLE_QAEXECUTIVE" ||
            roles === "ROLE_WHEXECUTIVE" ||
            roles === "ROLE_WHSUPERVISOR" ||
            roles === "ROLE_WHMANAGER" ? (
              <>
                <h1>You have No Piviledge</h1>
              </>
            ) : (
              <div className="overflow-x-auto">
                {/* <div className="grid grid-cols-5 gap-6">
          <div className="flex items-center">
            <p className="text-[13px] font-semibold mr-1 w-16">P.Code:</p>
            <TextInput
              id="base"
              type="text"
              sizing="md"
              className="w-full"
              value={productCode}
              onChange={handleProductCodeChange}
            />
          </div>
        </div> */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="flex items-center">
                    <p className="text-[13px] font-semibold mr-1 w-16">
                      P.Code:
                    </p>
                    <TextInput
                      id="base"
                      type="text"
                      sizing="md"
                      className="w-full"
                      value={productCode}
                      onChange={handleProductCodeChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="text-[13px] font-semibold mr-1 w-16">
                      P.Name:
                    </p>
                    <TextInput
                      id="base"
                      type="text"
                      sizing="md"
                      className="w-full"
                      value={
                        (Array.isArray(allBomsByProductCode) &&
                          allBomsByProductCode[0]?.product_name) ||
                        ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="text-[13px] font-semibold mr-1 w-16">
                      Market:
                    </p>
                    <TextInput
                      id="base"
                      type="text"
                      sizing="md"
                      className="w-full"
                      value={
                        (Array.isArray(allBomsByProductCode) &&
                          allBomsByProductCode[0]?.market) ||
                        ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="text-[13px] font-semibold mr-1 w-16">
                      Stage:
                    </p>
                    <TextInput
                      id="base"
                      type="text"
                      sizing="md"
                      className="w-full"
                      value={
                        (Array.isArray(allBomsByProductCode) &&
                          allBomsByProductCode[0]?.stage) ||
                        ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="text-[13px] font-semibold mr-1 w-16">
                      Pack Mode:
                    </p>
                    <TextInput
                      id="base"
                      type="text"
                      sizing="md"
                      className="w-full"
                      value={
                        (Array.isArray(allBomsByProductCode) &&
                          allBomsByProductCode[0]?.pack_mode) ||
                        ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="text-[13px] font-semibold mr-1 w-16">
                      Block:
                    </p>
                    <TextInput
                      id="base"
                      type="text"
                      sizing="md"
                      value={
                        (Array.isArray(allBomsByProductCode) &&
                          allBomsByProductCode[0]?.block_code) ||
                        ""
                      }
                      readOnly
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="text-[13px] font-semibold mr-1 w-16">Unit:</p>
                    <TextInput
                      id="base"
                      type="text"
                      sizing="md"
                      value={
                        (Array.isArray(allBomsByProductCode) &&
                          allBomsByProductCode[0]?.unit_code) ||
                        ""
                      }
                      readOnly
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="mr-4 mt-4 relative z-10 mb-4">
                  <ul className="flex justify-end items-center">
                    <li className="Download_point ml-2" title="Download">
                      <FaFileDownload className="text-[22px] hover:text-[#556ee6] cursor-pointer" />
                      <ul>
                        <li>
                          <NavLink to="/view-bom-list" onClick={handlePdfClick}>
                            PDF
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/view-bom-list"
                            onClick={handleExcelClick}
                          >
                            EXCEL
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    {/* <li className="ml-2" title="Import">
              <CiImport
                //onClick={() => setOpenImportModal(true)}
                className="text-[22px] hover:text-[#556ee6] cursor-pointer"
              />
            </li> */}
                    <li className="ml-2" title="Audit">
                      <AiOutlineAudit
                        onClick={() => setOpenModal(true)}
                        className="text-[22px] hover:text-[#556ee6] cursor-pointer"
                      />
                    </li>
                  </ul>
                </div>
                <Table className="viewListNew">
                  <Table.Head className="border-b border-gray-800">
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Item Code
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Name
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Qty/ Unit
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      UOM
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Overage Qty/Unit
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Overage Y/N
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Qty/Unit (Avg)
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Qty/Unit (Cost)
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Qty/BatchBs
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Qty/Batch (Cost)
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      UOM
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      stage
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      lot; cCNo
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Version No
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-10">
                      Action
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="">
                    {productCode !== "" ? (
                      allBomsByProductCode?.map((boms) => {
                        return (
                          <>
                            <Table.Row key={boms.id}>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.item_code}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.product_name}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.quantity_per_unit}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.per_unituom}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.overage_qty_per_unit}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.overageyn}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.tot_qty_per_unit4avg}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.tot_qty_per_unit4cost}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.qty_per_batch4bs}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.qty_per_batch4cost}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.per_batchuom}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.stage}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.lot}-{boms?.ccno}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {boms?.version_no}
                              </Table.Cell>
                              <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                                {roles === "ROLE_QASUPERVISOR" ? (
                                  <></>
                                ) : (
                                  <button>
                                    <BsPencil
                                      className="text-[16px] mr-2 text-[#556ee6] hover:text-black"
                                      onClick={() => {
                                        handleUpdateModal(
                                          boms?.id,
                                          boms?.item_code
                                        );
                                      }}
                                    />
                                  </button>
                                )}
                                {roles === "ROLE_QASUPERVISOR" ? (
                                  <></>
                                ) : (
                                  <button>
                                    <AiFillDelete
                                      className="text-[18px] text-red-600 hover:text-black"
                                      onClick={() => {
                                        handleDelete(boms?.product_code);
                                      }}
                                    />
                                  </button>
                                )}
                              </Table.Cell>
                            </Table.Row>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <h2 className="flex justify-center">
                            Data Not found
                          </h2>
                        </div>
                      </>
                    )}
                  </Table.Body>
                </Table>
                <div className="flex justify-between items-center mt-4">
                  {/* <Button
            onClick={() => handlePagination("prev")}
            disabled={!productCode}
          >
            Previous
          </Button>
          <p>
            Page {pagination?.pageNumber} of {pagination?.totalPages}
          </p>
          <Button
            onClick={() => handlePagination("next")}
            disabled={!productCode}
          >
            Next
          </Button> */}
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Audit</Modal.Header>
          <Modal.Body>
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table style={{ minWidth: "600px" }}>
                <thead>
                  <tr>
                    <th
                      className="p-5"
                      style={{
                        padding: "6px",
                        paddingLeft: "10px",
                        backgroundColor: "#ec9dc0",
                        border: "2px solid black",
                      }}
                    >
                      TableName
                    </th>
                    <th
                      className="p-5"
                      style={{
                        padding: "6px",
                        paddingLeft: "10px",
                        backgroundColor: "#ec9dc0",
                        border: "2px solid black",
                      }}
                    >
                      Previous Value
                    </th>
                    <th
                      className="p-5"
                      style={{
                        padding: "6px",
                        paddingLeft: "10px",
                        backgroundColor: "#ec9dc0",
                        border: "2px solid black",
                      }}
                    >
                      Current Value
                    </th>
                    <th
                      className="p-5"
                      style={{
                        padding: "6px",
                        paddingLeft: "10px",
                        backgroundColor: "#ec9dc0",
                        border: "2px solid black",
                      }}
                    >
                      Action
                    </th>
                    <th
                      className="p-5"
                      style={{
                        padding: "6px",
                        paddingLeft: "10px",
                        backgroundColor: "#ec9dc0",
                        border: "2px solid black",
                      }}
                    >
                      Modified On
                    </th>
                    <th
                      className="p-5"
                      style={{
                        padding: "6px",
                        paddingLeft: "10px",
                        backgroundColor: "#ec9dc0",
                        border: "2px solid black",
                      }}
                    >
                      Modified By
                    </th>
                  </tr>
                </thead>
                <tbody className="mr-2">
                  {audit.map((audit) => (
                    <tr key={audit.id}>
                      <td
                        className="p-5"
                        style={{
                          textAlign: "center",
                          border: "2px solid black",
                        }}
                      >
                        {audit.tableName}
                      </td>
                      <td
                        className="p-5"
                        style={{
                          textAlign: "center",
                          border: "2px solid black",
                        }}
                      >
                        {audit.previousValue}
                      </td>
                      <td
                        className="p-5"
                        style={{
                          textAlign: "center",
                          border: "2px solid black",
                        }}
                      >
                        {audit.currentValue}
                      </td>
                      <td
                        className="p-5"
                        style={{
                          textAlign: "center",
                          border: "2px solid black",
                        }}
                      >
                        {audit.action}
                      </td>
                      <td
                        className="p-5"
                        style={{
                          textAlign: "center",
                          border: "2px solid black",
                        }}
                      >
                        {audit.modifiedOn}
                      </td>
                      <td
                        className="p-5"
                        style={{
                          textAlign: "center",
                          border: "2px solid black",
                        }}
                      >
                        {audit.modifiedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal>
        {/* Update item modal start here  */}

        {/* Update item modal end here  */}
        {openUpdateModal && (
          <UpdateBom
            showModal={openUpdateModal}
            setModal={setopenUpdateModal}
            editData={editData}
            id={id}
            item_code={itemCode}
            productCode={productCode}
            pagination={pagination}
          />
        )}
      </div>
    </div>
  );
};

export default ViewList;
