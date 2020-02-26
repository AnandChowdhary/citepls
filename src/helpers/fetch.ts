import { CitationResult } from "../interfaces/result";

export const fetchCitationResult = async (query: string) => {
  const result = await fetch(`/api?q=${encodeURIComponent(query)}`);
  if (!result.ok) throw new Error(await result.text());
  return (await result.json()) as CitationResult;
};
