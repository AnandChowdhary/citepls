import React from "react";

export default () => {
  return (
    <>
      <header>
        <h1>Citegen</h1>
        <p>Unlimited free citation generator</p>
      </header>
      <main>
        <form>
          <label>
            <span>Article title</span>
            <input type="text" />
          </label>
          <button type="submit">Generate citation</button>
        </form>
      </main>
      <footer>
        <p>&copy; 2020 Anand Chowdhary</p>
      </footer>
    </>
  );
};
