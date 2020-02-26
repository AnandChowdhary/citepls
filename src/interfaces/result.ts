export interface CitationResult {
  urls: string[];
  url: string;
  dc: string;
  title: string;
  creator: string;
  publication: string;
  isbns: string[];
  date: Date;
  doi: string;
  citations: number;
  affiliations: {
    name: string;
    city: string;
    country: string;
  }[];
  number: string;
  openAccess: boolean;
  source: string;
  pages: string;
}
