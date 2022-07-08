import styles from './style.module.scss';

import { Form, Select } from "antd";
import { useForm } from "antd/lib/form/Form";

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
  handleSearch: (Search: string) => void;
  shirtsInformations: IShirtInformations[];
}

const SearchShirt = (
    props: IProps
) => {
  const [select] = useForm();

  const { Option } = Select;

  const handleShirtSearchedValue = (value: string) => {
    props.handleSearch(select.getFieldValue("select"));
  };

  const cleanSearch = () => {
    props.handleSearch("");
    select.resetFields();
  };

  return (
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
              {props.shirtsInformations.map((shirtInformationMapped) => {
                return (
                  <Option
                    key={shirtInformationMapped.id}
                    value={shirtInformationMapped.name}
                  >
                    {shirtInformationMapped.name}
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
  );
};

export default SearchShirt