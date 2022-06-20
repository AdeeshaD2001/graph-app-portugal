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
                else if(user.subscriptionType == "level_two" || "level_three" ||"level_four" ||"level_five" ||"premium_level"){ //Checking if the user's subscription is any thing other than Basic Level
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
    async update(req,res){ // updating the user based upon the subscription status
        try{
            const { user_id } = req.params; // Extracting user_id from the url
            const {subscriptionType, chosenChains} = req.body; // Assigning user subscriptionType and chosenChains details
            const isSubscribed = true; //Assigning user subscription status
            var subscriptionDuration = '';
            if(subscriptionType == 'basic_level'|| 'level_two'|| 'level_four'){ //Setting the subscription End Date by an increment of a month
                let today = new Date(Date.now());
                var subscriptionDate = new Date(today.setMonth(today.getMonth()+1));
                subscriptionDuration = subscriptionDate.toLocaleDateString();
            }
            if(subscriptionType == 'level_three'|| 'level_five'|| 'premium_level'){ //Setting the subscription End Date by an increment of a year
                let today = new Date(Date.now());
                var subscriptionDate = new Date(today.setFullYear(today.getFullYear()+1));
                subscriptionDuration = subscriptionDate.toLocaleDateString();
            }
            const user = await User.findById(user_id); // Finding the user with user_id
            if (!user){ // Handling the error if the user doesn't exist
                return res.status(404).json();
            }
            const nuser = await user.updateOne({isSubscribed, subscriptionType, subscriptionDuration, chosenChains}); // Updating all the user subscription details
            User.findById(user._id)
            .populate('chosenChains')
            .then((muser) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(muser); 
            }) 
            
        }catch(err){// Handling possible internal errors
            console.error(err);
            return res.status(500).json({ error: 'Internal server error.' });
        }    
    }
}

export default new AccessController(); // exports as a new instance of the class AccessControl
