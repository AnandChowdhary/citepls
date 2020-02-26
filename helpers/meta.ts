import got from "got";
import { load } from "cheerio";

const value = ($: CheerioStatic, name: string) =>
  $(`meta[name="citation_${name}"]`).attr("content");

export const scrapeMetaTags = async (targetUrl: string) => {
  const { body: html } = await got.get(targetUrl);
  const $ = load(html);
  const pii = value($, "pii");
  const issn = value($, "issn");
  const volume = value($, "volume");
  const lastpage = value($, "lastpage");
  const publisher = value($, "publisher");
  const firstpage = value($, "firstpage");
  const journal_title = value($, "journal_title");
  const type = value($, "type");
  const doi = value($, "doi");
  const article_type = value($, "article_type");
  const title = value($, "title");
  const publication_date = value($, "publication_date");
  const online_date = value($, "online_date");
  const pdf_url = value($, "pdf_url");
  return {
    pii,
    issn,
    volume,
    lastpage,
    publisher,
    firstpage,
    journal_title,
    type,
    doi,
    article_type,
    title,
    publication_date,
    online_date,
    pdf_url
  };
};
