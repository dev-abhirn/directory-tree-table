export type ApiTreeItem = {
  id: string;
  name: string;
  total: number;
  level: number;
  parents: string[];
};

export class DirectoryTreeView {
  public children: DirectoryTreeView[];

  constructor(
    public id: string,
    public name: string,
    public parentId: string,
    public totalChildren: number = 0,
    public level: number = 0
  ) {
    this.children = [];
  }

  insertChildToRoot(id: string, total: number) {
    const newTree = new DirectoryTreeView(id, id, "root", total, 1);
    this.children.push(newTree);
  }

  find(id: string): DirectoryTreeView | null {
    if (id === this.id) {
      return this;
    }

    let result: DirectoryTreeView | null = null;

    const traverse = (tree: DirectoryTreeView) => {
      if (tree.children.length > 0) {
        result = tree.children.find((child) => id === child.id) ?? null;

        if (result) {
          return;
        }
        tree.children.forEach((child) => {
          if (result) {
            return;
          }
          traverse(child);
        });
      }
    };

    traverse(this);
    return result;
  }

  insertChildren(id: string, children: DirectoryTreeView[]) {
    const parentTree = this.find(id);
    if (!parentTree) {
      throw new Error(`${id} not found`);
    }
    parentTree.children.push(...children);
  }

  getList(expnadedIds: string[] = []): DirectoryTreeView[] {
    const list: DirectoryTreeView[] = [];

    const traverse = (tree: DirectoryTreeView) => {
      list.push(tree);
      if (tree.children.length > 0 && expnadedIds.includes(tree.id)) {
        tree.children.forEach((child) => {
          traverse(child);
        });
      }
    };

    traverse(this);

    return list.slice(1); // remove root, which is for protype only
  }

  getNextItemToFetch(
    expnadedIds: string[],
    currentExpandedId: string
  ): DirectoryTreeView | null {
    if (
      currentExpandedId === "root" &&
      this.totalChildren > this.children.length
    ) {
      return this;
    }

    let result: DirectoryTreeView | null = null;

    const item = directoryTreeView.find(currentExpandedId);
    if (!item) {
      throw new Error(`${currentExpandedId} not found`);
    }

    const traverse = (tree: DirectoryTreeView) => {
      if (tree.totalChildren > tree.children.length) {
        result = tree;
        return;
      }

      if (tree.id === "root") {
        result = this;
        return;
      }

      const parent = directoryTreeView.find(tree.parentId);

      if (!parent) {
        throw new Error(`${tree.parentId} not found`);
      }

      const startIndex = parent.children.findIndex((c) => c.id === tree.id);

      for (let i = startIndex + 1; i < parent.children.length; i++) {
        if (expnadedIds.includes(parent.children[i].id)) {
          result = parent.children[i];
          return;
        }
      }

      if (!result) {
        traverse(parent);
      }
    };

    traverse(item);

    return result;
  }

  hasFetchedChildren(id: string) {
    const node = this.find(id);
    if (!node) {
      throw new Error(`${id} not found`);
    }
    return node.children.length > 0;
  }
}

export const directoryTreeView = new DirectoryTreeView(
  "root",
  "root",
  "N/A",
  0
);
