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
import { AiOutlineAudit, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import BomMasterList from "./BomMasterList";
import { useDispatch } from "react-redux";
import {
  getBomProduct,
  getProductById,
  saveBom,
} from "../../slices/saveBomSlice";
import { FaFileDownload } from "react-icons/fa";
import { CiImport } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import ViewList from "./ViewList";
import { useSelector } from "react-redux";
import {
  Audit,
  DownloadExcel,
  DownloadPdf,
} from "../../slices/ItemMasterSlice";
import { uploadItems } from "../../slices/NewItemSlice";

const BomMaster = () => {
  // const [openModal, setOpenModal] = useState(false);
  const [OpenImportModal, setOpenImportModal] = useState(false);
  const dispatch = useDispatch();
  const { productById } = useSelector((state) => state?.newBom);
  const [file, setFile] = useState(null);
  const { audit } = useSelector((state) => state?.item);
  console.log("n: ", productById);
  console.log(
    "bomcode:",
    Array.isArray(productById) && productById[0]?.ipbom_code
  );

  const [productCode, setProductCode] = useState("");
  const roles = localStorage.getItem("userRole");
  console.log("item master Role: ", roles);

  const handleChange = (e) => {
    setProductCode(e.target.value);

    dispatch(
      getProductById({
        productCode: e.target.value,
      })
    );

    console.log("type:", e.target.value);
    console.log("name: ", productById);
  };
  useEffect(() => {
    dispatch(Audit());
  }, [dispatch]);
  //pdf and excel
  // const handleExcelClick = () => {
  //   dispatch(DownloadExcel())
  //     .then((response) => {
  //       // Create blob link to download
  //       const blob = new Blob([response.data]);
  //       // Create a temporary anchor element
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "Download.xlsx"); // Specify filename for the download
  //       // Simulate click on the anchor element to trigger download
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading Execl file:", error);
  //     });
  // };
  // const handlePdfClick = () => {
  //   dispatch(DownloadPdf({ test: "test" }))
  //     .then((response) => {
  //       // Create blob link to download
  //       const blob = new Blob([response.data]);
  //       // Create a temporary anchor element
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "Download.pdf"); // Specify filename for the download
  //       // Simulate click on the anchor element to trigger download
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading PDF file:", error);
  //     });
  // };
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
  return (
    <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
      <div className="bg-white mb-4 md:mb-0 py-6 px-6 shadow-md rounded-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-sm md:text-[20px] font-medium text-[#556ee6]">
            BOM MASTER
          </h1>
        </div>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center">
              <p className="text-[13px] font-semibold mr-1 w-16">P.Code:</p>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                className="w-full"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <p className="text-[13px] font-semibold mr-1 w-16">P.Name:</p>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                className="w-full"
                value={productById ? productById[0]?.product_name : " "}
                readOnly
              />
            </div>
            <div className="flex items-center">
              <p className="text-[13px] font-semibold mr-1 w-16">Market:</p>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                className="w-full"
                value={productById ? productById[0]?.market : " "}
                readOnly
              />
            </div>
            <div className="flex items-center">
              <p className="text-[13px] font-semibold mr-1 w-16">Stage:</p>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                className="w-full"
                value={productById ? productById[0]?.stage : " "}
                readOnly
              />
            </div>
            <div className="flex items-center">
              <p className="text-[13px] font-semibold mr-1 w-16">Pack Mode:</p>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                className="w-full"
                value={productById ? productById[0]?.pack_mode : " "}
                readOnly
              />
            </div>
            <div className="flex items-center">
              <p className="text-[13px] font-semibold mr-1 w-16">Block:</p>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                className="w-full"
                value={productById ? productById[0]?.block_code : " "}
              />
            </div>
            <div className="flex items-center">
              <p className="text-[13px] font-semibold mr-1 w-16">Unit:</p>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                className="w-full"
                value={productById ? productById[0]?.unit_code : " "}
              />
            </div>
          </div>
        )}

        <div className="mr-4 mt-4 relative z-10">
          <ul className="flex justify-end items-center">
            {/* <li className="Download_point ml-2" title="Download">
              <FaFileDownload className="text-[22px] hover:text-[#556ee6] cursor-pointer" />
              <ul>
                <li>
                  <NavLink to="/bom-master" onClick={handlePdfClick}>
                    PDF
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/bom-master" onClick={handleExcelClick}>
                    EXCEL
                  </NavLink>
                </li>
              </ul>
            </li> */}
            {roles === "ROLE_QASUPERVISOR" ||
            roles === "ROLE_HREXECUTIVE" ||
            roles === "ROLE_HRSUPERVISOR" ||
            roles === "ROLE_USER" ||
            roles === "ROLE_QAEXECUTIVE" ||
            roles === "ROLE_WHEXECUTIVE" ||
            roles === "ROLE_WHSUPERVISOR" ||
            roles === "ROLE_WHMANAGER" ? (
              <></>
            ) : (
              <li className="ml-2" title="Import">
                <CiImport
                  onClick={() => setOpenImportModal(true)}
                  className="text-[22px] hover:text-[#556ee6] cursor-pointer"
                />
              </li>
            )}

            {/* <li className="ml-2" title="Audit">
              <AiOutlineAudit
                onClick={() => setOpenModal(true)}
                className="text-[22px] hover:text-[#556ee6] cursor-pointer"
              />
            </li> */}
          </ul>
        </div>
        {/* Inventory List Start here */}
        {roles === "ROLE_HREXECUTIVE" ||
        roles === "ROLE_HRSUPERVISOR" ||
        roles === "ROLE_USER" ||
        roles === "ROLE_QAEXECUTIVE" ||
        roles === "ROLE_WHEXECUTIVE" ||
        roles === "ROLE_WHSUPERVISOR" ||
        roles === "ROLE_WHMANAGER" ? (
          <></>
        ) : (
          <BomMasterList
            productCode={productCode}
            productDetails={productById}
          />
        )}

        {/* <div>
          <Button
            //onClick={() => setOpenModal(true)}
            className="text-[14px] text-white"
          >
            Save
          </Button>
        </div> */}

        {/* View list start here */}
        {/* <ViewList /> */}
        {/* View list ends here */}

        {/* Inventory List Ends here */}
        {/* Add new item modal start here  */}
        {/* <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Audit</Modal.Header>
          
        </Modal> */}
        <Modal show={OpenImportModal} onClose={() => setOpenImportModal(false)}>
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
        {/* Add new item modal ends here */}
      </div>
    </div>
  );
};

export default BomMaster;
