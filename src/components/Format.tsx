import React from "react";
import { CitationResult } from "../interfaces/result";

const APA =
  "Author, A. A., Author, B. B., & Author, C. C. ({YEAR}). {TITLE}. {JOURNAL}, {VOLUME}({ISSUE}), {PAGE_START}-{PAGE_END}.";
const Harvard = `Author, A.A., Author, B.B.& Author, C.C. {YEAR}, "{TITLE}", {JOURNAL}, vol. {VOLUME}, no. {ISSUE}, pp. {PAGE_START}-{PAGE_END}.`;
const Vancouver = `Author AA, Author BB, Author CC. {TITLE}. {JOURNAL}. {YEAR};{VOLUME}({ISSUE}):{PAGE_START}-{PAGE_END}.`;
const Turabian = `Author, Alan A., B. B. Author, and C. C. Author. {YEAR}. {TITLE}. {JOURNAL} Volume {VOLUME}, no. {ISSUE}: {PAGE_START}-{PAGE_END}.`;
const MLA = `Author, Alan A., et al. "{TITLE}." {JOURNAL} {VOLUME}.2 (2095): {PAGE_START}-{PAGE_END}. doi:{DOI}.`;
const Chicago = `Author, Alan A., B. B. Author, and C. Author. {YEAR}. "{TITLE}."{JOURNAL} {VOLUME}, ({ISSUE}): {PAGE_START}-{PAGE_END}.`;
const IEEE = `M. T. Kimour and D. Meslati, "{TITLE}," {JOURNAL}, vol. {VOLUME}, no. {ISSUE}, p. {PAGE_END} {DAY}, {MONTH} {YEAR}. [Abstract]. Available: {SOURCE} https://doi.org/{DOI}. [Accessed {NOW}].`;

const replacer = (str: string, result: CitationResult) => {
  const now = new Date();
  const nowAccessDate = `${now.toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })}`;
  const then = new Date(result.date);
  const year = then.getFullYear().toString();
  const month = then.toLocaleDateString("en-us", { month: "long" });
  const day = then.getDate().toString();
  return str
    .replace(/{NOW}/g, nowAccessDate)
    .replace(/{JOURNAL}/g, result.publication)
    .replace(/{TITLE}/g, result.title)
    .replace(/{DAY}/g, day)
    .replace(/{MONTH}/g, month)
    .replace(/{YEAR}/g, year)
    .replace(/{DOI}/g, result.doi)
    .replace(/{SOURCE}/g, result.source);
};

export default ({
  format,
  result
}: {
  format: string;
  result: CitationResult;
}) => {
  if (format === "IEEE") return <span>{replacer(IEEE, result)}</span>;
  return <span>{result.publication}</span>;
};
