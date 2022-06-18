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
                    return res.status(500).json({ error: 'User does not exist. Please enter a valid user' }); 
                }
                if(!user.isSubscribed){ //making sure user is subscribed and if not send and error
                    return res.status(500).json({ error: 'User is not subscribed' });
                }
                if(user.subscriptionType == "basic_level"){ //Checking if the user's subscription is Basic Level
                    if(user.visitorId){ //Checking if the maximum view count is exceeded and if not send and error
                        return res.status(500).json({ error: 'Max view count is reached. Subscribe again to get the access' });
                    }
                    var bestloja = user.chosenChains[0].lojas[0]; //Assigning any sort of store as the best lojas for logic initiation purpose
                    user.chosenChains[0].lojas.map((loja)=>{  //Mapping through the stores
                        if(loja.consumo > bestloja.consumo){  //Selecting the best store of the chain based on consumo
                            bestloja = loja;
                        }
                    })
                    user.chosenChains[0].lojas = bestloja; //Then making sure that only the best store is available under the selected chain
                    console.log(user.chosenChains[0])
                    return res.status(200).json(user.chosenChains); //sending the chosenChain with only the best store for the front-end as the response
                }
                if(user.subscriptionType == "level_two" || "level_three" ||"level_four" ||"level_five" ||"premium_level"){ //Checking if the user's subscription is any thing other than Basic Level
                    return res.status(200).json(user.chosenChains); //sending the chosenChain with all the stores available for that chain for the front-end as the response
                }
                else{
                    return res.status(500).json({ error: 'Internal server error.' }); //Handing internal errors if there is any
                }
            });
        }catch(err){ //Handing internal errors if there is any
            console.error(err); 
            return res.status(500).json({ error: 'Internal server error.' });
        }    
    }
}

export default new AccessController(); // exports as a new instance of the class AccessControl
