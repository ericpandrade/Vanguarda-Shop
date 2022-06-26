import styles from './style.module.scss'

import { useAuthContext } from "../../context/authContext"

import logoVanguarda from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const Header = () => {
  const {handleDataUsername} = useAuthContext()
  const navigate = useNavigate()

  const goToLoginPage = () => {
    navigate("/");
  }

  const logout = () => {
    localStorage.removeItem("@Context/DataUsername");
    localStorage.setItem("@Context/StateLogin", "false");

    message.success('Você saiu da sua conta com sucesso!', 2)
    
    goToLoginPage()
  }

  return (
    <section className={styles.sectionHeader}>
      <img src={logoVanguarda} alt="Logo da Vanguarda Tech" />
      <div className={styles.containerInformations}>
        <h1>Bem vindo, {handleDataUsername}!</h1>
        <button onClick={logout}>SAIR</button>
      </div>
    </section>
  );
}

export default Header