import Image from "next/image";
import { TiTick } from "react-icons/ti";
import CloudImage from "../../../public/cloud-hosting.png";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={CloudImage}
          alt="Cloud Hosting"
          width={500}
          height={300}
          priority
        />
      </div>

      <div className={styles.textContent}>
        <h1>Cloud Hosting</h1>
        <p>The best web hosting solution for your online success</p>

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <TiTick />
            <p>Easy To Use Control Panel</p>
          </div>
          <div className={styles.featureItem}>
            <TiTick />
            <p>Secure Hosting</p>
          </div>
          <div className={styles.featureItem}>
            <TiTick />
            <p>Fast and Reliable Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
