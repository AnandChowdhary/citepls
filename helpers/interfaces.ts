export interface ScopusEntry {
  link: {
    "@href": string;
  }[];
  "prism:url": string;
  "dc:identifier": string;
  eid: string;
  "dc:title": string;
  "dc:creator": string;
  "prism:publicationName": string;
  "prism:isbn"?: {
    $: string;
  }[];
  "prism:coverDate": string;
  "prism:coverDisplayDate": string;
  "prism:doi": string;
  "citedby-count": number;
  affiliation: {
    affilname: string;
    "affiliation-city": string;
    "affiliation-country": string;
  }[];
  "prism:aggregationType": string;
  "prism:pageRange": string;
  subtype: string;
  subtypeDescription: string;
  "article-number": number;
  "source-id": number;
  openaccessFlag: boolean;
}

export interface ScopusResult {
  "search-results": {
    "opensearch:totalResults": number;
    "opensearch:startIndex": number;
    "opensearch:itemsPerPage": number;
    "opensearch:Query": {
      "@role": "request";
      "@searchTerms": string;
      "@startPage": number;
    };
    link: {
      "@href": string;
      "@type": "application/json";
    }[];
    entry: ScopusEntry[];
  };
}

export interface Author {
  "ce:given-name": string;
  "ce:initials": string;
  "ce:degrees": string;
  "ce:surname": string;
  "ce:indexed-name": string;
}

export interface AbstractResponse {
  "abstracts-retrieval-response": {
    coredata: {
      "dc:creator": {
        author: Author[];
      };
    };
  };
}
