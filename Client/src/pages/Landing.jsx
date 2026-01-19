const Landing = () => {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>UniRent</h2>
        <div>
          <button style={styles.login}>Login</button>
          <button style={styles.signup}>Sign Up</button>
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <h1>
          Rent Smart. <br />
          <span style={{ color: "#6366f1" }}>Not Expensive.</span>
        </h1>

        <p style={styles.text}>
          A peer-to-peer renting platform where users can rent items securely
          with verified pickup, return, and transparent deposits.
        </p>

        <button style={styles.cta}>Get Started</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#e5e7eb",
    padding: "20px 60px",
    fontFamily: "Inter, sans-serif",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  login: {
    marginRight: "10px",
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #64748b",
    color: "#e5e7eb",
    borderRadius: "6px",
    cursor: "pointer",
  },
  signup: {
    padding: "8px 16px",
    background: "#6366f1",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
  hero: {
    marginTop: "120px",
    maxWidth: "600px",
  },
  text: {
    marginTop: "20px",
    color: "#94a3b8",
    lineHeight: "1.6",
  },
  cta: {
    marginTop: "30px",
    padding: "12px 22px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Landing;
