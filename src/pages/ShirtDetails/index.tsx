/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./style.module.scss";

import Header from "../../components/Header";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, Form, message, Modal, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ToastContainer } from "react-toastify";
import ControlOrder from "../../components/ControlOrder";
import ModalFooter from "../../components/ModalFooter";
import Footer from "../../components/Footer";
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
              </div>
              <ControlOrder
                controlForm={order}
                modalState={toggleModalState}
                setModalState={setToggleModalState}
                shirtInformation={handleShirtInformation}
              />
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
            <ModalFooter
              shirtInformation={handleShirtInformation}
              dataForm={order}
              modalState={toggleModalState}
              setModalState={setToggleModalState}
            />,
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

                <Footer />

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
