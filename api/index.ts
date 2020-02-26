import { NowRequest, NowResponse } from "@now/node";
import { getSearchResults } from "../helpers/meta";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const url = req.query.url;
    if (typeof url !== "string") throw new Error("Provide a URL");
    const result = await getSearchResults(url);
    res.setHeader("Cache-Control", "max-age=86400");
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: (error as Error).toString() });
  }
};
