import 'dotenv/config'; //  importa a biblioteca dotenv para gerar a URI (URL) que vai ser usado no mongodb
export default {
    url: process.env.MONGODB_URI, // lê a url do .env (MONGODB_URI) conexão com o banco de dados do mongodb
}