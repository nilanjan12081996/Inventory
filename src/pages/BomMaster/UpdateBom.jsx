import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getBomByProductCode, updateBoms } from "../../slices/saveBomSlice";
import { useSelector } from "react-redux";

const UpdateBom = ({
  showModal,
  setModal,
  id,
  item_code,
  productCode,
  pagination,
  editData,
}) => {
  const form = useForm();
  const { register, handleSubmit, setValue } = form;
  const { updatebomOld } = useSelector((state) => state?.newBom);
  console.log("old Data:", updatebomOld);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBoms([{ id: id, itemCode: item_code }]));
  }, []);

  console.log(editData);
  useEffect(() => {
    form.setValue(
      "iPBomCode",
      Array.isArray(editData) && editData[0]?.ipbom_code
    );
    form.setValue(
      "itemCode",
      Array.isArray(editData) && editData[0]?.item_code
    );
    form.setValue(
      "overageQtyPerUnit",
      Array.isArray(editData) && editData[0]?.overage_qty_per_unit
    );
    form.setValue(
      "overageYN",
      Array.isArray(editData) && editData[0]?.overageyn
    );
    form.setValue(
      "totQtyPerUnit4Avg",
      Array.isArray(editData) && editData[0]?.tot_qty_per_unit4avg
    );
    form.setValue(
      "totQtyPerUnit4Cost",
      Array.isArray(editData) && editData[0]?.tot_qty_per_unit4cost
    );
    form.setValue(
      "perUnitUOM",
      Array.isArray(editData) && editData[0]?.per_unituom
    );
    form.setValue(
      "qtyPerBatch4Bs",
      Array.isArray(editData) && editData[0]?.qty_per_batch4bs
    );
    form.setValue(
      "qtyPerBatch4Cost",
      Array.isArray(editData) && editData[0]?.qty_per_batch4cost
    );
    form.setValue(
      "perBatchUOM",
      Array.isArray(editData) && editData[0]?.per_batchuom
    );
    form.setValue("stage", Array.isArray(editData) && editData[0]?.stage);
    form.setValue(
      "productCode",
      Array.isArray(editData) && editData[0]?.product_code
    );
    form.setValue("lot", Array.isArray(editData) && editData[0]?.lot);
    form.setValue("cCNo", Array.isArray(editData) && editData[0]?.ccno);
    form.setValue(
      "versionNo",
      Array.isArray(editData) && editData[0]?.version_no
    );
    form.setValue(
      "quantityPerUnit",
      Array.isArray(editData) && editData[0]?.quantity_per_unit
    );
  }, [editData]);
  const updateBomFormSubmit = (data) => {
    data["id"] = id;

    dispatch(updateBoms([data])).then(() => {
      dispatch(getBomByProductCode({ productCode }));
    });
    setModal(false);
  };
  return (
    <>
      <Modal show={showModal} onClose={() => setModal(false)}>
        <Modal.Header>Update Item Master</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit(updateBomFormSubmit)}
              className="gap-2"
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Product Code" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("productCode", {
                      required: "Item Code is required",
                    })}
                    disabled={true}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Quantity/Unit" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("quantityPerUnit", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="IP Bom Code" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("iPBomCode", {
                      required: "Item Code is required",
                    })}
                    disabled={true}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Item Code" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("itemCode", {
                      required: "Item Code is required",
                    })}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Ovarage Qty/Unit" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("overageQtyPerUnit", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Overrage Y/N" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("overageYN", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Total Qty/Unit(AVG)" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("totQtyPerUnit4Avg", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Total Qty/Unit(Cost)" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("totQtyPerUnit4Cost", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="UOM" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("perUnitUOM", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Qty/Unit (Avg)" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("qtyPerBatch4Bs", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value=" Qty/Batch (Cost)" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("qtyPerBatch4Cost", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="UOM" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("perBatchUOM", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="Stage" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("stage", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="CC No." />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("cCNo", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="iPBomCode" value="LOT" />
                  </div>
                  <TextInput
                    type="text"
                    required
                    {...register("lot", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Version" value="Version" />
                  </div>
                  <TextInput
                    type="text"
                    id="versionNo"
                    required
                    {...register("versionNo", {
                      required: "Item Code is required",
                    })}
                  />
                </div>
              </div>

              <Button type="submit">Update</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UpdateBom;
