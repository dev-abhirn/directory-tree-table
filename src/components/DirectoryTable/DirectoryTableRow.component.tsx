import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DirectoryTreeView } from "../../util/DirectoryTreeView";

export type DirectoryRow = {
  id: string;
  name: string;
  desc: string;
  extra: string;
  level: number;
  totalChildren: number;
  children: DirectoryTreeView[];
};

export default function DirectoryTableRow({
  dirToFetchChildren,
  row,
  isExpanded,
  rowSize,
  rowStart,
  lastExpandedElementRef,
  onExpand,
}: {
  row: DirectoryRow;
  isExpanded: boolean;
  rowSize: number;
  rowStart: number;
  dirToFetchChildren: DirectoryTreeView | null;
  lastExpandedElementRef: (node: HTMLTableRowElement) => void;
  onExpand: (id: string) => void;
}) {
  const iconLength = 24;
  let marginLeft = (row.level - 1) * 32;
  if (row.totalChildren === 0) {
    marginLeft += iconLength;
  }

  let extraProps = {};

  if (dirToFetchChildren && dirToFetchChildren.children.length > 0) {
    const lastChildOfExpanded =
      dirToFetchChildren.children[dirToFetchChildren.children.length - 1];

    if (lastChildOfExpanded.id === row.id) {
      extraProps = { ref: lastExpandedElementRef };
    }
  }

  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      style={{
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        height: `${rowSize}px`,
        transform: `translateY(${rowStart + 50}px)`, //+50 my hack
      }}
      {...extraProps}
    >
      <TableCell component="th" scope="row" width={300}>
        <Box
          sx={{ display: "inline-flex", ml: `${marginLeft}px` }}
          onClick={() => onExpand(row.id)}
        >
          {row.totalChildren > 0 &&
            (isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />)}
          {row.name}
        </Box>
      </TableCell>
      <TableCell align="right" width={300}>
        {row.desc}
      </TableCell>
      <TableCell align="right" width={300}>
        {row.extra}
      </TableCell>
    </TableRow>
  );
}
