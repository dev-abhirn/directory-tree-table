export type DirectoryRowDg = {
  id: string;
  name: string;
  desc: string;
  extra: string;
  level: number;
  parents: string[];
};

export function getGridData(items: any, total: number): DirectoryRowDg[] {
  // console.log("items", items);
  const data = items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      desc: item.name + " desc",
      extra: item.name + " extra",
      level: item.level,
      parents: item.parents,
    };
  });

  // console.log("data", data);
  return data;
}
