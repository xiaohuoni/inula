// @ts-ignore
import { Request, Response } from "express";

export default {
  "GET /api/currentUser": (req: Request, res: Response) => {
    res.status(200).send({
      name: "汤涛",
      avatar: "https://avatars1.githubusercontent.com/u/8186664?s=40&v=4",
      userid: "543e76d7-ee2a-4DDF-9CEc-beD5Acb4a6C6",
      email: "s.rjcyokt@rfnou.ag",
      signature: "引流话适易向包月格例备济计斗世程但面。",
      title: "消学后存花速同北持交规同以。",
      group: "服务技术部",
      tags: [
        { key: 1, label: "海纳百川" },
        { key: 2, label: "阳光少年" },
        { key: 3, label: "大咖" },
        { key: 4, label: "" },
        { key: 5, label: "傻白甜" },
        { key: 6, label: "大长腿" },
        { key: 7, label: "大咖" },
        { key: 8, label: "专注设计" },
        { key: 9, label: "IT 互联网" },
        { key: 10, label: "傻白甜" },
        { key: 11, label: "" },
        { key: 12, label: "专注设计" },
        { key: 13, label: "傻白甜" },
        { key: 14, label: "IT 互联网" },
        { key: 15, label: "大长腿" },
        { key: 16, label: "大长腿" },
        { key: 17, label: "算法工程师" },
        { key: 18, label: "IT 互联网" },
        { key: 19, label: "大长腿" },
      ],
      notifyCount: 82,
      unreadCount: 97,
      country: "日本",
      access: "接查山品家以被想现并约用电书。",
      geographic: {
        province: { label: "贵州省", key: 20 },
        city: { label: "汕尾市", key: 21 },
      },
      address: "山西省 吕梁市 文水县",
      phone: "11295785893",
    });
  },
};
