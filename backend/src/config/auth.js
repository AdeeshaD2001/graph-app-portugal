require("dotenv/config");   // usa o pacote dotenv para gerar a configuração da chave secreta

export default{
    secret: process.env.APP_SECRET, // lê a chave secreta do arquivo .env
    expiresIn: "7d" // determina o tempo em que a chave expira.
}