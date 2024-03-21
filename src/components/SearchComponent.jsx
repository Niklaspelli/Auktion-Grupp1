import React, { useState } from 'react';

const SearchComponent = ({ searchTerm, setSearchTerm, data }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.id.toString().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <Button variant="outline-success" onClick={handleSearch}>
        Search
      </Button>
      {}
    </>
  );
};

export default SearchComponent;
