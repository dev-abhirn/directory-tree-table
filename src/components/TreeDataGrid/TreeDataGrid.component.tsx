import React, { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";

import { fetchChildren2, fetchRootChildren } from "../../util/api";
import { getGridData } from "./TreeDataGrid.util";

const columns = [{ field: "name" }, { field: "desc" }, { field: "extra" }];

export default function TreeDataGrid() {
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    fetchRootChildren().then(({ items, total }) => {
      const data = getGridData(items, total);
      fetchChildren2(data[0].id).then((d2) => {
        const data2 = getGridData(d2, 0);
        setRows([...data, ...data2]);
      });
    });
  }, []);

  console.log("rows", rows);

  return (
    <>
      <DataGridPro
        treeData
        getTreeDataPath={(row) => row.parents}
        rows={rows}
        columns={columns}
      />
    </>
  );
}
