import { FormInstance, message } from "antd";
import { useNavigate } from "react-router-dom";

import styles from "./style.module.scss";

interface IShirtDetail {
  price: number;
  brand: string;
  id: number;
  name: string;
  description: string;
  photo: string;
  size: string[];
  tissue: string;
}
interface IProps {
  modalState: boolean;
  setModalState: (modalState: boolean) => void;

  shirtInformation: IShirtDetail;

  dataForm: FormInstance<any>;
}

const ModalFooter = (props: IProps) => {
  const navigate = useNavigate();

  const togglePaymentModal = () => {
    props.setModalState(!props.modalState);
  };

  const goToHomePage = () => {
    navigate("/home");
  };
  
  const finalizePayment = () => {
    message.success(
      <div className={styles.messageSucces}>
        <span className={styles.messageCongratulations}>
          Parabéns, pedido finalizado com sucesso!
        </span>
        <div className={styles.orderSummaryContainer}>
          <strong className={styles.orderSummary}>Resumo do Pedido</strong>
          <span>Nome do pedido: {props.shirtInformation.name}</span>
          <span>
            Preço total:
            {props.shirtInformation.price !== undefined &&
              (
                props.shirtInformation.price *
                props.dataForm.getFieldValue("amount")
              ).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </div>
      </div>,
      5
    );

    goToHomePage();
  };

  return (
    <div
      key={props.shirtInformation.id}
      className={styles.footerModalContainer}
    >
      <button onClick={togglePaymentModal} className={styles.cancelButton}>
        Cancelar
      </button>
      <button onClick={finalizePayment} className={styles.finalizeOrder}>
        Finalizar Pedido
      </button>
    </div>
  );
};

export default ModalFooter;
