import React, { useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { dataTree as tree } from "../../mocks/util/createData";
import { DataTree } from "../../mocks/util/DataTree";

export function BasicList() {
  const parentRef = React.useRef();
  const [list, setList] = useState<DataTree[]>(tree.getList([tree.id]));
  const [expandedIds, setExpandedIds] = useState<string[]>([tree.id]);

  const rowVirtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 35,
  });

  const handleExpand = (id: string) => {
    let newExpandedIds = expandedIds;
    if (expandedIds.includes(id)) {
      newExpandedIds = expandedIds.filter((l) => l !== id);
    } else {
      newExpandedIds = [...expandedIds, id];
    }
    setExpandedIds(newExpandedIds);
    setList(tree.getList(newExpandedIds));
  };

  return (
    <Box
      ref={parentRef}
      sx={{
        width: "800px",
        height: "800px",
        overflow: "auto", // Make it scroll!
      }}
    >
      <List
        sx={{
          bgcolor: "background.paper",
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          // console.log("virtualItem", virtualItem);
          const item = list[virtualItem.index];
          const isExpanded = expandedIds.includes(item.id);

          const iconLength = 24;
          let marginLeft = (item.level - 1) * 32;
          if (item.children.length === 0) {
            marginLeft += iconLength;
          }

          return (
            <ListItem
              disablePadding
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ListItemButton
                sx={{
                  ml: `${marginLeft}px`,
                }}
              >
                {item.children.length > 0 && (
                  <ListItemIcon
                    sx={{ minWidth: `${iconLength}px` }}
                    onClick={() => handleExpand(item.id)}
                  >
                    {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                  </ListItemIcon>
                )}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
