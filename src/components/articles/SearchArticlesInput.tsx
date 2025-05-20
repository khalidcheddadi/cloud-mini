"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchArticlesInput = () => {
    const router = useRouter();
  const [searchText, setsearchText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchText });

    router.push(`./articles/search?searchText=${searchText}`)
  };

  return (
    <>
      <div className="container">
        <form onSubmit={formSubmitHandler} className="search-form">
          <div className="input-group">
            <input
              type="search"
              id="searchText"
              placeholder="اكتب للبحث..."
              className="search-input"
              value={searchText}
              onChange={(e) => setsearchText(e.target.value)}
            />
            <button type="submit" className="search-button">بحث</button>
          </div>
        </form>
      </div>

      <style>
        {`
          .container {
            min-height: 10vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f3f3f3;
            padding: 20px;
          }

          .search-form {
            background: white;
            padding: 0px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
          }

          .label {
            display: block;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
          }

          .input-group {
            display: flex;
          }

          .search-input {
            flex: 1;
            padding: 12px 16px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-right: none;
            border-radius: 8px 0 0 8px;
            outline: none;
          }

          .search-input:focus {
            border-color: #007bff;
          }

          .search-button {
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 0 8px 8px 0;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .search-button:hover {
            background-color: #0056b3;
          }

          @media (max-width: 500px) {
            .input-group {
              flex-direction: column;
            }

            .search-input,
            .search-button {
              border-radius: 8px;
            }

            .search-button {
              margin-top: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

export default SearchArticlesInput;
