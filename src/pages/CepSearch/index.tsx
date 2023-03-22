import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

// Representando os dados do formulário, cada campo do form
type FormData = {
  cep: string;
};

type Address = {
  logradouro: string;
  localidade: string;
};

const CepSearch = () => {
  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    // Iniciando com valor 
    cep: '',
  });

  // Evento ao alterar o form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Saber qual dos imputs foi altereado
    // pegar o nome do imput
    const name = event.target.name;
     // pegar o valor do imput
    const value = event.target.value;

    
    // Chama o estado e atualiza o valor dele (... aproveita o valor que já tem nele),  [name]: value (alterando o valor pelo nome)
    setFormData({ ...formData, [name]: value });
  };

  // Evento ao enviar o form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get(`https://viacep.com.br/ws/${formData.cep}/json/`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });
  };

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              // Amarrando a caixinha com o valor do estado(controle do dado que está na caixa)
              value={formData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>
        {/*Só renderiza o que tem para baixo se o address não for undefined*/}
        {address && (
          <>
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Localidade" description={address.localidade} />
          </>
        )}
      </div>
    </div>
  );
};

export default CepSearch;
