import { DataTree } from "./DataTree";

export const dataTree = new DataTree("root", "root");

/*-----------------------------Larger data ------------------------*/

for (let index = 0; index < 1000; index++) {
  dataTree.insertChildToRoot(`dir--${index + 1}`);
}

dataTree.insertChildren("dir--1", 200);
dataTree.insertChildren("dir--1--4", 150);
dataTree.insertChildren("dir--1--4--2", 150);
dataTree.insertChildren("dir--1--4--3", 150);
dataTree.insertChildren("dir--1--5", 150);
dataTree.insertChildren("dir--20", 200);
dataTree.insertChildren("dir--500", 200);
dataTree.insertChildren("dir--500--1", 150);
dataTree.insertChildren("dir--500--1--2", 150);
dataTree.insertChildren("dir--500--1--3", 150);
dataTree.insertChildren("dir--500--2", 150);

/*-----------------------------Smaller data ------------------------*/

// for (let index = 0; index < 100; index++) {
//   dataTree.insertChildToRoot(`dir--${index + 1}`);
// }

// dataTree.insertChildren("dir--1", 40);
// dataTree.insertChildren("dir--1--4", 20);
// dataTree.insertChildren("dir--1--4--2", 20);
// dataTree.insertChildren("dir--1--4--3", 20);
// dataTree.insertChildren("dir--1--5", 20);
// dataTree.insertChildren("dir--20", 20);
// dataTree.insertChildren("dir--20--1", 20);
// dataTree.insertChildren("dir--20--1--2", 20);
// dataTree.insertChildren("dir--20--1--3", 20);
// dataTree.insertChildren("dir--20--2", 20);

// console.log("tree", tree);
// console.log("tree", tree.getList());
