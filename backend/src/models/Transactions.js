import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        cartCode:{ //código do carrinho
            type:String,
            required: true,
            unique: true,
        },
        code:{ //código da transação
            type:String,
            required: true,
            unique: true,
        },
        status:{ //status da transação
            type:String,
            enum:["started", "processing", "pending", "approved", "refused", "refunded", "chargeback", "error",], 
            required: true,
        },
        paymentType:{ //formas de pagamento
            type:String,
            enum:["billet", "credit_card"], 
            required: true,
        },
        installments: {// parcelas
            type: Number,
        },
        total:{
            type:Number,
        },
        transactionId:{
            type: String,
        },
        processorResponse:{
            type:String,
        },
        customerEmail:{
            type:String,
        },
        customerName:{
            type:String,
        },
        customerMobile:{
            type:String,
        },
        customerDocument:{
            type:String,
        },
        billingAddress:{
            type:String,
        },
        billingNumber:{
            type:String,
        },
        billingNeighborhood:{
            type:String,
        },
        billingCity:{
            type:String,
        },
        billingState:{
            type:String,
        },
        billingZipCode:{
            type:String,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Transactions", schema);

// Requisição <-> '/trasactions' <-> Controller.create <-> Service <-> API / Gateway