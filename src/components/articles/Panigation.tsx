import Link from 'next/link';
import React from 'react';

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  let pagesArray: number[] = [];
  for(let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  return (
    <>
 

      <div className="pagination-container">
        {pageNumber !== 1 && (
          <Link href={`${route}?pageNumber=${ prev }`} className="pagination-button">prev</Link>
        )}
        {pagesArray.map(page => (
          <Link href={`${route}?pageNumber=${page}`} key={page} className={`${pageNumber === page ? "bg-gray-300 text-black" : "" } pagination-button`}>
            {page}
          </Link>
        ))}
        {pageNumber !== pages && (
          <Link href={`${route}?pageNumber=${ next }`} className="pagination-button">next</Link>
        )}
      </div>


           <style>
        {`
          .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0.5rem;
            margin-bottom: 2.5rem;
            gap: 0.5rem;
          }

          .pagination-button {
            border: 1px solid #4b5563; /* gray-700 */
            color: #4b5563;
            padding: 0.25rem 0.75rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.2s ease, color 0.2s ease;
          }

          .pagination-button:hover {
            background-color: #4b5563;
            color: white;
          }

          .pagination-button.active {
            background-color: #4b5563;
            color: white;
          }
        `}
      </style>
    </>

  );
};

export default Pagination;
