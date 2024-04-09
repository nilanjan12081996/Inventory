import { useEffect } from "react";
import {
  Button,
  Label,
  Select,
  TextInput,
  Modal,
  FileInput,
  Pagination,
} from "flowbite-react";
import { AiOutlineAudit, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { CiImport } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import ItemMasterList from "./ItemMasterList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useMaterialSubTypeCode from "../../hooks/ItemMasterHooks";
import {
  getMaterialType,
  getVendor,
  postItemData,
  uploadItems,
} from "../../slices/NewItemSlice";
import { useForm } from "react-hook-form";
import {
  Audit,
  DownloadExcel,
  DownloadPdf,
  Pages,
  getItems,
  multisearchItem,
  pageContent,
  searchItems,
} from "../../slices/ItemMasterSlice";
import { useNotification } from "../../pages/Notification/Notification";
import { postAddNotification } from "../../slices/NotificationSlice";

const ItemMaster = () => {
  const { mtype, vendor } = useSelector((state) => state.newItem);
  console.log("vendor name: ", vendor);
  const { items, pages, audit, content } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const roles = localStorage.getItem("userRole");
  console.log("item master Role: ", roles);

  useEffect(() => {
    dispatch(getItems());
    dispatch(getMaterialType());
    dispatch(getVendor());
    dispatch(searchItems());
    dispatch(multisearchItem());
    dispatch(Audit());
  }, [dispatch]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const onSubmits = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("file", file);

    console.log("file", file);
    console.log("FormData: ", formData);
    dispatch(uploadItems(formData));
    console.log("hello");
    setOpenImportModal(false);
  };
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [openAuditModal, setOpenAuditModal] = useState(false);
  const [materialTypeCodeDropdownId, setMaterialTypeCodeDropdownId] =
    useState();

  const handleMaterialTypeChange = (event) => {
    setMaterialTypeCodeDropdownId(event.target.value);
  };

  const materialSubTypeCodeList = useMaterialSubTypeCode(
    materialTypeCodeDropdownId
  );
  const { register, handleSubmit, reset } = useForm();
  const [isSearch, setIsSearch] = useState(false);
  const [isMultiSearch, setIsMultiSearch] = useState(false);
  const [materialsubtypeCode, setmaterialsubtypeCode] = useState("");
  const [materialtypeCode, setmaterialtypeCode] = useState("");
  const [venderCode, setvenderCode] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { updateNotificationCount } = useNotification();

  const handleSearch = () => {
    setIsSearch(true);
    dispatch(searchItems({ itemCode: itemCode }));
  };

  const searchHandle = (e) => {
    const inputValue = e.target.value;
    setItemCode(inputValue);
    setIsSearch(true);
    const filteredItems = items.filter((item) => {
      return item.itemCode.includes(inputValue);
    });
    setSuggestions(filteredItems);

    dispatch(searchItems({ itemCode: inputValue }));
  };

  const handleMultiSearch = () => {
    setIsMultiSearch(true);
    dispatch(
      multisearchItem({
        venderCode: venderCode,
        materialtypeCode: materialtypeCode,
        materialsubtypeCode: materialsubtypeCode,
      })
    );
  };
  const handlematerialTypeChange = (event) => {
    setmaterialtypeCode(event.target.value);
  };

  const handlematerialSTypeChange = (event) => {
    setmaterialsubtypeCode(event.target.value);
  };

  const handleVenChange = (event) => {
    setvenderCode(event.target.value);
  };
  useEffect(() => {
    if (itemCode.trim === "") {
      setIsSearch(false);
    }
  }, [itemCode]);

  const onSubmit = (data) => {
    console.log(data);
    let itemData = new FormData();
    itemData.append("itemCode", data.itemCode);
    itemData.append("itemName", data.itemName);
    itemData.append("materialtypeCode", data.materialtypeCode);
    itemData.append("materialsubtypeCode", data.materialsubtypeCode);
    itemData.append("minimumStockQTY", data.minimumStockQTY);
    itemData.append("venderCode", data.venderCode);
    data["mtc"] = materialTypeCodeDropdownId;
    dispatch(postItemData(itemData)).then((res) => {
      if (
        res?.payload?.message?.code === 201 &&
        res?.payload?.success === true
      ) {
        dispatch(
          postAddNotification({
            type: "create",
            read: res?.payload?.success,
            tableName: "item",
          })
        ).then(() => {
          updateNotificationCount((prevCount) => prevCount + 1);
          dispatch(pageContent(currentPage));
          reset();
        });
      }
    });
    setOpenAddModal(false);
  };
  useEffect(() => {
    console.log(materialTypeCodeDropdownId);
  }, [materialTypeCodeDropdownId]);

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = pages;
  useEffect(() => {
    dispatch(pageContent(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(Pages(currentPage));
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
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
        link.setAttribute("download", "Download..xlsm"); // Specify filename for the download
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

  const handleAudit = () => {
    setOpenAuditModal(true);
  };

  return (
    <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
      <div className="bg-white mb-4 md:mb-0 py-6 px-6 shadow-md rounded-xl w-full h-full">
        <div className="md:flex justify-between items-center mb-4">
          <h1 className="text-2xl font-medium text-[#556ee6]">Item Master</h1>
          {roles === "ROLE_HREXECUTIVE" ||
          roles === "ROLE_HRSUPERVISOR" ||
          roles === "ROLE_USER" ? (
            <></>
          ) : (
            <div className="md:flex items-center">
              <div className="flex items-center mr-4">
                <div className="max-w-md me-2">
                  <div className="mb-0 block">
                    <Label
                      className="text-[12px] p-0"
                      htmlFor="mtc"
                      value="Select MTC"
                    />
                  </div>

                  <Select
                    className="text-[12px] p-0"
                    id="mtc"
                    required
                    onChange={handlematerialTypeChange}
                    value={materialtypeCode}
                  >
                    <option value="">Select</option>
                    {["RM", "PM", "API", "SPM", "EXP", "TPM"].map((mt) => (
                      <option key={mt} value={mt}>
                        {mt}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="max-w-md me-2">
                  <div className="mb-0 block">
                    <Label
                      className="text-[12px] p-0"
                      htmlFor="mstc"
                      value="Select MSTC"
                    />
                  </div>
                  <Select
                    className="text-[12px] p-0"
                    id="mstc"
                    required
                    onChange={handlematerialSTypeChange}
                    value={materialsubtypeCode}
                  >
                    <option value="">Select</option>
                    {["RM", "PM", "API", "SPM", "EXP", "TPM"].map((mst) => (
                      <option key={mst} value={mst}>
                        {mst}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="max-w-md me-2">
                  <div className="mb-0 block">
                    <Label
                      className="text-[12px] p-0"
                      htmlFor="mtc"
                      value="Select Vendor Code"
                    />
                  </div>
                  <Select
                    className="text-[12px] p-0"
                    id="mtc"
                    required
                    onChange={handleVenChange}
                    value={venderCode}
                  >
                    <option>Select</option>
                    {vendor.map((ven) => (
                      <option
                        key={ven.id}
                        value={`${ven.vendorId}-${ven.vendorName}`}
                      >
                        {ven.vendorId}
                      </option>
                    ))}
                  </Select>
                </div>
                <button
                  type="submit"
                  onClick={handleMultiSearch}
                  class="text-white end-2.5 bottom-[5px] bg-[#556ee6] hover:bg-[#556ee6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-12 md:mt-6"
                >
                  Search
                </button>
              </div>
              <div class="relative mr-3 w-[300px] mt-3">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  type="search"
                  value={itemCode}
                  id="default-search"
                  class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                  onChange={searchHandle}
                  required
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  class="text-white absolute end-2.5 bottom-[5px] bg-[#556ee6] hover:bg-[#556ee6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>

              <div className="mr-4 mt-2">
                <ul className="flex items-center">
                  <li className="Download_point ml-2" title="Download">
                    <FaFileDownload className="text-[22px] hover:text-[#556ee6] cursor-pointer" />
                    <ul>
                      <li>
                        <NavLink to="/item-master" onClick={handlePdfClick}>
                          PDF
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/item-master" onClick={handleExcelClick}>
                          EXCEL
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {roles === "ROLE_QAEXECUTIVE" ||
                  roles === "ROLE_WHMANAGER" ||
                  roles === "ROLE_WHEXECUTIVE" ||
                  roles === "ROLE_QASUPERVISOR" ||
                  roles === "ROLE_WHSUPERVISOR" ? (
                    <></>
                  ) : (
                    <li className="ml-2" title="Import">
                      <CiImport
                        onClick={() => setOpenImportModal(true)}
                        className="text-[22px] hover:text-[#556ee6] cursor-pointer"
                      />
                    </li>
                  )}

                  <li className="ml-2" title="Graph">
                    <Link to="/line-chart-graph">
                      <BsGraphUpArrow className="text-[18px] hover:text-[#556ee6] cursor-pointer" />
                    </Link>
                  </li>
                  <li className="ml-2" title="Audit">
                    <AiOutlineAudit
                      className="text-[22px] hover:text-[#556ee6] cursor-pointer"
                      onClick={handleAudit}
                    />
                  </li>
                </ul>
              </div>
              {roles === "ROLE_WHMANAGER" ||
              roles === "ROLE_WHEXECUTIVE" ||
              roles === "ROLE_WHSUPERVISOR" ? (
                <></>
              ) : (
                <Button
                  onClick={() => setOpenAddModal(true)}
                  className="text-[14px] text-white mt-2"
                >
                  <AiOutlinePlus className="mr-1" /> Add New
                </Button>
              )}
            </div>
          )}
        </div>
        {roles === "ROLE_HREXECUTIVE" ||
        roles === "ROLE_HRSUPERVISOR" ||
        roles === "ROLE_USER" ? (
          <>
            <h1>You have No Piviledge</h1>
          </>
        ) : (
          <ItemMasterList
            isSearch={isSearch}
            itemCode={itemCode}
            currentPage={currentPage}
            isMultiSearch={isMultiSearch}
            venderCode={venderCode}
            materialtypeCode={materialtypeCode}
            materialsubtypeCode={materialsubtypeCode}
            suggestions={suggestions}
          />
        )}
        {roles === "ROLE_HREXECUTIVE" ||
        roles === "ROLE_HRSUPERVISOR" ||
        roles === "ROLE_HRMANAGER" ? (
          <></>
        ) : (
          <div className="flex justify-end">
            <div className="paging_box">
              <ul className="flex items-center">
                <Pagination
                  layout="pagination"
                  currentPage={currentPage + 1}
                  totalPages={totalPages}
                  onPageChange={(page) => onPageChange(page - 1)}
                  showIcons
                />
              </ul>
            </div>
          </div>
        )}

        {/* Delete item modal start here  */}

        {/* Add new item modal start here  */}
        <Modal show={openAddModal} onClose={() => setOpenAddModal(false)}>
          <Modal.Header>Add Item Master</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ItemCode" value="Item Code" />
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Item Code"
                      required
                      {...register("itemCode", {
                        required: "Item Code is required",
                      })}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ItemName" value="Item Name" />
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Item Name"
                      required
                      {...register("itemName", {
                        required: "Item Name is required",
                      })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ItemCode" value="Material Type Code" />
                    </div>
                    <Select
                      required
                      {...register("materialtypeCode", {
                        required: "Material Type Code is required",
                      })}
                      onChange={handleMaterialTypeChange}
                    >
                      <option>Select</option>
                      {Array.isArray(mtype) &&
                        mtype.map((data) => (
                          <option key={data.id} value={data.materialtypeCode}>
                            {data.materialtypeCode}
                          </option>
                        ))}
                    </Select>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="ItemName"
                        value="Material Sub Type Code"
                      />
                    </div>

                    <Select
                      {...register("materialsubtypeCode", {
                        required: "Material Sub Type Code is required",
                      })}
                      disabled={!materialTypeCodeDropdownId}
                    >
                      <option>Select</option>
                      {Array.isArray(materialSubTypeCodeList) &&
                        materialSubTypeCodeList.map((data) => (
                          <option key={data.id} value={data?.value}>
                            {data?.label}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ItemCode" value="Min stock Qty" />
                    </div>
                    <TextInput
                      type="number"
                      placeholder="Item Code"
                      required
                      {...register("minimumStockQTY", {
                        required: "Min Stock Qty is required",
                        pattern: {
                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                      })}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ItemCode" value="Vendor Code" />
                    </div>
                    <Select
                      required
                      {...register("venderCode", {
                        required: "Vendor Code is required",
                      })}
                    >
                      <option>Select</option>
                      {Array.isArray(vendor) &&
                        vendor.map((data) => (
                          <option key={data.id}>
                            {data.vendorId}-{data.vendorName}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>

                <Button type="submit">Save</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        {/* Add new item modal ends here */}

        {/* Import item modal start here  */}
        <Modal show={openImportModal} onClose={() => setOpenImportModal(false)}>
          <Modal.Header>Add Item file to import</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <form className="gap-2" onSubmit={onSubmits}>
                <FileInput
                  id="file"
                  className="mb-4"
                  onInput={handleFileChange}
                />
                <Button type="submit">Upload Item</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {/* Import item modal ends here */}

        {/* audit */}

        <Modal show={openAuditModal} onClose={() => setOpenAuditModal(false)}>
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

        {/* <Modal show={openAuditModal} onClose={() => setOpenAuditModal(false)}>
  <Modal.Header>Audit</Modal.Header>
  <Modal.Body>
    <table className="audit-table">
      <thead>
        <tr>
          <th>Table</th>
          <th>Values</th>
          <th>Action</th>
          <th>Modified</th>
          <th>By</th>
        </tr>
      </thead>
      <tbody>
        {audit.map((auditItem) => (
          <tr key={auditItem.id}>
            <td>{auditItem.tableName}</td>
            <td>
              <div>
                <strong>Previous:</strong> {auditItem.previousValue}
              </div>
              <div>
                <strong>Current:</strong> {auditItem.currentValue}
              </div>
            </td>
            <td>{auditItem.action}</td>
            <td>{auditItem.modifiedOn}</td>
            <td>{auditItem.modifiedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Modal.Body>
</Modal> */}
      </div>
    </div>
  );
};

export default ItemMaster;
