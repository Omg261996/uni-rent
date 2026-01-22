function Login() {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <p>Welcome back to Uni-Rent</p>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button className="btn primary">Login</button>
    </div>
  );
}

export default Login;
