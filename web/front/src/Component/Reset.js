import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './Firebaseconfig'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; 

function Reset() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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

    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent. Please check your email and Enter the Same Password As you Enter in the Fields');

      
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
          password: password ,
          confirmPassword: confirmPassword 
        });
      }
    } catch (error) {
      setError('Error resetting password: ' + error.message);
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <div className="container-fluid signup-page-bg">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 p-4 border rounded-lg bg-white">
          <h2 className="mb-4 text-center" style={{ fontFamily: "initial" }}>Reset Password</h2>
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
              <label htmlFor="exampleInputPassword">New Password</label>
              <input
                type="password"
                className="form-control mt-3"
                id="exampleInputPassword"
                placeholder="New Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="exampleInputConfirmPassword">Confirm New Password</label>
              <input
                type="password"
                className="form-control mt-3"
                id="exampleInputConfirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-block mt-3">Reset Password</button>
            </div>
          </form>
          <p className="mt-3 text-center">Remember your password? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Reset;
