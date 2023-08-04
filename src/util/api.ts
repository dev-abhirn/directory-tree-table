import { ApiTreeItem, DirectoryTreeView } from "./DirectoryTreeView";

export async function fetchRootChildren(): Promise<{
  items: ApiTreeItem[];
  total: number;
}> {
  const res = await fetch("/file-management/root-children");
  const data = (await res.json()) as {
    data: { items: ApiTreeItem[]; total: number };
  };

  return { items: data.data.items, total: data.data.total };
}

export async function fetchChildren(
  id: string,
  nextIndex: number = 0
): Promise<DirectoryTreeView[]> {
  const res = await fetch(`/file-management/${id}/children?next=${nextIndex}`);
  const data = (await res.json()) as { data: { items: ApiTreeItem[] } };

  const treeItemsResponse = data.data.items;

  const directiories: DirectoryTreeView[] = treeItemsResponse.map(
    (item) =>
      new DirectoryTreeView(item.id, item.name, id, item.total, item.level)
  );

  return directiories;
}

export async function fetchChildren2(
  id: string,
  nextIndex: number = 0
): Promise<ApiTreeItem[]> {
  const res = await fetch(`/file-management/${id}/children?next=${nextIndex}`);
  const data = (await res.json()) as { data: { items: ApiTreeItem[] } };

  const treeItemsResponse = data.data.items;

  return treeItemsResponse as ApiTreeItem[];
}
