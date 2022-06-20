//modelo (schema) de como sera armazenado os dados dos usuarios no banco de dados. (em desenvolvimento)
import mongoose from "mongoose";
import { date, string } from "yup";
import Graph from "./Graph";

const userSchema = new mongoose.Schema(
    {
        email: { // sera armazenado email e senha
            type:String,// tipo do email sera uma string
            required: true,// sera necessario para cadastro
            index:{
                unique: true,// sera unico não pode ter repetidos.
            }
        },
        password: { // passowrd para o usuario
            type:String, // é uma string
            required: true,// é requerida
            select:false
        },
        name: { // nome do usuario
            type:String, // é uma string
            required: true,// é requerida
        },
        tel: { // telefone do usuario
            type:String, // é uma string
            required: true,// é requerida
        },
        isSubscribed: { // Subscription status
            type:Boolean,
            default:false // When user signup isSubscribed is false
        },
        subscriptionType: { //Type of the subscription(Ex:basic_level,level_2....)
            type:String,
            default:'Free'  // When user signup subscriptionType is Free.
        }, 
        subscriptionDuration:{ //End date of the subscription
            type:Date,
            default:null 
        },
        chosenChains:[{  //This array object populated from the Graphs Collection
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Graph',
            default:null
        }],
        visitorId:{  //This is used to finite the number of views for basic_level subscibers
            type:String,
            default:null
        }                             
    },
    {
        timestamps: true // informações sobre data e hora de criação do usuario.
    }
);

export default mongoose.model('User', userSchema); // exporta o modelo na variavel User
