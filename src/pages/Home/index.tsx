/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import { Form, message, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import api from "../../services/api";

import styles from "./style.module.scss";

interface IShirtInformations {
  price: number;
  brand: string;
  id: number;
  name: string;
  description: string;
  photo: string;
  size: string[];
  tisse: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [select] = useForm();

  const { Option } = Select;

  const [loading, setLoading] = useState(false);
  const [handleShirtInformations, setHandleShirtInformations] = useState(
    [] as IShirtInformations[]
  );

  const [handleSearch, setHandleSearch] = useState("");

  const goToLoginPage = () => {
    navigate("/");
  };

  useEffect(() => {
    const stateLogin = localStorage.getItem("@Context/StateLogin")

    if ((stateLogin) === 'true') {
      setLoading(true);
  
      const resolveApiWithShirtInformations = () => {
        api
          .get("camisas")
          .then((response) => {
            setHandleShirtInformations(response.data);
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

  const conditionsToFilterTheSelect = (valueToBeSearched: IShirtInformations) => {
    if (handleSearch === "") return valueToBeSearched;
    else if (valueToBeSearched.name.includes(handleSearch)) return valueToBeSearched;
  };

  const handleShirtSearchedValue = (value: string) => {
    setHandleSearch(select.getFieldValue("select"));
  };

  const cleanSearch = () => {
    setHandleSearch("");
    select.resetFields();
  };

  const goToDetailPageWithShirtInformations = (idShirt: number) => {
    navigate(`/detalhes/${idShirt}`);
  };

  return (
    <Spin spinning={loading}>
      <main className={styles.mainContainer}>
        <Header />
        <section className={styles.helpSession}>
          <Form form={select}>
            <div className={styles.selectContainer}>
              <strong>Procura algo em específico?</strong>
              <Form.Item name="select">
                <Select
                  style={{
                    width: "300px",
                    textAlign: "center",
                    borderRadius: "1rem",
                  }}
                  dropdownStyle={{ minWidth: "max-content" }}
                  placeholder="Selecione"
                  onChange={handleShirtSearchedValue}
                >
                  {handleShirtInformations.map((shirtInformationsMapped) => {
                    return (
                      <Option
                        key={shirtInformationsMapped.id}
                        value={shirtInformationsMapped.name}
                      >
                        {shirtInformationsMapped.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <button onClick={cleanSearch} className={styles.cleanSearch}>
                Limpar Busca
              </button>
            </div>
          </Form>
        </section>

        <section className={styles.shirtsSection}>
          {handleShirtInformations
            .filter((valueToBeSearched) =>
              conditionsToFilterTheSelect(valueToBeSearched)
            )
            .map((shirtInformationsMapped) => {
              return (
                <div
                  key={shirtInformationsMapped.id}
                  className={styles.cardContainer}
                >
                  <img
                    src={shirtInformationsMapped.photo}
                    alt="Fotos de camisas"
                  />
                  <span>{shirtInformationsMapped.name}</span>
                  <strong>
                    {shirtInformationsMapped.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>

                  <button
                    onClick={() =>
                      goToDetailPageWithShirtInformations(
                        shirtInformationsMapped.id
                      )
                    }
                    className={styles.detailsProduct}
                  >
                    Ver Detalhes do Produto
                  </button>
                </div>
              );
            })}
        </section>
      </main>
    </Spin>
  );
};

export default Home;
