import styles from "./style.module.scss";

import { useNavigate } from "react-router-dom";

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

interface IProps {
  searchName: string;
  shirtsInformations: IShirtInformations[];
}

const ListShirts = (props: IProps) => {
  const navigate = useNavigate();

  const conditionsToFilterTheSelect = (
    valueToBeSearched: IShirtInformations
  ) => {
    if (props.searchName === "") return valueToBeSearched;
    else if (valueToBeSearched.name.includes(props.searchName))
      return valueToBeSearched;
  };

  const goToDetailPageWithShirtInformations = (idShirt: number) => {
    navigate(`/detalhes/${idShirt}`);
  };

  return (
    <section className={styles.shirtsSection}>
      {props.shirtsInformations
        .filter((valueToBeSearched) =>
          conditionsToFilterTheSelect(valueToBeSearched)
        )
        .map((shirtInformationsMapped) => {
          return (
            <div
              key={shirtInformationsMapped.id}
              className={styles.cardContainer}
            >
              <img src={shirtInformationsMapped.photo} alt="Fotos de camisas" />
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
  );
};

export default ListShirts;
