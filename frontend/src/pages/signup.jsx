function Signup() {
  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <p>Join Uni-Rent for free</p>

      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button className="btn primary">Sign Up</button>
    </div>
  );
}

export default Signup;
