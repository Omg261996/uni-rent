function Landing() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Uni-Rent</h1>
      <p style={styles.subtitle}>
        A peer-to-peer rental platform for students
      </p>

      <div style={styles.buttons}>
        <button style={styles.primary}>Get Started</button>
        <button style={styles.secondary}>Explore</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
  buttons: {
    display: "flex",
    gap: "15px",
  },
  primary: {
    padding: "12px 24px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  secondary: {
    padding: "12px 24px",
    background: "transparent",
    border: "1px solid #000",
    cursor: "pointer",
  },
};

export default Landing;
