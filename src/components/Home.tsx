import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CitationResult } from "../interfaces/result";
import Article from "./search/Article";
import Format from "./Format";
import "react-tabs/style/react-tabs.css";

export default () => {
  const [format, setFormat] = useState("IEEE");
  const [results, setResults] = useState<CitationResult[]>([]);
  const submitHandler = (result: CitationResult) => {
    console.log("Got result", result);
    setResults([result, ...results]);
  };
  return (
    <>
      <header>
        <h1>Citepls</h1>
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
              {[
                "IEEE",
                "APA",
                "MLA",
                "Harvard",
                "Vancouver",
                "Turabian",
                "Chicago",
                "JSON"
              ].map((name, index) => (
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
              ))}
            </div>
            {results.map((result, index) => (
              <article key={`${result.doi}_${index}`}>
                <Format format={format} result={result} />
              </article>
            ))}
          </div>
        ) : (
          ""
        )}
      </main>
      <footer>
        <p>
          &copy; 2020 <a href="https://anandchowdhary.com">Anand Chowdhary</a>
        </p>
      </footer>
    </>
  );
};
