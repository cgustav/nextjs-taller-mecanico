import Link from "next/link";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>
        Hecho con mucho <span className={styles.stack}>💪</span> y{" "}
        <span className={styles.stack}>🔥</span> por{" "}
        <Link href="https://github.com/cgustav">
          <span className={styles.stack}>CGustav</span>
        </Link>
      </h1>
    </div>
  );
};

export default Footer;
