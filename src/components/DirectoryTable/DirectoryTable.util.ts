import { DirectoryTreeView } from "../../util/DirectoryTreeView";
import { DirectoryRow } from "./DirectoryTableRow.component";

export function getDirectoryRows(list: DirectoryTreeView[]): DirectoryRow[] {
  return list.map((l) => ({
    id: l.id,
    name: l.name,
    desc: `${l.name} desc`,
    extra: `${l.name} extra`,
    totalChildren: l.totalChildren,
    level: l.level,
    children: l.children,
  }));
}

export function getNextDirectoryIdToFetch(
  expandedIds: string[],
  currentDirectoryId: string
): string | null {
  const expandIndex = expandedIds.findIndex(
    (eId) => eId === currentDirectoryId
  );
  if (expandIndex !== -1 && expandIndex !== 0) {
    return expandedIds[expandIndex - 1];
  }
  return null;
}
