import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Article from "./search/Article";
import { CitationResult } from "../interfaces/result";

export default () => {
  const [format, setFormat] = useState("IEEE");
  const [results, setResults] = useState<CitationResult[]>([
    {
      urls: [
        "https://api.elsevier.com/content/abstract/scopus_id/85077529745",
        "https://api.elsevier.com/content/abstract/scopus_id/85077529745?field=author,affiliation",
        "https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85077529745&origin=inward",
        "https://www.scopus.com/inward/citedby.uri?partnerID=HzOxMe3b&scp=85077529745&origin=inward"
      ],
      url: "https://api.elsevier.com/content/abstract/scopus_id/85077529745",
      dc: "SCOPUS_ID:85077529745",
      title:
        "Schematherapy in DID: treatment length and related studies on dissociative amnesia",
      creator: "Huntjens R.",
      publication: "European Journal of Psychotraumatology",
      isbns: [],
      date: new Date("2020-12-31T00:00:00.000Z"),
      doi: "10.1080/20008198.2020.1711638",
      citations: 0,
      affiliations: [
        {
          name: "University of Groningen",
          city: "Groningen",
          country: "Netherlands"
        }
      ],
      number: "1711638",
      openAccess: true
    }
  ]);
  const submitHandler = (result: CitationResult) => {
    console.log("Got result", result);
    setResults([result, ...results]);
  };
  return (
    <>
      <header>
        <h1>Citegen</h1>
        <p>Unlimited free citation generator</p>
      </header>
      <main>
        <Tabs className="home-tabs">
          <TabList>
            <Tab>Journal article</Tab>
            <Tab>Website</Tab>
          </TabList>
          <TabPanel>
            <Article onSubmit={submitHandler} />
          </TabPanel>
          <TabPanel>
            <p>Coming soon...</p>
          </TabPanel>
        </Tabs>
        {results.length ? (
          <div className="citations">
            <h2>Your citations</h2>
            <div className="radios">
              <strong>Format:</strong>
              {["IEEE", "APA", "MLA", "Chicago", "Harvard", "JSON"].map(
                (name, index) => (
                  <label key={`${name}_${index}`}>
                    <input
                      name="format"
                      value={name}
                      type="radio"
                      checked={format === name}
                      onChange={event => setFormat(event.currentTarget.value)}
                    />
                    <span>{name}</span>
                  </label>
                )
              )}
            </div>
            {results.map((result, index) => (
              <article key={`${result.doi}_${index}`}>
                <p>{result.title}</p>
              </article>
            ))}
          </div>
        ) : (
          ""
        )}
      </main>
      <footer>
        <p>&copy; 2020 Anand Chowdhary</p>
      </footer>
    </>
  );
};
