import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
const [users, setUsers] = useState([]);
const [loading,setLoading] = useState(false);
useEffect(() => {
setLoading(true);
axios
.get('http://localhost:5555/users')
.then((response) => {
setUsers(response.data.data);
setLoading(false);
})
.catch((error) => {
console.log(error);
});
}, []);

return (
<div className="p-4">
  <div className="flex justify-between items-center">
    <h1 className="text-3x1 my-8">Lista de Usuários</h1>
    <Link to='/users/create'>
    <MdOutlineAddBox className='text-sky-800 text-4x1' />
    </Link>
  </div>
  {loading ? (
  <Spinner />
  ):(
  <table className='w-full border-separate border-spacing-2'>
    <thead>
      <tr>
        <th className='border border-slate-600 rounded-md'>Id</th>
        <th className='border border-slate-600 rounded-md'>Imagem</th>
        <th className='border border-slate-600 rounded-md'>Nome</th>
        <th className='border border-slate-600 rounded-md'>Telefone</th>
        <th className='border border-slate-600 rounded-md'>Data de Nascimento</th>
        <th className='border border-slate-600 rounded-md'>Ações</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
      <tr key={users._id} className='h-8'>
        <td className='border border-slate-700 rounded-md text-center'>
          {index + 1}
        </td>
        <td className='border border-slate-700 rounded-md text-center'>
          <img src={`data:image/jpg;base64, ${user.imagem}`} alt='Imagem' />
        </td>
        <td className='border border-slate-700 rounded-md text-center'>
          {user.nome}
        </td>
        <td className='border border-slate-700 rounded-md text-center'>
          {user.telefone}
        </td>
        <td className='border border-slate-700 rounded-md text-center'>
          {user.nascimento}
        </td>
        <td className='flex-justify-center gap-x-4'>
          <Link to={`/users/details/${user._id}`}> <BsInfoCircle className='text-2x1 text-green-800' />
          </Link>
          <Link to={`/users/edit/${user._id}`}> <AiOutlineEdit className='text-2x1 text-yellow-600' />
          </Link>
          <Link to={`/users/delete/${user._id}`}> <MdOutlineDelete className='text-2x1 text-red-600' />
          </Link>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
  )}
</div>
)
}

export default Home;