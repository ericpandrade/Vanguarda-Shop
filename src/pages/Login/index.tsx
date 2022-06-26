import styles from './style.module.scss'

import { useAuthContext } from '../../context/authContext';

import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { toast, ToastContainer } from 'react-toastify';

import shopImage from '../../assets/imageLogin.svg'
import githubIcon from "../../assets/Icons/github.svg";
import linkedinIcon from "../../assets/Icons/mail.svg";
import mailIcon from "../../assets/Icons/linkedin.svg";

interface ILogin {
  username: string;
}

const Login = () => {
  const { setHandleDataUsername } = useAuthContext()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<ILogin>();

  const verifyFieldUserName = (data: ILogin) => {
    const isVerified = !data.username ? true : false;

    return isVerified
  }

  const goToHomePage = () => {
    navigate('/home')
  }

  const onSubmit = (data: ILogin) => {
    if (verifyFieldUserName(data)) {
       toast.error("Por favor, preencha o campo de usuário.", {
         theme: "light",
         autoClose: 2000,
       });
    } else {
      const usernameFormated = data.username.trim();

      setHandleDataUsername(usernameFormated);
      localStorage.setItem("@Context/StateLogin", 'true');

      goToHomePage()
    }
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.apresentationAside}>
          <img src={shopImage} alt="Mulher segurando sacola de compras" />
          <h1>Bem vindos!</h1>
          <h1 className={styles.title}>VANGUARDA SHOP</h1>
        </section>
        <section className={styles.formAside}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.loginText}>Log in</h1>
            <div className={styles.formContainer}>
              <div className={styles.usernameContainer}>
                <label htmlFor="username">Nome de usuário</label>
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  placeholder="Digite seu nome de usuário"
                />
              </div>

              <button type="submit" className={styles.loginButton}>
                Login
              </button>
            </div>
          </form>
        </section>
      </main>
      <footer className={styles.contactFooter}>
        <button type="button">
          <a
            href="https://www.linkedin.com/in/eric-andrade-872a01210/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="Icone do GitHub" />
          </a>
        </button>
        <button type="button">
          <a
            href="https://github.com/ericpandrade"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="Icone do Linkedin" />
          </a>
        </button>
        <button type="button">
          <a
            href="mailto:ericpandrade@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mailIcon} alt="Icone do Gmail" />
          </a>
        </button>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Login