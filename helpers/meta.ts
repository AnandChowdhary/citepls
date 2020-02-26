import got from "got";
import { ScopusResult, ScopusEntry } from "./interfaces";

const formatResult = (result: ScopusEntry) => {
  return {
    urls: result.link.map(i => i["@href"]),
    url: result["prism:url"],
    dc: result["dc:identifier"],
    title: result["dc:title"],
    creator: result["dc:creator"],
    publication: result["prism:publicationName"],
    isbns: result["prism:isbn"].map(i => i.$),
    date: new Date(result["prism:coverDate"]),
    doi: result["prism:doi"],
    citations: result["citedby-count"],
    affiliations: result.affiliation.map(i => ({
      name: i.affilname,
      city: i["affiliation-city"],
      country: i["affiliation-country"]
    })),
    number: result["article-number"],
    openAccess: result.openaccessFlag
  };
};

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
  return result.body["search-results"].entry.map(i => formatResult(i));
};
