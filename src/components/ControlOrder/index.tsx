import styles from "./style.module.scss";

import { Form, FormInstance, Input, Select } from "antd";
import { toast } from "react-toastify";

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
  controlForm: FormInstance<any>;
}

const ControlOrder = (props: IProps) => {
  const { Option } = Select;

  const togglePaymentModal = () => {
    props.setModalState(!props.modalState);
  };

  const verifyFields = {
    verifyIfFieldsAreEmpty: () => {
      const orderSize = props.controlForm.getFieldValue("size");
      const orderAmount = props.controlForm.getFieldValue("amount");

      const isVerified = !orderSize || !orderAmount ? true : false;

      return isVerified;
    },
    checkIfOrderIsInTheLimit: () => {
      const orderAmount = props.controlForm.getFieldValue("amount");

      const isVerified = orderAmount >= 250 ? true : false;

      return isVerified;
    },
    checkIfOrderAmountISValid: () => {
      const orderAmount = props.controlForm.getFieldValue("amount");

      const isVerified = orderAmount <= 0 ? true : false;

      return isVerified;
    },
  };

  const openPaymentModal = () => {
    if (verifyFields.verifyIfFieldsAreEmpty()) {
      toast.error("Por favor, preencha todos os campos.", {
        theme: "light",
        autoClose: 2000,
      });
    } else if (verifyFields.checkIfOrderAmountISValid()) {
      toast.error("Por favor, digite uma quantidade válida! (Acima de 0).", {
        theme: "light",
        autoClose: 2000,
      });
    } else if (verifyFields.checkIfOrderIsInTheLimit()) {
      toast.error(
        "A quantidade limite de pedidos é de 250. Por favor, diminua a quantidade solicitada!",
        {
          theme: "light",
          autoClose: 2000,
        }
      );
    } else {
      togglePaymentModal();
    }
  };

  return (
    <>
      <div className={styles.sizeAndAmountContainer}>
        <div className={styles.sizeContainer}>
          <Form.Item
            name="size"
            label="Tamanhos"
            style={{ font: "600 1rem Poppins, sans-serif" }}
            required
          >
            <Select placeholder="Selecione">
              {props.shirtInformation.size !== undefined
                ? props.shirtInformation.size.map((shirtSizeMapped) => {
                    return (
                      <Option key={shirtSizeMapped} value={shirtSizeMapped}>
                        {shirtSizeMapped}
                      </Option>
                    );
                  })
                : ""}
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="amount"
            label="Quantidade"
            style={{ font: "600 1rem Poppins, sans-serif" }}
            required
          >
            <Input
              placeholder="Quantidade desejada"
              type="number"
              min={0}
              style={{ maxWidth: "200px" }}
            />
          </Form.Item>
        </div>
      </div>
      <button onClick={openPaymentModal} className={styles.paymentButton}>
        Pagamento
      </button>
    </>
  );
};

export default ControlOrder;
