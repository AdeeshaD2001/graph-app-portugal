import Transactions from "../models/Transactions";
import TrasactionService from "../services/TransactionService";
class PostbackController{
    async pagarme (req,res){
        const {id, object, current_status} = req.body;
        try {
            if (object ==='transaction'){
                const transaction = await Transactions.findOne({transactionId: id});
                if(!transaction){
                    return res.status(404).json();
                }
                const service = new TrasactionService();
                await service.updateStatus({
                    code: transaction.code,
                    providerStatus: current_status,
                });
                return res.status(200).json();
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({error:"Internal server error."});
        }
    }
}

export default new PostbackController();