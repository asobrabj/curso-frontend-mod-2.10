import React, { useState } from 'react';

// HOC para manipulação de formulário e validação
const withFormHandling = (initialState, validationFn) => (WrappedComponent) => {
  return () => {
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [formList, setFormList] = useState([]);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      
      if (formErrors[name]) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const errors = validationFn(formData);

      if (Object.keys(errors).length === 0) {
        
        const newItem = { ...formData };
        setFormList([...formList, newItem]);
        setFormData(initialState);
      } else {
        
        setFormErrors(errors);
      }
    };

    return (
      <WrappedComponent
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formList={formList}
      />
    );
  };
};


const validateForm1 = (formData) => {
  const errors = {};

  if (!formData.nome.trim()) {
    errors.nome = 'Nome é obrigatório';
  }

  
  if (formData.endereco.length < 5) {
    errors.endereco = 'Endereço deve ter pelo menos 5 caracteres';
  }

  if (formData.bairro.length < 3) {
    errors.bairro = 'Bairro deve ter pelo menos 3 caracteres';
  }

  if (!formData.cidade.trim()) {
    errors.cidade = 'Cidade é obrigatório';
  }

  return errors;
};


const validateForm2 = (formData) => {
  const errors = {};

  
  if (!formData.email) {
    errors.email = "Email é obrigatório";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Email inválido";
  }

  
  if (formData.cpf.length !== 11) {
    errors.cpf = 'CPF deve ter 11 caracteres';
  }

  return errors;
};


const Formulario1 = ({
  formData,
  formErrors,
  handleChange,
  handleSubmit,
  formList,
}) => {
  return (
    <div className='container_form1'>
      <h4>Formulário 1</h4>
      <form onSubmit={handleSubmit}>

        <div>
          <label className='llabel' htmlFor="nome">Nome......: </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          {formErrors.nome && <div className="error-message">{formErrors.nome}</div>}
        </div>

        <div>
          <label className='llabel' htmlFor="endereco">Endereço: </label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
          {formErrors.endereco && <div className="error-message">{formErrors.endereco}</div>}
        </div>

        <div>
          <label className='llabel' htmlFor="bairro">Bairro.......: </label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
          {formErrors.bairro && <div className="error-message">{formErrors.bairro}</div>}
        </div>

        <div>
          <label className='llabel' htmlFor="cidade">Cidade.....: </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
          {formErrors.cidade && <div className="error-message">{formErrors.cidade}</div>}
        </div>

        <button type="submit">Enviar Formulário 1</button>
      </form>
      <h5 className='lista'>Lista do Formulário 1</h5>
      <ul>
        {formList.map((item, index) => (
          <li className='listagem' key={index}>
            <p>Nome: {item.nome}</p>
            <p>Endereço: {item.bairro}</p>
            <p>Bairro: {item.bairro} - Cidade: {item.cidade}</p>
            <p>. . . . . . .</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Formulario2 = ({
  formData,
  formErrors,
  handleChange,
  handleSubmit,
  formList,
}) => {
  return (
    <div className='container_form2'>
      <h4>Formulário 2</h4>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label className='llabel' htmlFor="grauescolar">Grau escolar..........: </label>
          <input
            type="text"
            id="grauescolar"
            name="grauescolar"
            value={formData.grauescolar}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className='llabel' htmlFor="email">E-mail.......................: </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        </div>

        <div>
          <label className='llabel' htmlFor="cpf">CPF (sem pontos): </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
          {formErrors.cpf && <div className="error-message">{formErrors.cpf}</div>}
        </div>

        <div>
          <label className='llabel' htmlFor="sobrevoce">Fale sobre você....: </label>
          <input
            type="text"
            id="sobrevoce"
            name="sobrevoce"
            value={formData.sobrevoce}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enviar Formulário 2</button>
      </form>
      <h5 className='lista'>Lista do Formulário 2</h5>
      <ul>
        {formList.map((item, index) => (
          <li className='listagem' key={index}>
            <p>Grau escolar: {item.grauescolar}</p>
            <p>E-mail: {item.email}</p>
            <p>CPF: {item.cpf}</p>
            <p>Sobre você: {item.sobrevoce}</p>
            <p>. . . . . . .</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


const Formulario1WithHandling = withFormHandling(
  { nome: '', endereco: '', bairro: '', cidade: '' },
  validateForm1
)(Formulario1);

const Formulario2WithHandling = withFormHandling(
  { grauescolar: '', email: '', cpf: '', sobrevoce: '' },
  validateForm2
)(Formulario2);

const Forms = () => {
  return (
    <div>
      <Formulario1WithHandling />
      <Formulario2WithHandling />
    </div>
  );
};

export default Forms;
