"use client"

import { useState } from "react";
import { TiTick } from "react-icons/ti";

const WebHostingPlan = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <h3 style={styles.planTitle}>Premium</h3>
      <strong style={styles.price}>$4.99/mo</strong>
      <span style={styles.discount}>10% OFF</span>

      <div style={styles.featuresSection}>
        <h5 style={styles.featuresTitle}>Top Features</h5>
        <div style={styles.featureItem}>
          <TiTick style={styles.icon} /> 100 Websites
        </div>
        <div style={styles.featureItem}>
          <TiTick style={styles.icon} /> Free SSL Certificate
        </div>
        <div style={styles.featureItem}>
          <TiTick style={styles.icon} /> Unlimited Bandwidth
        </div>
      </div>

      <button
        style={{
          ...styles.button,
          ...(isHovered ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        BUY NOW
      </button>
    </div>
  );
};

// CSS-in-JS styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "25px",
    background: "linear-gradient(145deg, rgba(30, 60, 114, 0.9), rgba(42, 82, 152, 0.85))",
    color: "white",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  planTitle: {
    fontSize: "32px",
    marginBottom: "12px",
    letterSpacing: "1px",
  },
  price: {
    fontSize: "28px",
    color: "#ffd700",
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  discount: {
    backgroundColor: "#ff4d4f",
    color: "white",
    padding: "6px 14px",
    borderRadius: "30px",
    fontWeight: "600",
    fontSize: "13px",
    display: "inline-block",
    boxShadow: "0 2px 10px rgba(255, 77, 79, 0.4)",
  },
  featuresSection: {
    marginTop: "30px",
    textAlign: "left",
  },
  featuresTitle: {
    fontSize: "22px",
    marginBottom: "15px",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    paddingBottom: "8px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "17px",
    marginBottom: "12px",
    transition: "transform 0.2s ease-in-out",
    cursor: "default",
  },
  icon: {
    color: "#00ffab",
    marginRight: "10px",
    fontSize: "22px",
  },
  button: {
    marginTop: "30px",
    padding: "14px 40px",
    fontSize: "16px",
    background: "linear-gradient(135deg, #00f260, #0575e6)",
    color: "white",
    border: "white 1px solid",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(0, 242, 96, 0.4)",
    transition: "all 0.3s ease-in-out",
  },
  buttonHover: {
    transform: "scale(1.05)",
    background: "linear-gradient(135deg, rgb(41 153 85), rgb(5, 117, 230))",
    boxShadow: "0 12px 30px rgba(0, 242, 96, 0.6)",
  },
};

export default WebHostingPlan;
