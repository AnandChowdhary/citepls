import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Article from "./search/Article";

export default () => {
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
            <h2>
              <Article />
            </h2>
          </TabPanel>
          <TabPanel>
            <p>Coming soon...</p>
          </TabPanel>
        </Tabs>
      </main>
      <footer>
        <p>&copy; 2020 Anand Chowdhary</p>
      </footer>
    </>
  );
};
