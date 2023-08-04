type Item = {
  id: string;
  name: string;
  total: number;
  level: number;
};

const PAGE_SIZE = 50;

export class DataTree {
  public children: DataTree[];

  constructor(
    public id: string,
    public name: string,
    public parents: string[],
    public level: number = 0
  ) {
    this.children = [];
  }

  insertChildToRoot(id: string) {
    const newTree = new DataTree(id, id, [id], 1);
    this.children.push(newTree);
  }

  find(id: string): DataTree | null {
    if (id === this.id) {
      return this;
    }

    let result: DataTree | null = null;

    const traverse = (tree: DataTree) => {
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

  insertChildren(id: string, length: number) {
    const parentTree = this.find(id);
    if (!parentTree) {
      throw new Error(`${id} not found`);
    }

    parentTree.children.push(
      ...createRandomChildren(id, length, parentTree.level + 1, parentTree)
    );
  }

  getRootChildren(
    nextIndex: number = 0,
    pageSize = PAGE_SIZE
  ): { items: Item[]; total: number } {
    const items = this.children
      .slice(nextIndex, nextIndex + pageSize)
      .map((t) => {
        console.log("t", t);
        return {
          id: t.id,
          name: t.name,
          total: t.children.length,
          level: t.level,
          parents: t.parents,
        };
      });

    return { items, total: this.children.length };
  }

  getChildren(id: string, nextIndex: number = 0, pageSize = PAGE_SIZE) {
    const parentTree = this.find(id);
    if (!parentTree) {
      throw new Error(`${id} not found`);
    }

    const items = parentTree.children
      .slice(nextIndex, nextIndex + pageSize)
      .map((t) => {
        // console.log("t", t);
        return {
          id: t.id,
          name: t.name,
          total: t.children.length,
          level: t.level,
          parents: t.parents,
        };
      });

    return { items, total: parentTree.children.length };
  }

  getLength() {
    let length = 0;

    const traverse = (tree: DataTree) => {
      length++;
      if (tree.children.length > 0) {
        tree.children.forEach((child) => {
          traverse(child);
        });
      }
    };

    traverse(this);

    return length - 1;
  }

  getList(expnadedIds: string[] = []): DataTree[] {
    const list: DataTree[] = [];

    const traverse = (tree: DataTree) => {
      list.push(tree);
      if (tree.children.length > 0 && expnadedIds.includes(tree.id)) {
        tree.children.forEach((child) => {
          traverse(child);
        });
      }
    };

    traverse(this);

    return list.slice(1, 101);
  }
}

function createRandomChildren(
  id: string,
  length: number,
  level: number,
  parent: DataTree
): DataTree[] {
  const list: DataTree[] = [];

  for (let i = 0; i < length; i++) {
    list.push(
      new DataTree(
        `${id}--${i + 1}`,
        `${id}--${i + 1}`,
        [...parent.parents, `${id}--${i + 1}`],
        level
      )
    );
  }

  return list;
}
