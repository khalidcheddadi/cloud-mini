import Link from "next/link";
import LoginForm from "./LoginForm";

const LoginPage = async () => {

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>تسجيل الدخول</h2>
        <LoginForm />
        <p style={styles.footer}>
          لا تملك حساباً؟ <Link href="/register" style={styles.link}>سجل الآن</Link>
        </p>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  container: {
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
    color: "#fff",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "24px",
    textAlign: "center",
    color: "#fff",
  },

  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#ccc",
  },
  link: {
    color: "#fff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default LoginPage;
