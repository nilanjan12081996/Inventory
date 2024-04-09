import { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import useRows from "./useRows";
import useColumns from "./useColumns";
import { BsArrowDownUp, BsPencil } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Delete,
  Update,
  multisearchItem,
  pageContent,
  searchItems,
} from "../../slices/ItemMasterSlice";
import { Link } from "react-router-dom";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { getVendorId } from "../../slices/NewItemSlice";
import { AiFillDelete } from "react-icons/ai";
import { useForm } from "react-hook-form";
import useMaterialSubTypeCode from "../../hooks/ItemMasterHooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ItemMasterList = ({
  isSearch,
  itemCode,
  currentPage,
  isMultiSearch,
  materialsubtypeCode,
  materialtypeCode,
  venderCode,
  suggestions,
}) => {
  const { content, search, multisearch } = useSelector((state) => state.item);
  const { mtype, vendor, vendorDetails } = useSelector(
    (state) => state.newItem
  );
  console.log("sug", content);
  const dispatch = useDispatch();
  const columns = useColumns();
  const data = useRows();
  const table = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups } = table;
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [materialTypeCodeDropdownId, setMaterialTypeCodeDropdownId] =
    useState();
  const [idUpdate, setIdUpdate] = useState(null);
  const [oldData, setOldData] = useState({});
  const [item, setItem] = useState("");
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const roles = localStorage.getItem("userRole");
  console.log("item master Role: ", roles);
  const handleClick = (id) => {
    setOpenModal(true);
    let data = {
      vendorId: id,
    };
    dispatch(getVendorId(data));
  };

  const handleDelete = (id) => {
    setDeleteModal(true);
    setDelId(id);
  };
  const handleYes = () => {
    dispatch(Delete(delId))
      .then((payload) => {
        console.log("deleted: ", payload);
        setDeleteModal(false);
        if (payload?.payload?.message?.code === 200) {
          toast.error(payload?.payload?.message?.summary, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
        dispatch(pageContent(currentPage));
        dispatch(searchItems({ itemCode: itemCode }));
        dispatch(
          multisearchItem({
            venderCode: venderCode,
            materialtypeCode: materialtypeCode,
            materialsubtypeCode: materialsubtypeCode,
          })
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleNo = () => {
    setDeleteModal(false);
  };

  const onSubmit = (data) => {
    let itemData = new FormData();
    itemData.append("itemCode", data.itemCode);
    itemData.append("itemName", data.itemName);
    itemData.append("materialtypeCode", data.materialtypeCode);
    itemData.append("materialsubtypeCode", data.materialsubtypeCode);
    itemData.append("minimumStockQTY", data.minimumStockQTY);
    itemData.append("venderCode", data.venderCode);
    // data['mtc']=materialTypeCodeDropdownId;
    console.log(data);
    console.log(idUpdate);
    dispatch(Update({ id: idUpdate, userInput: data })).then((payload) => {
      if (payload?.payload?.message?.code === 200) {
        toast.success(payload?.payload?.message?.summary, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
      // console.log("msg1: ", payload?.success);
      console.log("msg2", payload?.payload?.message?.summary);
      dispatch(pageContent(currentPage));
      dispatch(searchItems({ itemCode: itemCode }));
      dispatch(
        multisearchItem({
          venderCode: venderCode,
          materialtypeCode: materialtypeCode,
          materialsubtypeCode: materialsubtypeCode,
        })
      );
    });
    setOpenUpdateModal(false);
    setOldData(null);
  };

  const materialSubTypeCodeList = useMaterialSubTypeCode(
    materialTypeCodeDropdownId
  );

  const handleUpdate = (id) => {
    setIdUpdate(id);
  };
  useEffect(() => {
    let data;
    if (isSearch && itemCode) {
      data = search;
    } else if (isMultiSearch) {
      data = multisearch;
    } else {
      data = content;
    }
    if (idUpdate !== null && data !== null) {
      setOldData(data.filter((post) => post.id === idUpdate));
    }
  }, [idUpdate]);

  useEffect(() => {
    if (oldData && oldData.length > 0) {
      console.log("odd", oldData);
      setItem(oldData[0]);
      setOpenUpdateModal(true);
    }
  }, [oldData]);

  const handleMaterialTypeChange = (event) => {
    setMaterialTypeCodeDropdownId(event.target.value);
  };
  return (
    <div className="my-5">
      <ToastContainer />
      <div className="masterItemList">
        <table {...getTableProps()} className="w-full">
          <thead className="border-b border-gray-800">
            {headerGroups.map((headerGroup, rowIndex) => (
              <tr key={rowIndex} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, colIndex) => (
                  // Aplicamos las propiedades de ordenación a cada columna
                  <th
                    key={colIndex}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "desc"
                          : "asc"
                        : "bg-[#a5c9eb] text-[15px] font-medium text-black py-2"
                    }
                  >
                    <p className="flex items-center justify-center">
                      <BsArrowDownUp className="mr-1" />{" "}
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {isSearch && itemCode && suggestions
              ? // Render table rows for search results
                suggestions?.map((post) => (
                  <tr key={post.id}>
                    <td className="py-2 border-b bg-[#fae2d5] border-gray-800 text-center">
                      {post.id}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {post.itemCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {post.itemName}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {post.materialtypeCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {post.materialsubtypeCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      <Link
                        style={{ color: "blue", textDecoration: "underline" }}
                        onClick={() => handleClick(post.venderCode)}
                      >
                        {post.venderCode}-{post.vendorName}
                      </Link>
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {post.minimumStockQTY}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {roles === "ROLE_QAEXECUTIVE" ||
                      roles === "ROLE_WHMANAGER" ||
                      roles === "ROLE_WHEXECUTIVE" ||
                      roles === "ROLE_WHSUPERVISOR" ? (
                        <></>
                      ) : (
                        <button>
                          <BsPencil
                            className="text-[16px] mr-2 text-[#556ee6] hover:text-black"
                            onClick={() => handleUpdate(post.id)}
                          />
                        </button>
                      )}
                      {roles === "ROLE_QAEXECUTIVE" ||
                      roles === "ROLE_WHMANAGER" ||
                      roles === "ROLE_WHEXECUTIVE" ||
                      roles === "ROLE_QASUPERVISOR" ||
                      roles === "ROLE_WHSUPERVISOR" ? (
                        <></>
                      ) : (
                        <button>
                          <AiFillDelete
                            className="text-[18px] text-red-600 hover:text-black"
                            onClick={() => handleDelete(post.id)}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              : //  &&
              //     <tr >
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         {suggestions.id}
              //       </td>
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         {multi.itemCode}
              //       </td>
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         {multi.itemName}
              //       </td>
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         {multi.materialtypeCode}
              //       </td>
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         {multi.materialsubtypeCode}
              //       </td>
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         <Link
              //           style={{ color: "blue", textDecoration: "underline" }}
              //           onClick={() => handleClick(multi.venderCode)}
              //         >
              //           {multi.venderCode}
              //         </Link>
              //       </td>
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         {multi.minimumStockQTY}
              //       </td>
              //       <td className="py-2 border-b border-gray-800 text-center">
              //         <button>
              //           <BsPencil
              //             className="text-[16px] mr-2 text-[#556ee6] hover:text-black"
              //             onClick={() => handleUpdate(multi.id)}
              //           />
              //         </button>
              //         <button>
              //           <AiFillDelete
              //             className="text-[18px] text-red-600 hover:text-black"
              //             onClick={() => handleDelete(multi.id)}
              //           />
              //         </button>
              //       </td>
              //     </tr>

              isMultiSearch
              ? multisearch?.map((multi) => (
                  <tr key={multi.id}>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {multi.id}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {multi.itemCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {multi.itemName}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {multi.materialtypeCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {multi.materialsubtypeCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      <Link
                        style={{ color: "blue", textDecoration: "underline" }}
                        onClick={() => handleClick(multi.venderCode)}
                      >
                        {multi.venderCode}
                      </Link>
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {multi.minimumStockQTY}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {roles === "ROLE_QAEXECUTIVE" ||
                      roles === "ROLE_WHMANAGER" ||
                      roles === "ROLE_WHEXECUTIVE" ||
                      roles === "ROLE_WHSUPERVISOR" ? (
                        <></>
                      ) : (
                        <button>
                          <BsPencil
                            className="text-[16px] mr-2 text-[#556ee6] hover:text-black"
                            onClick={() => handleUpdate(multi.id)}
                          />
                        </button>
                      )}
                      {roles === "ROLE_QAEXECUTIVE" ||
                      roles === "ROLE_WHMANAGER" ||
                      roles === "ROLE_WHEXECUTIVE" ||
                      roles === "ROLE_QASUPERVISOR" ||
                      roles === "ROLE_WHSUPERVISOR" ? (
                        <></>
                      ) : (
                        <button>
                          <AiFillDelete
                            className="text-[18px] text-red-600 hover:text-black"
                            onClick={() => handleDelete(multi.id)}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              : // Render table rows for regular items
                content.map((con) => (
                  <tr key={con.id}>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {con.id}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {con.itemCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {con.itemName}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {con.materialtypeCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {con.materialsubtypeCode}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      <Link
                        style={{ color: "blue", textDecoration: "underline" }}
                        onClick={() => handleClick(con.venderCode)}
                      >
                        {con.venderCode}
                      </Link>
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {con.minimumStockQTY}
                    </td>
                    <td className="py-2 border-b border-gray-800 text-center">
                      {roles === "ROLE_QAEXECUTIVE" ||
                      roles === "ROLE_WHMANAGER" ||
                      roles === "ROLE_WHEXECUTIVE" ||
                      roles === "ROLE_WHSUPERVISOR" ? (
                        <></>
                      ) : (
                        <>
                          <button>
                            <BsPencil
                              className="text-[16px] mr-2 text-[#556ee6] hover:text-black"
                              onClick={() => handleUpdate(con.id)}
                            />
                          </button>
                        </>
                      )}
                      {roles === "ROLE_QAEXECUTIVE" ||
                      roles === "ROLE_WHMANAGER" ||
                      roles === "ROLE_WHEXECUTIVE" ||
                      roles === "ROLE_QASUPERVISOR" ||
                      roles === "ROLE_WHSUPERVISOR" ? (
                        <></>
                      ) : (
                        <button>
                          <AiFillDelete
                            className="text-[18px] text-red-600 hover:text-black"
                            onClick={() => handleDelete(con.id)}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <Modal show={openModal} onClose={() => setOpenModal(false)} id="modal">
          <Modal.Header>Vendor Details</Modal.Header>
          <Modal.Body>
            {vendorDetails.map((venId, index) => (
              <div className="space-y-6" key={venId.vendor_id}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {index === 0 ? (
                    <div>
                      <b>
                        <h2
                          style={{
                            padding: "4px",
                            paddingLeft: "10px",
                            fontSize: "25px",
                            backgroundColor: "rgb(255, 225, 194)",
                            width: "36rem",
                          }}
                        >
                          Home
                        </h2>
                      </b>
                    </div>
                  ) : (
                    <div>
                      <b>
                        <h2
                          style={{
                            marginTop: "50px",
                            padding: "4px",
                            paddingLeft: "10px",
                            fontSize: "25px",
                            backgroundColor: "rgb(255, 225, 194)",
                            width: "36rem",
                          }}
                        >
                          Office
                        </h2>
                      </b>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="vendor id"
                        value="Vendor Name"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.vendor_name}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="AddressCode"
                        value="Address Code"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.add_code}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="EmpCode"
                        value="Emp Code"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.emp_code}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="AddressType"
                        value="Address Type"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.address_type}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="Address(Line1)"
                        value="Address(Line1)"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.line1}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="Address(Line2)"
                        value="Address(Line2)"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.line2}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="Landmark"
                        value="Landmark"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.landmark}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="Districtcode"
                        value="District code"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.distcode}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="StateCode"
                        value="State Code"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.statecode}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="CountryCode"
                        value="Country Code"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.countrycode}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="Pincode"
                        value="Pincode"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.pincode}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="PhoneNo1"
                        value="Phone No1"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.phone_no1}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="PhoneNo2"
                        value="Phone No2"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.phone_no2}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="addresstype"
                        value="Address Type"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.address_type}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email"
                        value="Email"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.email}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="AddressType"
                        value="Address Type"
                        style={{ fontWeight: "700" }}
                      />
                    </div>
                    {venId.address_type}
                  </div>
                </div>
              </div>
            ))}
          </Modal.Body>
        </Modal>
        {/* Update item modal start here  */}
        <Modal show={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
          <Modal.Header>Update Item Master</Modal.Header>
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
                      defaultValue={item.itemCode}
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
                      defaultValue={item.itemName}
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
                      // defaultValue={item.materialtypeCode}
                      {...register("materialtypeCode", {
                        required: "Material Type Code is required",
                      })}
                      onChange={handleMaterialTypeChange}
                    >
                      <option>{item.materialtypeCode}</option>
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
                      <option>{item.materialsubtypeCode}</option>
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
                      defaultValue={item.minimumStockQTY}
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
                      <option>{item.venderCode}</option>
                      {Array.isArray(vendor) &&
                        vendor.map((data) => (
                          <option key={data.id} value={data.vendorId}>
                            {data.vendorId}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>

                <Button type="submit">Update</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        {/* Update item modal end here  */}
      </div>
      {/* <Modal show={openDeleteModal} onClose={() => setDeleteModal(false)}>
        <Modal.Header className="text-center">Are You Sure?</Modal.Header>
        <Modal.Body>
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleNo}
          >
            Cancel
          </button>
        </Modal.Body>
      </Modal> */}
      <Modal show={openDeleteModal} onClose={() => setDeleteModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleYes}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={handleNo}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ItemMasterList;
