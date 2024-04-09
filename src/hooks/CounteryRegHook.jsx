import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatesByCountryCode } from "../slices/NewEmpSlice";

const useStateCode = (code) => {
  const dispatch = useDispatch();
  const stateCodeList = useSelector((state) => state.empreg.states);

  let codeList = [];

  if (code) {
    Array.isArray(stateCodeList) &&
      stateCodeList?.forEach((item) => {
        codeList.push({
          value: item.stateCode,
          label: item.stateName,
        });
      });
  }

  useEffect(() => {
    if (code) dispatch(getStatesByCountryCode({ countryCode: code }));
  }, [code]);
  return codeList;
};

export default useStateCode;
