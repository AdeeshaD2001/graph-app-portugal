//modelo (schema) de como sera armazenado os dados dos graficos no banco de dados. (em desenvolvimento)
import mongoose from "mongoose"; // importa a biblioteca mongoose para utilizar o banco de dados mongodb

const GraphSchema = new mongoose.Schema( // instancia GraphSchema na classe Schema do mongoose
    {

        cadeia_nome: {
            type: String,
            required: true
        },  

        cadeia_id: {
            type: String,
            required: true,
        },

        lojas: [{
            codcarga: { // cadeia de lojas
                type:Number, // recebe uma string
                required: true, // é requerida para se inserida
                index:{ // é unica na lista (não pode haver cadeias repeticas com o mesmo nome)
                    unique: true,
                }
            },
            consumo: {// dados para plotar graficos
                type:Number, // são do tipo string
                required: true,// são necessarios para poder fazer a plotagem fo grafico
            },
            endereco: {
                type:String,
                required: true,
            }       
        }]
         
    },
    {
        timestamps: true // informações sobre data e hora de criação do usuario.
    }
);

export default mongoose.model('Graph', GraphSchema); // exporta o modelo do esquema na variavel Graph.