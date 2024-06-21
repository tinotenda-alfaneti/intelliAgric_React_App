import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';  
import { UserAuth } from '../../context/authContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await signIn(email, password);
      setSuccess(true);
      navigate('/');
    } catch (e) {
      setError('Invalid credentials');
      setSuccess(false);
      console.log(e.message);
    }
  };

  return (
    <div className="login-container">
      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="success-box">
          <p>Login successful!</p>
        </div>
      )}
      <div className="login-card">
        <h3>Welcome Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "  
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "  
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn signin-btn">Sign In</button>
        </form>
        <p className="text-sm mt-3">
          Don't have an account?{' '}
          <Link to="/signup" className="text-decoration-underline">Sign up</Link>
        </p>
        <div className="divider">
          <div className="line"></div>
          <div className="text">OR</div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
