import React, { useState, FormEvent } from "react";

export default ({
  onSubmit
}: {
  onSubmit(type: string, query: string): void;
}) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    onSubmit("article", title);
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
