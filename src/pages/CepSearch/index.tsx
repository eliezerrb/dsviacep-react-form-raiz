import './styles.css';

import ResultCard from 'components/ResultCard';

const CepSearch = () => {

  // Evento ao alterar o form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Mudou para: " + event.target.value);
  }

  // Evento ao enviar o form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Clicou o botão");
  }

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>

        <ResultCard title="Logradouro" description="Lalala" />
        <ResultCard title="Número" description="234" />

      </div>
    </div>
  );
};

export default CepSearch;
