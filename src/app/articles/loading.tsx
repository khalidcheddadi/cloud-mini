import styles from './ArticlesLoading.module.css';

const ArticleSkeleton = [1, 2, 3, 4, 5, 6];

const ArticlesLoading = () => {
  return (
    <section className={`animate-pulse ${styles.container}`}>
      <div className={styles.searchBar}></div>

      <div className={styles.grid}>
        {ArticleSkeleton.map((item) => (
          <article key={item} className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.title}></h2>
              <p className={styles.summary}></p>
            </div>
            <div className={styles.readMore}></div>
          </article>
        ))}
      </div>

      <div className={styles.pagination}></div>
    </section>
  );
};

export default ArticlesLoading;
