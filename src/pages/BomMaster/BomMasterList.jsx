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
} from "flowbite-react";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveBom } from "../../slices/saveBomSlice";

const BomMasterList = ({ productCode, productDetails }) => {
  const ipbomcode = Array.isArray(productDetails)
    ? productDetails[0]?.ipbom_code
    : "";
  const [rows, setRows] = useState([
    {
      iPBomCode: ipbomcode,
      itemCode: "",
      overageQtyPerUnit: "",
      overageYN: "",
      totQtyPerUnit4Avg: "",
      totQtyPerUnit4Cost: "",
      perUnitUOM: "",
      qtyPerBatch4Bs: "",
      qtyPerBatch4Cost: "",
      perBatchUOM: "",
      stage: "",
      productCode: productCode,
      lot: "",
      cCNo: "",
      versionNo: "",
      quantityPerUnit: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        iPBomCode: ipbomcode,
        itemCode: "",
        overageQtyPerUnit: "",
        overageYN: "",
        totQtyPerUnit4Avg: "",
        totQtyPerUnit4Cost: "",
        perUnitUOM: "",
        qtyPerBatch4Bs: "",
        qtyPerBatch4Cost: "",
        perBatchUOM: "",
        stage: "",
        productCode: productCode,
        lot: "",
        cCNo: "",
        versionNo: "",
        quantityPerUnit: "",
      },
    ]);
  };
  const removeRow = (indexToRemove) => {
    setRows(rows.filter((_, index) => index !== indexToRemove));
  };
  const handleInputChange = (index, fieldName, value) => {
    const newRows = [...rows];
    newRows[index][fieldName] = value;
    setRows(newRows);
  };

  const dispatch = useDispatch();

  const saveAllData = () => {
    // Collect all the data from the rows state
    const allData = rows.map((row) => ({
      iPBomCode: ipbomcode,
      itemCode: row.itemCode,
      overageQtyPerUnit: row.overageQtyPerUnit,
      overageYN: row.overageYN,
      totQtyPerUnit4Avg: row.totQtyPerUnit4Avg,
      totQtyPerUnit4Cost: row.totQtyPerUnit4Cost,
      perUnitUOM: row.perUnitUOM,
      qtyPerBatch4Bs: row.qtyPerBatch4Bs,
      qtyPerBatch4Cost: row.qtyPerBatch4Cost,
      perBatchUOM: row.perBatchUOM,
      stage: row.stage,
      productCode: productCode,
      lot: row.lot,
      cCNo: row.cCNo,
      versionNo: row.versionNo,
      quantityPerUnit: row.quantityPerUnit,
    }));

    // Dispatch an action to save the data
    dispatch(saveBom(allData));
  };
  return (
    <div className="my-5">
      <div className="overflow-x-auto">
        <Table className="masterItemList">
          <Table.Head className="border-b border-gray-800">
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Product Code
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              IP Bom Code
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Item Code
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Qty/ Unit
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              UOM
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Overage Qty/Unit
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Overage Y/N
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Qty/Unit (Avg)
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Qty/Unit (Cost)
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Qty/BatchBs
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Qty/Batch (Cost)
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              UOM
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Stage
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              lot
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              cCNo
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Version No
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#a5c9eb] text-[15px] font-medium text-black text-center capitalize px-2">
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="">
            {rows.map((row, index) => (
              <Table.Row
                key={index}
                className="bg-white border-b border-t border-gray-800"
              >
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium ">
                  <TextInput
                    //   id="base"
                    id={`productCode-${index}`}
                    type="text"
                    sizing="sm"
                    className="w-full text-transparent w-[100px] mr-2"
                    value={productCode}
                    readOnly
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    // id="base"
                    id={`ipBomCode-${index}`}
                    type="text"
                    sizing="sm"
                    className="w-full text-transparent w-[100px] mr-2"
                    // onChange={(e) =>
                    //   handleInputChange(index, "iPBomCode", e.target.value)
                    // }
                    value={ipbomcode || " "}
                    readOnly
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    //id={`itemCode-${index}`}
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "itemCode", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "quantityPerUnit",
                        e.target.value
                      )
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "perUnitUOM", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "overageQtyPerUnit",
                        e.target.value
                      )
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "overageYN", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "totQtyPerUnit4Avg",
                        e.target.value
                      )
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "totQtyPerUnit4Cost",
                        e.target.value
                      )
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "qtyPerBatch4Bs", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "qtyPerBatch4Cost",
                        e.target.value
                      )
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "perBatchUOM", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "stage", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "lot", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "cCNo", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-2 px-2 border-b border-gray-800 text-center text-black font-medium">
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    className="w-full w-[100px] mr-2"
                    onChange={(e) =>
                      handleInputChange(index, "versionNo", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell className="py-4 px-2 flex border-0 border-gray-800 text-black text-center font-medium">
                  <button onClick={() => addRow()}>
                    <BsPlusCircle className="text-xl text-green-700 mr-1" />
                  </button>

                  {index !== 0 && (
                    <button onClick={() => removeRow(index)}>
                      <BsDashCircle className="text-xl text-red-700 ml-1" />
                    </button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div>
          <Button onClick={saveAllData} className="text-[14px] text-white my-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BomMasterList;
