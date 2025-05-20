"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";

interface AddCommentFormProps {
  ArticleId: number;
}

const AddCommentForm = ({ArticleId}: AddCommentFormProps) => {
  const router = useRouter();
  const [text, settext] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("النص ضروري للتعليق");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, ArticleId });
      router.refresh();
      settext("");
    } catch (error:any) {
      toast.error(error?.response?.data.message)

          }
  };

  return (
    <>
      <div className="comment-container">
        <form onSubmit={formSubmitHandler} className="comment-form">
          <h3 className="form-title">أضف تعليقًا</h3>
          <div className="input-group">
            <textarea
              id="text"
              placeholder="اكتب تعليقك هنا..."
              className="comment-input"
              value={text}
              onChange={(e) => settext(e.target.value)}
              rows={3}
            />
            <button type="submit" className="submit-button">تعليق</button>
          </div>
        </form>
      </div>

      <style>{`
        .comment-container {
          padding: 40px 20px;
          background-color: #f9f9f9;
          display: flex;
          justify-content: center;
        }

        .comment-form {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 30px;
          width: 100%;
          max-width: 600px;
        }

        .form-title {
          margin-bottom: 20px;
          font-size: 22px;
          font-weight: 600;
          text-align: center;
          color: #333;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .comment-input {
          padding: 16px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 10px;
          resize: vertical;
          transition: border-color 0.3s ease;
        }

        .comment-input:focus {
          border-color: #007bff;
          outline: none;
        }

        .submit-button {
          margin-top: 15px;
          padding: 12px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #0056b3;
        }

        @media (max-width: 500px) {
          .comment-form {
            padding: 20px;
          }

          .comment-input {
            font-size: 14px;
          }

          .submit-button {
            font-size: 14px;
            padding: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default AddCommentForm;
