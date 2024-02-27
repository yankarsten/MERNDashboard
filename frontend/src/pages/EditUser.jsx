import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditUser = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/users/${id}`)
    .then((response) => {
        setNome(response.data.nome);
        setCpf(response.data.cpf)
        setTelefone(response.data.telefone)
        setNascimento(response.data.nascimento)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('Um erro ocorreu');
        console.log(error);
      });
  }, [])
  
  const handleEditUser = () => {
    const data = {
      nome,
      cpf,
      telefone,
      nascimento,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/users/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Usuário atualizado com sucesso', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Editar Usuário</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Nome</label>
          <input
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>CPF</label>
          <input
            type='text'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Telefone</label>
          <input
            type='text'
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Data de Nascimento</label>
          <input
            type='text'
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditUser}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditUser