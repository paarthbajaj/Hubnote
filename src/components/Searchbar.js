import React from "react";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <form className="searchbar-form flex-row m-radius">
        <i className="fal fa-search"></i>
        <input
          typeof="submit"
          className="searchbar-input"
          placeholder="Search"
          required
        />
      </form>
    </div>
  );
};

export default Searchbar;
