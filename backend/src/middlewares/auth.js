// middlewares definem sistema de authenticação por tokens
// o funcionamento de quais rotas pode sem acessadas por quem.

import jwt from "jsonwebtoken"; // pacote para criação de tokens
import authConfig from "../config/auth"; // configurações de autenticação
import { promisify } from "util"; // pacote para verificar autencticidade de tokens

export default async (req,res,next) =>{ // função que busca o token do frontend
    const authHeader = req.headers.authorization; // armazena as informaçõe do header do frontend que é passado nos headers do protocolo http
    if (!authHeader) { // em caso de não haver mostra o erro abaixo
        return res.status(401).json({ error: 'Token was not provide.'});
    }

    const [, token] = authHeader.split(' '); // faz o split dos dados do header para obter token

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret); //faz a verificação do token utilizando a chave secreta do aquivo .env e armazena as informações de usuario
        req.userId = decoded.id; // armazena o id de usiario vindo do token
        return next(); 
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token.'});
    }
       
}