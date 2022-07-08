import styles from './style.module.scss'

import { ToastContainer } from 'react-toastify';

import shopImage from '../../assets/imageLogin.svg'
import LoginForm from '../../components/LoginForm';
import Footer from '../../components/Footer';

const Login = () => {
  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.apresentationAside}>
          <img src={shopImage} alt="Mulher segurando sacola de compras" />
          <h1>Bem vindos!</h1>
          <h1 className={styles.title}>VANGUARDA SHOP</h1>
        </section>

        <LoginForm />
        <Footer />
      </main>
      
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