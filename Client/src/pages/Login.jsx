import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input style={styles.input} type="email" placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Password" />

      <button style={styles.primaryBtn}>Login</button>

      <p style={styles.text}>
        Don’t have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "120px auto",
    background: "#020617",
    padding: "30px",
    borderRadius: "16px",
    color: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
  },
  primaryBtn: {
    padding: "12px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
  text: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
  },
  link: {
    color: "#8b5cf6",
    cursor: "pointer",
  },
};

export default Login;
