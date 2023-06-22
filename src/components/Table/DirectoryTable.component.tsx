import React, { useCallback, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useVirtualizer } from "@tanstack/react-virtual";
import Box from "@mui/material/Box";

import {
  DirectoryTreeView,
  directoryTreeView,
} from "../../util/DirectoryTreeView";
import { fetchChildren, fetchRootChildren } from "../../util/api";
import DirectoryTableRow from "./DirectoryTableRow.component";
import {
  getDirectoryRows,
  getNextDirectoryIdToFetch,
} from "./DirectoryTable.util";

export function DirectoryTable() {
  const parentRef = React.useRef();
  const [list, setList] = useState<DirectoryTreeView[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>(["root"]);
  const [dirIdToFetchChildren, setDirIdToFetchChildren] = useState("root");
  const lastExpandedElementobserver = useRef<IntersectionObserver | null>(null);

  console.log("dirIdToFetchChildren", dirIdToFetchChildren);

  const rowVirtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 50,
    overscan: 5,
  });

  useEffect(() => {
    fetchRootChildren().then(({ items, total }) => {
      items.forEach((item) => {
        directoryTreeView.insertChildToRoot(item.id, item.total);
      });
      directoryTreeView.totalChildren = total;
      const l = directoryTreeView.getList(["root"]);
      setList(l);
    });
  }, []);

  const rows = getDirectoryRows(list);

  const dirToFetchChildren = dirIdToFetchChildren
    ? directoryTreeView.find(dirIdToFetchChildren)
    : null;

  const expandDirTree = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        if (
          dirToFetchChildren &&
          dirToFetchChildren.totalChildren > dirToFetchChildren.children.length
        ) {
          const directiories = await fetchChildren(
            dirToFetchChildren.id,
            dirToFetchChildren.children.length
          );

          directoryTreeView.insertChildren(dirIdToFetchChildren, directiories);

          const directoryAfterUpdate =
            directoryTreeView.find(dirIdToFetchChildren)!;

          if (
            directoryAfterUpdate &&
            directoryAfterUpdate.totalChildren ===
              directoryAfterUpdate.children.length
          ) {
            const dir = getNextDirectoryIdToFetch(
              expandedIds,
              directoryAfterUpdate.id
            );

            if (dir) setDirIdToFetchChildren(dir);
          }

          const l = directoryTreeView.getList(expandedIds);
          setList(l);
        }
      }
    },
    [expandedIds, dirIdToFetchChildren, dirToFetchChildren]
  );

  const lastExpandedElementRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (lastExpandedElementobserver.current)
        lastExpandedElementobserver.current.disconnect();
      lastExpandedElementobserver.current = new IntersectionObserver(
        expandDirTree,
        {
          root: parentRef.current!,
        }
      );

      // console.log("node", node?.querySelector("td")?.innerHTML);

      if (node) lastExpandedElementobserver.current.observe(node);
    },
    [expandDirTree]
  );

  const handleExpand = async (id: string) => {
    let newExpandedIds = [...expandedIds];

    if (expandedIds.includes(id)) {
      const dir = directoryTreeView.find(id)!;
      if (
        id === dirIdToFetchChildren ||
        dir.children.find((d) => d.id === dirIdToFetchChildren)
      ) {
        const dir = getNextDirectoryIdToFetch(expandedIds, id);
        if (dir) setDirIdToFetchChildren(dir);
      }
      newExpandedIds = expandedIds.filter((l) => l !== id);
      setExpandedIds(newExpandedIds);

      const l = directoryTreeView.getList(newExpandedIds);
      setList(l);
      return;
    }

    setDirIdToFetchChildren(id);
    newExpandedIds = [...expandedIds, id];
    setExpandedIds(newExpandedIds);

    if (directoryTreeView.hasFetchedChildren(id)) {
      const l = directoryTreeView.getList(newExpandedIds);
      setList(l);
      return;
    }

    const directiories = await fetchChildren(id);
    directoryTreeView.insertChildren(id, directiories);
    const l = directoryTreeView.getList(newExpandedIds);
    setList(l);
  };

  return (
    <Box
      ref={parentRef}
      sx={{
        width: "800px",
        height: "800px",
        overflow: "auto",
      }}
    >
      <Table
        sx={{
          bgcolor: "background.paper",
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell width={300}>Name</TableCell>
            <TableCell width={300} align="right">
              Desc
            </TableCell>
            <TableCell width={300} align="right">
              Extra
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowVirtualizer.getVirtualItems().map((virtualItem, index) => {
            const row = rows[virtualItem.index];
            const isExpanded = expandedIds.includes(row.id);

            return (
              <DirectoryTableRow
                dirToFetchChildren={dirToFetchChildren}
                row={row}
                isExpanded={isExpanded}
                rowSize={virtualItem.size}
                rowStart={virtualItem.start}
                lastExpandedElementRef={lastExpandedElementRef}
                onExpand={handleExpand}
              />
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
