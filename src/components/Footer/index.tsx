import styles from "./style.module.scss";

import githubIcon from "../../assets/Icons/github.svg";
import linkedinIcon from "../../assets/Icons/mail.svg";
import mailIcon from "../../assets/Icons/linkedin.svg";

const Footer = () => {
  return (
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
  );
};

export default Footer;
