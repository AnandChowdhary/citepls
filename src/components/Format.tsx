import React from "react";
import { CitationResult } from "../interfaces/result";

const APA =
  "{APA_NAMES} ({YEAR}). {TITLE}. {JOURNAL}, {VOLUME}({ISSUE}), {PAGES}.";
const Harvard = `{HARVARD_NAMES}, {YEAR}, "{TITLE}", {JOURNAL}, vol. {VOLUME}, no. {ISSUE}, pp. {PAGES}.`;
const Vancouver = `{VANCOUVER_NAMES}. {TITLE}. {JOURNAL}. {YEAR};{VOLUME}({ISSUE}):{PAGES}.`;
const Turabian = `{TURABIAN_NAMES}. {YEAR}. {TITLE}. {JOURNAL} Volume {VOLUME}, no. {ISSUE}: {PAGES}.`;
const MLA = `{MLA_NAMES}, et al. "{TITLE}." {JOURNAL} {VOLUME}.2 (2095): {PAGES}. doi:{DOI}.`;
const Chicago = `{TURABIAN_NAMES}. {YEAR}. "{TITLE}."{JOURNAL} {VOLUME}, ({ISSUE}): {PAGES}.`;
const IEEE = `{IEEE_NAMES}, "{TITLE}," {JOURNAL}, vol. {VOLUME}, no. {ISSUE}, p. {PAGES}, {DAY}, {MONTH} {YEAR}. [Abstract]. Available: https://doi.org/{DOI}. [Accessed {NOW}].`;

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
  const mlaNames = `${result.authorResult[0]["ce:surname"]}, ${result.authorResult[0]["ce:given-name"]}`;
  let turabianNames = result.authorResult
    .map(i => `${i["ce:surname"]}, ${i["ce:given-name"]}`)
    .join(", ");
  if (turabianNames.split(",").length > 2)
    turabianNames = turabianNames.replace(/, ([^,]*)$/, " and $1");
  const vancouverNames = result.authorResult
    .map(
      i =>
        `${i["ce:surname"]}, ${i["ce:initials"]
          .replace(/\./g, "")
          .replace(/ /g, "")}`
    )
    .join(", ");
  let harvardNames = result.authorResult
    .map(i => `${i["ce:surname"]}, ${i["ce:initials"].replace(/ /g, "")}`)
    .join(", ");
  if (harvardNames.split(",").length > 2)
    harvardNames = harvardNames.replace(/, ([^,]*)$/, " & $1");
  let ieeeNames = result.authorResult
    .map(i => `${i["ce:initials"]} ${i["ce:surname"]}`)
    .join(", ");
  if (ieeeNames.split(",").length > 2)
    ieeeNames = ieeeNames.replace(/, ([^,]*)$/, " and $1");
  let apaNames = result.authorResult
    .map(i => `${i["ce:surname"]}, ${i["ce:initials"]}`)
    .join(", ");
  if (apaNames.split(",").length > 2)
    apaNames = apaNames.replace(/, ([^,]*)$/, " & $1");
  return str
    .replace(/{NOW}/g, nowAccessDate)
    .replace(/{JOURNAL}/g, result.publication)
    .replace(/{TITLE}/g, result.title)
    .replace(/{DAY}/g, day)
    .replace(/{PAGES}/g, result.pages)
    .replace(/{MONTH}/g, month)
    .replace(/{YEAR}/g, year)
    .replace(/{DOI}/g, result.doi)
    .replace(/{SOURCE}/g, result.source)
    .replace(/{IEEE_NAMES}/g, ieeeNames)
    .replace(/{VANCOUVER_NAMES}/g, vancouverNames)
    .replace(/{HARVARD_NAMES}/g, harvardNames)
    .replace(/{MLA_NAMES}/g, mlaNames)
    .replace(/{TURABIAN_NAMES}/g, turabianNames)
    .replace(/{APA_NAMES}/g, apaNames);
};

export default ({
  format,
  result
}: {
  format: string;
  result: CitationResult;
}) => {
  if (format === "IEEE") return <span>{replacer(IEEE, result)}</span>;
  if (format === "Harvard") return <span>{replacer(Harvard, result)}</span>;
  if (format === "Vancouver") return <span>{replacer(Vancouver, result)}</span>;
  if (format === "Turabian") return <span>{replacer(Turabian, result)}</span>;
  if (format === "MLA") return <span>{replacer(MLA, result)}</span>;
  if (format === "Chicago") return <span>{replacer(Chicago, result)}</span>;
  if (format === "JSON") return <span>{JSON.stringify(result)}</span>;
  return <span>{replacer(APA, result)}</span>;
};
