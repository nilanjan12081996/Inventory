import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {getMeterialSubtype} from "../slices/NewItemSlice";

   // Fetching Metarial Sub Type List
const useMaterialSubTypeCode = (code) => {
    const dispatch = useDispatch();
    const materialSubTypeCodeList = useSelector((state) => state.newItem.mSubtype);
    
    let codeList = [];
  
    if (code) {
        materialSubTypeCodeList.forEach((item) => {
        codeList.push({
          value: item.materialsubtypeCode,
          label: item.materialsubtypeName,
        });
      });
    }
  
    useEffect(() => {
        if(code) dispatch(getMeterialSubtype({"materialtypeCode":code})); 
    }, [code]);
    return codeList;
}

export default useMaterialSubTypeCode;