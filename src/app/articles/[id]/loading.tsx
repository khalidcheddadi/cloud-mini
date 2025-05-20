// app/articles/[id]/loading.tsx
import React from "react";
import styles from "./SingleArticleLoading.module.css";

const SingleArticleLoading = () => {
  return (
    <section className={`animate-pulse ${styles.container}`}>
      {/* عنوان المقال */}
      <div className={styles.title}></div>

      {/* تاريخ النشر */}
      <div className={styles.date}></div>

      {/* وصف المقال */}
      <div className={styles.body}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.lineShort}></div>
      </div>

      {/* فورم التعليق */}
      <div className={styles.commentInput}></div>

      {/* تعليقات */}
      <div className={styles.comments}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.comment}>
            <div className={styles.commentUser}></div>
            <div className={styles.commentText}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleArticleLoading;
