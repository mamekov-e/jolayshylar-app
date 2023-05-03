import React, { useState } from 'react';

function SearchPanel({ onClose, onSearch }) {
    const [searchParams, setSearchParams] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setSearchParams((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSearch(searchParams);
    }

    return (
        <div>
            <h2>Search Panel</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="from">From:</label>
                    <input type="text" name="from" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="to">To:</label>
                    <input type="text" name="to" onChange={handleInputChange} />
                </div>
                <button type="submit">Search</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default SearchPanel;
