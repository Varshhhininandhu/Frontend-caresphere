import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div id="login-box">
      <div className="left-panel">
        <h1 className="login-heading">Sign up</h1>
        
        <input type="text" className="login-input" name="username" placeholder="Username" />
        <input type="text" className="login-input" name="email" placeholder="E-mail" />
        <input type="text" className="login-input" name="phone number" placeholder="Phone Number"/>
        <input type="password" className="login-input" name="password" placeholder="Password" />
        <input type="password" className="login-input" name="password2" placeholder="Retype password" />
        <p className="lheading">Already a user? Login</p>
        <input type="submit" className="login-submit" name="signup_submit" value="Sign me up" />
      </div>
    </div>
  );
};

export default LoginForm;
