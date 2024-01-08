import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearch }) => {
  const handleChange = (e) => {
    // Implement your search logic here
    const searchText = e.target.value;
    handleSearch(searchText);
  };

  return (
    <Form inline className='d-flex flex-row justify-content-between'>
      <FormControl
        type="text"
        placeholder="Searchbar is currently inactive"
        className="col-lg-9 mx-2"
        onChange={handleChange}
      />
      <Button variant="outline-primary" className='col-lg-3 p-1 mx-2'>Search</Button>
    </Form>
  );
};

export default SearchBar;
