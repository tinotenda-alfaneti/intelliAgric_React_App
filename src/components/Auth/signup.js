import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth} from '../../context/AuthContext';
import '../../Styles/auth.css';  

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const { createUser } = UserAuth();
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
        await createUser(email, password);
        navigate('/account')
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    };
  
    return (
      <div className="login-container">
        <div className="login-card">
          <h3>Welcome SignUp</h3>
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
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>
          <p className="text-sm mt-3">
            Don't have an account?{' '}
            <Link to="/signin" className="text-decoration-underline">Sign up</Link>
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
