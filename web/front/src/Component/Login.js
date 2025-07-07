import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebaseconfig'; 

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      
      
      
      if (user) {
        onLogin(user);
        
        navigate('/home');
      }
    } catch (error) {
      
      setError('Invalid email or password');
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="container-fluid login-page-bg">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 p-4 border rounded-lg bg-white">
          <h2 className="mb-4 text-center" style={{ fontFamily: "initial" }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-2">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control mt-3"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control mt-3"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <Link to="/reset">Forgot Password?</Link> 
          </div>
          <p className="mt-3 text-center">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
