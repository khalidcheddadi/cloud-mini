import Image from "next/image";
import styles from "./About.module.css";
import CloudImage from "../../../public/cloud-hosting.png";

const AboutPage = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.description}>
        We specialize in delivering reliable and secure cloud hosting services.
        Our infrastructure is built for performance and scalability.
      </p>
      <div className={styles.imageWrapper}>
        <Image 
          src={CloudImage} 
          alt="Cloud Hosting Illustration" 
          width={500} 
          height={500}
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default AboutPage;
