import React, { useState, FormEvent } from "react";
import { fetchCitationResult } from "../../helpers/fetch";
import { CitationResult } from "../../interfaces/result";

export default ({ onSubmit }: { onSubmit(result: CitationResult): void }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await fetchCitationResult(title);
      onSubmit(result);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={submit}>
      {loading ? (
        <div className="loading">
          <img src="/loading.svg" />
          <p>Finding your article...</p>
        </div>
      ) : (
        <>
          {error ? (
            <div className="error">
              <strong>Error: </strong>We couldn't find the provided title.
            </div>
          ) : (
            ""
          )}
          <label>
            <span>Article title</span>
            <input
              placeholder="Enter the full title"
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </label>
          <button type="submit">Generate citation</button>
          <p>
            Copy and paste the full <strong>title</strong> of the journal
            article, <u>not</u> its URL.
          </p>
        </>
      )}
    </form>
  );
};
