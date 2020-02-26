import { NowRequest, NowResponse } from "@now/node";
import { getSearchResults } from "../helpers/meta";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const q = req.query.q;
    if (typeof q !== "string" || !q)
      return res.status(400).json({ error: "Provide a valid query" });
    const results = await getSearchResults(q);
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
