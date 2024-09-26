import { useState } from 'react';
import styles from '../../../styles/LoginForm.module.css';
import Image from 'next/image';

const LoginForm = ({ onLogin }) => {

  const [state, setState] = useState({
    loginUser: '',
    passwordUser: '',
    rememberMe: false,
  });

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    setState({
      ...state,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { loginUser, passwordUser } = state;
    await onLogin(loginUser, passwordUser);
    setState({
      loginUser: '',
      passwordUser: '',
      rememberMe: false,
    });
  };

  return (
    <div className={styles.container}>

      <div className={styles.formSection}>
        <form onSubmit={handleOnSubmit}>
          <Image
            src="/images/logo-MyHD.png"
            alt="Logo"
            className={styles.logoImage}
            width={250}
            height={280}
          />
          <p className={styles.connexionText}>Connexion</p>
          <p className={styles.infoText}>Pour continuer à <strong>My Havet Digital</strong></p>
          <input
            type="text"
            placeholder="Identifiant"
            name="loginUser"
            value={state.loginUser}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="passwordUser"
            placeholder="Mot de passe"
            value={state.passwordUser}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={state.rememberMe}
                onChange={handleChange}
              />
              Se souvenir de moi
            </label>
            <a href="/forgot-password" className={styles.forgotPassword}>Mot de passe oublié ?</a>
          </div>
          <button
            className={styles.submitButton}
            id="signIn"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.textContent}>
          <h2>Welcome</h2>
          <h2>To the website</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor enim, bibendum sed justo quis,
            accumsan eleifend mi. Morbi volutpat, dui feugiat pretium ullamcorper Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed dolor enim, bibendum sed justo quis, accumsan eleifend mi. Morbi
            volutpat, dui feugiat pretium ullamcorper.</p>
          <p><a href="/signup" className={styles.signupText}>No account?<strong className={styles.signupLink}> Sign up</strong> </a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
