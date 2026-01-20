function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Uni-Rent</h2>
      <div style={styles.links}>
        <span>Login</span>
        <span>Signup</span>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #ddd",
  },
  links: {
    display: "flex",
    gap: "20px",
    cursor: "pointer",
  },
};

export default Navbar;
