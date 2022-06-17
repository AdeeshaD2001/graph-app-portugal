// controle de sessão com token para autenticação.

import jwt from "jsonwebtoken"; //pacote para usar os tokens
import User from "../models/User"; // Modelo de usuario do banco de dados.
import { checkPasswor } from "../services/auth"; //função para autenticar o password
import authConfig from "../config/auth"; // contem as informções para de autenticação para gerar token.

class SessionController { // inicia a classe de controle de sessão
    async create(req,res){ // método para criar e autenticar token
        const {email, password} = req.body; // obtem o email e password do frontend
        const user =  await User.findOne({ email}).select('+password') // encontra o usuario no banco de dados usando o email
        if (!user) { // caso não encontre o usuario retorna o erro
            return res.status(404).json({ error: "User/password invalid." })
        }
        if (!checkPasswor(user,password)){ // faz a chechagem de autenticidade do password usando o bcrypt caso não seja valido retorna o erro
            return res.status(404).json({ error: "User/password invalid." })
        }
        const { id } = user; // armazena o id do usuario
        return res.json({ //retorna o json com informações do usuario e token
            user:{
                id,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, { //cria o token autenticando com a chave unica do servidor.
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}
export default new SessionController(); // exporta a classe como instancia.