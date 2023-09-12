// withSorting.js
import React, { useState } from 'react';

const withSorting = (WrappedComponent) => {
  return function WithSorting(props) {
    const [sortOrder, setSortOrder] = useState('asc');

    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedItems = sortOrder === 'asc' ? props.items : [...props.items].reverse();

    return (
      <WrappedComponent
        {...props}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        sortedItems={sortedItems}
      />
    );
  };
};

export default withSorting;
