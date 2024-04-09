import { useMemo } from "react";

export default function useRows() {
 
  const rows = useMemo(
    () => [

      {
        sno: "1",
        itemcode: "1",
        itemname: "Audi",
        mtc: "A3",
        mstc: "1",
        vendorcode: "1",
        minstockqty: "100",
      },
      {
        sno: "2",
        itemcode: "2",
        itemname: "Audi",
        mtc: "A3",
        mstc: "2",
        vendorcode: "2",
        minstockqty: "200",
      },
      {
        sno: "3",
        itemcode: "3",
        itemname: "Audi",
        mtc: "A3",
        mstc: "3",
        vendorcode: "3",
        minstockqty: "300",
      },
      {
        sno: "4",
        itemcode: "4",
        itemname: "Audi",
        mtc: "A4",
        mstc: "4",
        vendorcode: "4",
        minstockqty: "400",
      },
      {
        sno: "5",
        itemcode: "5",
        itemname: "Audi",
        mtc: "A4",
        mstc: "5",
        vendorcode: "5",
        minstockqty: "500",
      },
    ],
    []
  );

  return rows;
}
