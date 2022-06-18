// controllers contém as CRUDs(REST) para cada pedaço do app.
// aqui o controller para gerenciar os usuarios. 
import User from "../models/User"; // importa o modelo que o json vai ter, para armazenar no banco de dados.
import {  createPassorwdHash  } from '../services/auth'; // importa a função para criptografar o password do usuario

class UserController{ // define a classe controladora dos usuarios.

    async index(req,res){ // // método async de listagem dos elementos dentro do controlador (req, res são construções da biblioteca express)
        try{
            const users = await User.find(); // localiza todos os usuarios no banco de dados
            return res.json(users); // retorna a lista de usuarios
        }catch(err){ // em caso de erros retorna a mensagem.
            console.error(err);
            return res.status(500).json({ error: 'Internal server error.' });
        }    
    }
    async show(req,res){ //método para mostrar informações de usuario
        try{
            const { id } = req.params; // coleta o id do usuario do frontend
            const user = await User.findById(id); // encontra o usuario no banco
            if (!user){// caso não encontre, msg não existe
                return res.status(404).json();
            }
            return res.json(user); // retorna o usuario encontrado.
        }catch(err){ // caso erro na operação.
            console.error(err); 
            return res.status(500).json({ error: 'Internal server error.' });
        }    
        
    }
    async create(req,res){ // médoto de criar um novo usuario
        try{
            const {email, password, name, tel} = req.body; // email e senha passados do frontend
            const user = await User.findOne({email}); // busca se o email já está cadastrado
            if (user){// em caso de email já cadastrado no banco de dados, retonar o erro.
                return res.status(422).json({message:`User ${email} already exists.`});
            }// em caso de novo email ->
            const encryptedPassword = await createPassorwdHash(password)  // pega o password digitado pelo usuario no frontend e criptografa.
            const newUser = await User.create({ email, password: encryptedPassword, name, tel}); // cria novo usuario com nome e senha(criptografada - hash)
            return res.status(201).json(newUser); // retorna confirmação de exito com os dados de novo usuario em formato json para o banco de dados.
        }catch(err){  // caso não sejá possivel retorna o  erro!
            console.error(err);
            return res.status(500).json({ error: 'Internal server error.' });
        }    
        
    }
    async update(req,res){ // método para atualizar dados de usuario
        try{
            const { id } = req.params; // pega os paramentros (id) de ususario do frontend
            const {email, password} = req.body; // pega os novos email e senha do frontend
            const user = await User.findById(id); // encontra o usuario a ser alterado pelo id
            if (!user){ // caso não encontre retorna o erro 404 não existe
                return res.status(404).json();
            }
            const encryptedPassword = await createPassorwdHash(password) // encripta o novo password que o usuario selecionou
            await user.updateOne({email, password: encryptedPassword}); // atualiza os dados do usuario (email e password) no banco de dados
            return res.status(200).json(); // retorna o estatus de exito.
            
        }catch(err){// em caso de erro retorna a msg.
            console.error(err);
            return res.status(500).json({ error: 'Internal server error.' });
        }    
    }
    async delete(req,res){ // método para deletar um usuario
        try{
            const { id } = req.params; // carrega dados de usuario passados do frontend
            const user = await User.findById(id); // localiza o usuario no banco de dados
            if (!user){ // caso não localize retorna 404 não existe
                return res.status(404).json();
            }
            
            await user.deleteOne(); // caso exista, deleta o usuario do banco.
            return res.status(200).json(); // retorna mensagem de exito.
            
        }catch(err){// em caso de erro retorna a msg.
            console.error(err);
            return res.status(500).json({ error: 'Internal server error.' });
        }    
        
    }
}

export default new UserController(); // exporta a classe como instancia dela.