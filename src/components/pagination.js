import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, previous, next, currentPage }) => {
  const pageNumbers = [];
  const maxVisiblePages = 3; // Maximum number of visible page numbers

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const visiblePageNumbers = calculateVisiblePageNumbers(currentPage, pageNumbers, maxVisiblePages);

  function calculateVisiblePageNumbers(currentPage, pageNumbers, maxVisiblePages) {
    const totalPages = pageNumbers.length;
    const visiblePages = [];

    if (currentPage <= maxVisiblePages) {
      // If current page is within the first few pages
      visiblePages.push(...pageNumbers.slice(0, maxVisiblePages));
    } else if (currentPage > totalPages - maxVisiblePages) {
      // If current page is within the last few pages
      visiblePages.push(...pageNumbers.slice(totalPages - maxVisiblePages));
    } else {
      // If current page is in the middle pages
      const startIndex = currentPage - Math.floor(maxVisiblePages / 2);
      visiblePages.push(...pageNumbers.slice(startIndex, startIndex + maxVisiblePages));
    }

    return visiblePages;
  }

  return (
    <div className='py-10'>
      <nav className='flex justify-center'>
        <ul className='flex pl-0 list-none flex-wrap'>
          {currentPage !== 1 && (
            <li>
              <button
                onClick={() => previous()}
                className='bg-white text-blue-500 hover:bg-gray-300 px-4 py-2 mx-1 border border-gray-400'
              >
                Prev
              </button>
            </li>
          )}

          {currentPage > maxVisiblePages && (
            <li>
              <button
                onClick={() => paginate(1)}
                className='bg-white text-blue-500 hover:bg-gray-300 px-4 py-2 mx-1 border border-gray-400'
              >
                1
              </button>
              <span className='px-2'>...</span>
            </li>
          )}

          {visiblePageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`${
                  currentPage === number
                    ? 'bg-blue-500 text-white hover:bg-blue-700'
                    : 'bg-white text-blue-500 hover:bg-gray-300 disabled'
                } px-4 py-2 border border-gray-400`}
              >
                {number}
              </button>
            </li>
          ))}

          {currentPage < pageNumbers.length - maxVisiblePages + 1 && (
            <li>
              <span className='px-2'>...</span>
              <button
                onClick={() => paginate(pageNumbers.length)}
                className='bg-white text-blue-500 hover:bg-gray-300 px-4 py-2 mx-1 border border-gray-400'
              >
                {pageNumbers.length}
              </button>
            </li>
          )}

          {currentPage !== pageNumbers.length && (
            <li>
              <button
                onClick={() => next()}
                className='bg-white text-blue-500 hover:bg-gray-300 px-4 py-2 mx-1 border border-gray-400'
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
