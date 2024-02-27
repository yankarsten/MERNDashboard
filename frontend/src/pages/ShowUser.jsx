import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";

const ShowUser = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://localhost:5555/users/${id}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [])
        return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3x1 my-4">Mostrar Usuário</h1>
            {loading ? (
                <Spinner />
            ): (
                <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p4">
                    <div className="my-4">
                        <span className="text-x1 mr-4 text-gray-500">Id</span> 
                        <span>{user._id}</span>   
                    </div>
                    <div className="my-4">
                        <span className="text-x1 mr-4 text-gray-500">Imagem</span> 
                        <span>{user._imagem}</span>   
                    </div>
                    <div className="my-4">
                        <span className="text-x1 mr-4 text-gray-500">Nome</span> 
                        <span>{user._nome}</span>   
                    </div>   
                    <div className="my-4">
                        <span className="text-x1 mr-4 text-gray-500">CPF</span> 
                        <span>{user._cpf}</span>   
                    </div>       
                    <div className="my-4">
                        <span className="text-x1 mr-4 text-gray-500">Telefone</span> 
                        <span>{user._telefone}</span>   
                    </div>  
                    <div className="my-4">
                        <span className="text-x1 mr-4 text-gray-500">Data de Nascimento</span> 
                        <span>{user._nascimento}</span>   
                    </div>    
                </div>
            )}
            ShowUser</div>
    )
}

export default ShowUser