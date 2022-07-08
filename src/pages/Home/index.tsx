/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import { message, Spin } from "antd";

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import ListShirts from "../../components/ListShirts";
import SearchShirt from "../../components/SearchShirt";
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
  const [loading, setLoading] = useState(false);
  const [handleShirtInformations, setHandleShirtInformations] = useState(
    [] as IShirtInformations[]
  );

  const navigate = useNavigate();

  const [handleSearch, setHandleSearch] = useState("");

  const goToLoginPage = () => {
    navigate("/");
  };

  useEffect(() => {
    const stateLogin = localStorage.getItem("@Context/StateLogin");

    if (stateLogin === "true") {
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

  return (
    <Spin spinning={loading}>
      <main className={styles.mainContainer}>
        <Header />

        <SearchShirt
          handleSearch={setHandleSearch}
          shirtsInformations={handleShirtInformations}
        />

        <ListShirts
          searchName={handleSearch}
          shirtsInformations={handleShirtInformations}
        />
      </main>
      <Footer />
    </Spin>
  );
};

export default Home;
