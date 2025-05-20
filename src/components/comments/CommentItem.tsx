"use client";

import React, { useState } from 'react';
import styles from './CommentItem.module.css';
import { CommentWithUser } from '@/utils/types';
import UpdateCommentModal from './UpdateCommentModal';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

// تعريف نوع الـ props
interface CommentProps {
  comment: CommentWithUser;
  userId: number | undefined
}

const CommentItem = ({ comment, userId }: CommentProps) => {
   const [open, setOpen] = useState(false);
   const router = useRouter()

     const commentDeleteHandler = async () => {
    try {
      if(confirm("you want delete this comment, Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        router.refresh();
      }
    } catch (error:any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  }
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.commentUser}>{comment.user.username}</span>
          <span className={styles.commentDate}>{new Date(comment.createdAt).toDateString()}</span>
        </div>
        <div className={styles.commentText}>{comment.text}</div>
        {userId === comment.userId ? (
          <div className={styles.commentActions}>
          <button onClick={commentDeleteHandler} >Delete <FaTrash className='text-red-600' /></button>
          <button onClick={() => setOpen(true)} >Update <FaEdit className='text-green-600' /></button>
        </div>
        ) :(
          <></>
        ) }
      </div>

      {open && 
        <UpdateCommentModal 
         setOpen={setOpen} 
         text={comment.text} 
         commentId={comment.id} 
        />
      }
    </div>
  );
};

export default CommentItem;
