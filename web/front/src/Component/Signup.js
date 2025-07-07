import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from './Firebaseconfig'; // Import the firestore and auth objects
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save user data to Firestore
      const userRef = collection(db, 'users');
      await addDoc(userRef, {
        uid: userCredential.user.uid,
        displayName: username,
        email: email,
        password: password, 
        confirmPassword: confirmPassword,
        // Add any additional user data you want to save
      });

      // Clear input fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Show success message
      setShowSuccessMessage(true);

      // Redirect to login page after successful registration
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <div className="container-fluid signup-page-bg">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 p-4 border rounded-lg bg-white">
          <h2 className="mb-4 text-center" style={{ fontFamily: "initial" }}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="form-group mt-1">
              <label htmlFor="exampleInputUsername">Username</label>
              <input
                type="text"
                className="form-control mt-2"
                id="exampleInputUsername"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group mt-1">
              <label htmlFor="exampleInputEmail">Email address</label>
              <input
                type="email"
                className="form-control mt-2"
                id="exampleInputEmail"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group mt-1">
              <label htmlFor="exampleInputPassword">Password</label>
              <input
                type="password"
                className="form-control mt-2"
                id="exampleInputPassword"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group mt-1">
              <label htmlFor="exampleInputConfirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control mt-2"
                id="exampleInputConfirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-block mt-3">Signup</button>
            </div>
          </form>
          {/* Success message */}
          {showSuccessMessage && (
            <div className="alert alert-success" role="alert">
              Your account has been registered successfully!
            </div>
          )}
          <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
