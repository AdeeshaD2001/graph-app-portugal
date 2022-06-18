// controllers contain CRUDs(REST) ​​for each piece of the app.
// here or controller to manage the Access Levels. (in development)
import User from "../models/User";

class AccessController{ // define the class that will control the Access
    async index(req,res){ // async method
        try{
            User.findById(req.params.user_id) //Finding the User document
            .populate('chosenChains') //relating Graph collection and User collection
            .then((user)=>{
                if(!user){ //making sure user exist in the database and if not send and error
                    return res.status(500).json({ error: 'User does not exist' }); 
                }
                if(!user.isSubscribed){
                    return res.status(500).json({ error: 'User is not subscribed' });
                }
                if(user.subscriptionType == "basic_level"){
                    if(user.visitorId){
                        return res.status(500).json({ error: 'Max view count is reached. Subscribe again to get the access' });
                    }
                    var bestloja = user.chosenChains[0].lojas[0];
                    user.chosenChains[0].lojas.map((loja)=>{
                        if(loja.consumo > bestloja.consumo){
                            bestloja = loja;
                        }
                    })
                    user.chosenChains[0].lojas = bestloja;
                    console.log(user.chosenChains[0])
                    return res.status(200).json(user.chosenChains);
                }
                if(user.subscriptionType == "level_two" || "level_three" ||"level_four" ||"level_five" ||"premium_level"){
                    return res.status(200).json(user.chosenChains);
                }
                else{
                    return res.status(500).json({ error: 'Internal server error.' });
                }
            });
        }catch(err){ 
            console.error(err); 
            return res.status(500).json({ error: 'Internal server error.' });
        }    
    }
}

export default new AccessController(); // exports as a new instance of the class AccessControl
