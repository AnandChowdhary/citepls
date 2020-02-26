import got from "got";
import { ScopusResult } from "./interfaces";

export const getSearchResults = async (targetUrl: string) => {
  const result = await got.get<ScopusResult>(
    `https://api.elsevier.com/content/search/scopus?query=${encodeURIComponent(
      targetUrl
    )}`,
    {
      responseType: "json",
      headers: {
        "X-ELS-APIKey": process.env.ELSEVIER_API_KEY
      }
    }
  );
  return result.body["search-results"];
};
