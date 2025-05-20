"use client";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ArticlesErrorPage = ({ error, reset }: ErrorPageProps) => {
  return ( 
    <div className="pt-7 text-center">
        <p className="text-center text-black px-4">this is error articles page </p>
      <div className="text-3xl text-red-600 font-semibold">
        something went wrong 
      </div>
      <h3>Error Message: {error.message}</h3>
      
      <button 
        className="bg-blue-600 hover:bg-red-500 text-white font-bold p-2 px-4 rounded-full"
        onClick={() => reset()}
      >
        Try again 
      </button> 
      
      <Link href="/" className="text-xl underline text-blue-600 block mt-6">
        Go to Home Page 
      </Link> 
    </div>
  )
}

export default ArticlesErrorPage;