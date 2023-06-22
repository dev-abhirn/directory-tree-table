import { rest } from "msw";
import { dataTree } from "./util/createData";

export const handlers = [
  rest.get("file-management/root-children", (req, res, ctx) => {
    const nextIndex = req.url.searchParams.get("next") ?? 0;

    return res(
      ctx.status(200),
      ctx.json({
        data: dataTree.getRootChildren(+nextIndex),
      })
    );
  }),

  rest.get("file-management/:dirId/children", (req, res, ctx) => {
    const nextIndex = req.url.searchParams.get("next") ?? 0;
    return res(
      ctx.status(200),
      ctx.json({
        data: dataTree.getChildren(req.params.dirId as string, +nextIndex),
      })
    );
  }),
];
