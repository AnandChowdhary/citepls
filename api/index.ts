import { NowRequest, NowResponse } from "@now/node";
import { getSearchResults } from "../helpers/meta";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const url = req.query.url;
    if (typeof url !== "string") throw new Error("Provide a URL");
    const results = await getSearchResults(url);
    if (!results.length)
      return res.status(404).json({ error: "No results found" });
    const result = results[0];
    res.setHeader("Cache-Control", "max-age=86400");
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: (error as Error).toString() });
  }
};
