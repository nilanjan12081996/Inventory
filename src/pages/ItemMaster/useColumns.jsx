import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "sno",
      },
      {
        Header: "Item Code",
        accessor: "itemcode",
      },
      {
        Header: "Item Name",
        accessor: "itemname",
      },
      {
        Header: "MTC",
        accessor: "mtc",
      },
      {
        Header: "MSTC",
        accessor: "mstc",
      },
      {
        Header: "Vendor Code",
        accessor: "vendorcode",
      },
      {
        Header: "Min stock Qty",
        accessor: "minstockqty",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  return columns;
}
