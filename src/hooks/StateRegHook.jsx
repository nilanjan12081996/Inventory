import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDistByStateCode } from "../slices/NewEmpSlice";
import { useEffect } from "react";
const useDistCode = (code) => {
  const dispatch = useDispatch();
  const distCodeList = useSelector((state) => state.empreg.dist);

  let codeList = [];

  if (code) {
    Array.isArray(distCodeList) &&
      distCodeList?.forEach((item) => {
        codeList.push({
          value: item.districtCode,
          label: item.districtName,
        });
      });
  }

  useEffect(() => {
    if (code) dispatch(getDistByStateCode({ stateCode: code }));
  }, [code]);
  return codeList;
};

export default useDistCode;
