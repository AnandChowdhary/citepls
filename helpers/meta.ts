import metascraper from "metascraper";
import author from "metascraper-author";
import date from "metascraper-date";
import description from "metascraper-description";
import publisher from "metascraper-publisher";
import title from "metascraper-title";
import url from "metascraper-url";
import lang from "metascraper-lang";

const scraper = metascraper([
  author(),
  date(),
  description(),
  publisher(),
  title(),
  url(),
  lang()
]);

export const scrapeMetaTags = async (url: string) => {};
