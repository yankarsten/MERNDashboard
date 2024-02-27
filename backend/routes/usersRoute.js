import express from 'express';
import {User} from '../models/userModel.js';

const router = express.Router();


//Rota para obter todos os usuários
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});

        return response.status(200).json({
            count: users.length,
            data: users
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message
        });
    }
});

//Rota para obter usuário por id
router.get('/:id', async (request, response) => {
    try {

        const {
            id
        } = request.params;
        const user = await User.findById(id);
        return response.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message
        });
    }
});

//Rota para adicionar um usuário
router.post('/', async (request, response) => {
    try {

        const newUser = {
            imagem: request.body.imagem,
            nome: request.body.nome,
            cpf: request.body.cpf,
            telefone: request.body.telefone,
            nascimento: request.body.nascimento,
        };

        const user = await User.create(newUser);

        return response.status(201).send(user);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message
        });
    }
});

//Rota para editar um usuário
router.put('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await User.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      return response.status(200).send({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

//Rota para deletar um usuário
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
    
        const result = await User.findByIdAndDelete(id);
    
        if (!result) {
          return response.status(404).json({ message: 'Usuário não encontrado' });
        }
    
        return response.status(200).send({ message: 'Usuário deletado com sucesso' });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
    });

export default router;