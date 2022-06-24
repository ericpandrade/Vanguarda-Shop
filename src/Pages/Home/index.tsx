import styles from './style.module.scss'

import shopImage from '../../assets/imageLogin.svg'

import githubIcon from "../../assets/Icons/github.svg";
import linkedinIcon from "../../assets/Icons/mail.svg";
import mailIcon from "../../assets/Icons/linkedin.svg";

const Home = () => {
  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.apresentationAside}>
          <img src={shopImage} alt="Mulher segurando sacola de compras" />
          <h1>Bem vindos!</h1>
          <h1 className={styles.title}>VANGUARDA SHOP</h1>
        </section>
        <section className={styles.formAside}>
          <h1 className={styles.loginText}>Log in</h1>
          <div className={styles.formContainer}>
            <div className={styles.usernameContainer}>
              <label htmlFor="username">Nome de usuário</label>
              <input
                type="text"
                name="username"
                placeholder="Digite seu nome de usuário"
              />
            </div>
            <div className={styles.usernameContainer}>
              <label htmlFor="password">Senha</label>
              <input
                type="text"
                name="password"
                placeholder="Digite sua senha"
              />
            </div>

            <button className={styles.loginButton}>Login</button>
          </div>
        </section>
      </main>
      <footer className={styles.contactFooter}>
        <button>
          <a
            href="https://www.linkedin.com/in/eric-andrade-872a01210/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="" />
          </a>
        </button>
        <button>
          <a
            href="https://github.com/ericpandrade"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="" />
          </a>
        </button>
        <button>
          <a
            href="mailto:ericpandrade@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mailIcon} alt="" />
          </a>
        </button>
      </footer>
    </>
  );
}

export default Home