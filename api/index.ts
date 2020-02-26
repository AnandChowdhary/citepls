import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    res.setHeader("Cache-Control", "max-age=86400");
    return res.json({ hello: "world" });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).toString() });
  }
};
