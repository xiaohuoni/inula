// @ts-ignore
import { Request, Response } from "express";

export default {
  "POST /api/rule": (req: Request, res: Response) => {
    res.status(200).send({
      key: 76,
      disabled: false,
      href: "https://github.com/umijs/dumi",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
      name: "史超",
      owner: "Hernandez",
      desc: "重空本新民分研斗日证边验南低水资单。",
      callNo: 64,
      status: 61,
      updatedAt: "&4bhvP4",
      createdAt: "R(n",
      progress: 87,
    });
  },
};
