import React, { useState } from 'react';

const Search = ({onSearch}) => {
    const [query, setQuery] = useState('');
    return (
        <div className="search">
            <label htmlFor="query">Pesquisar:</label>
            <input type="search" 
            name="query" 
            id="query" 
            value={query} 
            onChange={(e)=>setQuery(e.target.value)}/>
            <button onClick={() => onSearch(query)}>Buscar</button>
        </div>
      );
}
 
export default Search;