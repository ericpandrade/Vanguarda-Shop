import styles from "./style.module.scss";

import { useAuthContext } from "../../context/authContext";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

interface ILogin {
  username: string;
}

const LoginForm = () => {
  const { setHandleDataUsername } = useAuthContext();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ILogin>();

  const verifyFieldUserName = (data: ILogin) => {
    const isVerified = !data.username ? true : false;

    return isVerified;
  };

  const goToHomePage = () => {
    navigate("/home");
  };

  const onSubmit = (data: ILogin) => {
    if (verifyFieldUserName(data)) {
      toast.error("Por favor, preencha o campo de usuário.", {
        theme: "light",
        autoClose: 2000,
      });
    } else {
      const usernameFormated = data.username.trim();

      setHandleDataUsername(usernameFormated);
      localStorage.setItem("@Context/StateLogin", "true");

      goToHomePage();
    }
  };

  return (
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
  );
};

export default LoginForm;
