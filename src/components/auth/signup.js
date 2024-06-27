import '../../styles/auth.css'; 
import React, { useState } from 'react';
import { UserAuth} from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const { createUser } = UserAuth();
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess(false);
      try {
        await createUser(email, password);
        navigate('/signin');
        setSuccess(true);
      } catch (e) {
        setError(e.message);
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
          <p>Signup successful!</p>
        </div>
      )}
      <div className="login-card">
        <h3>Sign Up</h3>
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
          <button type="submit" className="btn signin-btn">Sign Up</button>
        </form>
        <p className="text-sm mt-3">
          Don't have an account?{' '}
          <Link to="/signin" className="text-decoration-underline">Sign In</Link>
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

export default Signup;
