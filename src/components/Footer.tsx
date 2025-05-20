import Link from 'next/link';
import styles from './Footer.module.css'; // تأكد من استيراد ملف CSS

const Footer = () => {
  return (
    <footer className={`fix-height ${styles.footer}`}>
      <div className={styles.footerContainer}>
        {/* Logo + Description */}
        <div className={styles.footerSection}>
          <h2 className={styles.footerLogo}>Hosting Cloud</h2>
          <p className={styles.footerDescription}>أفضل حلول الاستضافة السحابية للأعمال والمطورين.</p>
        </div>

        {/* Navigation Links */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>روابط سريعة</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/services">الخدمات</Link></li>
            <li><Link href="/contact">اتصل بنا</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>تابعنا</h3>
          <div className={styles.socialIcons}>
            <Link href="https://facebook.com" aria-label="Facebook">🌐</Link>
            <Link href="https://twitter.com" aria-label="Twitter">🐦</Link>
            <Link href="https://instagram.com" aria-label="Instagram">📸</Link>
            <Link href="https://linkedin.com" aria-label="LinkedIn">💼</Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        &copy; {new Date().getFullYear()} Hosting Cloud. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;
