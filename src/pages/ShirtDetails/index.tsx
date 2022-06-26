/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";

import Header from "../../components/Header";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, Form, Input, message, Modal, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { toast, ToastContainer } from "react-toastify";
interface IParamsProps {
  id?: string;
}

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

const ShirtDetails = () => {
  const { id } = useParams() as IParamsProps;

  const [order] = useForm();

  const [loading, setLoading] = useState(false);
  const [handleShirtInformation, setHandleShirtInformations] = useState(
    {} as IShirtDetail
  );

  const [toggleModalState, setToggleModalState] = useState(false);

  const { Option } = Select;

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/");
  };

  const goToHomePage = () => {
    navigate("/home");
  };

  useEffect(() => {
    const stateLogin = localStorage.getItem("@Context/StateLogin");
    if (stateLogin === "true") {
      setLoading(true);

      const resolveApiWithShirtInformations = () => {
        api
          .get(`camisas/${id}`)
          .then((response) => {
            setHandleShirtInformations(response.data);
          })
          .catch(() => {
            message.error("Por favor, coloque uma blusa existente na loja!");
            goToHomePage();
          })
          .finally(() => {
            setLoading(false);
          });
      };

      resolveApiWithShirtInformations();
    } else {
      message.warn("Você precisa estar logado para acessar essa página!", 2);
      goToLoginPage();
    }
  }, []);

  const togglePaymentModal = () => {
    setToggleModalState(!toggleModalState);
  };

  const verifyFields = {
    verifyIfFieldsAreEmpty: () => {
      const orderSize = order.getFieldValue("size");
      const orderAmount = order.getFieldValue("amount");

      const isVerified = !orderSize || !orderAmount ? true : false;

      return isVerified;
    },
    checkIfOrderIsInTheLimit: () => {
      const orderAmount = order.getFieldValue("amount");

      const isVerified = orderAmount >= 250 ? true : false;

      return isVerified;
    },
    checkIfOrderAmountISValid: () => {
      const orderAmount = order.getFieldValue("amount");

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

  const finalizePayment = () => {
    message.success(
      <div className={styles.messageSucces}>
        <span className={styles.messageCongratulations}>
          Parabéns, pedido finalizado com sucesso!
        </span>
        <div className={styles.orderSummaryContainer}>
          <strong className={styles.orderSummary}>Resumo do Pedido</strong>
          <span>Nome do pedido: {handleShirtInformation.name}</span>
          <span>
            Preço total: 
            {handleShirtInformation.price !== undefined &&
              (
                handleShirtInformation.price * order.getFieldValue("amount")
              ).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </div>
      </div>,
      5
    );

    goToHomePage()
  }

  return (
    <Spin spinning={loading}>
      <Form form={order} layout="vertical">
        <main className={styles.mainContainer}>
          <Header />
          <div className={styles.stepContainer}>
            <button
              type="button"
              onClick={goToHomePage}
              className={styles.stepButton}
            >
              Home
            </button>
            <strong>{">"}</strong>
            <button
              type="button"
              style={{ cursor: "text" }}
              className={styles.stepButton}
            >
              {handleShirtInformation?.name}
            </button>
          </div>
          <section className={styles.shirtDetailsContainer}>
            <div className={styles.photoContainer}>
              <img src={handleShirtInformation?.photo} alt="Foto da camisa" />
            </div>
            <div className={styles.informationContainer}>
              <h1>{handleShirtInformation?.name}</h1>

              <span className={styles.description}>
                {handleShirtInformation?.description}
              </span>

              <span className={styles.brand}>
                Marca: {handleShirtInformation?.brand}
              </span>
              <span className={styles.tissue}>
                Tecido: {handleShirtInformation?.tissue}
              </span>

              <div>
                <span className={styles.price}>
                  Preço:{" "}
                  {handleShirtInformation?.price !== undefined &&
                    handleShirtInformation?.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </span>
                <div className={styles.sizeAndAmountContainer}>
                  <div className={styles.sizeContainer}>
                    <Form.Item
                      name="size"
                      label="Tamanhos"
                      style={{ font: "600 1rem Poppins, sans-serif" }}
                      required
                    >
                      <Select className={styles.select} placeholder="Selecione">
                        {handleShirtInformation.size !== undefined
                          ? handleShirtInformation.size.map(
                              (shirtSizeMapped) => {
                                return (
                                  <Option
                                    key={shirtSizeMapped}
                                    value={shirtSizeMapped}
                                  >
                                    {shirtSizeMapped}
                                  </Option>
                                );
                              }
                            )
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
                <button
                  onClick={openPaymentModal}
                  className={styles.paymentButton}
                >
                  Pagamento
                </button>
              </div>
            </div>
          </section>
        </main>
        <Modal
          width={1000}
          style={{ minWidth: "300px" }}
          onCancel={togglePaymentModal}
          visible={toggleModalState}
          title={`Pagamento da blusa ${handleShirtInformation.name}`}
          footer={[
            <div className={styles.footerModalContainer}>
              <button
                onClick={togglePaymentModal}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button onClick={finalizePayment} className={styles.finalizeOrder}>Finalizar Pedido</button>
            </div>,
          ]}
        >
          <Card title="Resumo do Pedido">
            <div className={styles.containerCard}>
              <img src={handleShirtInformation?.photo} alt="Foto do Produto" />
              <span>{handleShirtInformation?.name}</span>

              <span>
                Tamanho <br /> {order.getFieldValue("size")}
              </span>
              <span>
                Preço <br />
                {handleShirtInformation.price !== undefined &&
                  handleShirtInformation.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </span>

              <span>
                Quantidade <br /> {order.getFieldValue("amount")}
              </span>
            </div>

            <h1 className={styles.totalPrice}>
              Total:{" "}
              {handleShirtInformation.price !== undefined &&
                (
                  handleShirtInformation.price * order.getFieldValue("amount")
                ).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
            </h1>
          </Card>
        </Modal>
      </Form>
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
    </Spin>
  );
};

export default ShirtDetails;
