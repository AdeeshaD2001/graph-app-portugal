// controllers contain CRUDs(REST) ​​for each piece of the app.
// here or controller to manage the Access Levels. (in development)
import User from "../models/User";
import Graph from "../models/Graph";

class AccessController {
  // define the class that will control the Access

  async index(req, res) {
    // async method
    try {
      User.findById(req.params.user_id) //Finding the User document
        .populate("chosenChains") //relating Graph collection and User collection
        .then((user) => {
          if (!user) {
            //making sure user exist in the database and if not send and error
            return res
              .status(500)
              .json({
                error: "User does not exist. Please enter a valid user",
              });
          }
          if (!user.isSubscribed) {
            //making sure user is subscribed and if not send and error
            return res.status(500).json({ error: "User is not subscribed" });
          }
          if (user.subscriptionType == "basic_level") {
            //Checking if the user's subscription is Basic Level
            if (user.visitorId) {
              //Checking if the maximum view count is exceeded and if not send and error
              user
                .updateOne({
                  isSubscribed: false,
                  subscriptionType: null,
                  subscriptionDuration: null,
                  chosenChains: null,
                  visitorId: null,
                })
                .then((nuser) => {
                  return res
                    .status(200)
                    .json({
                      nuser: nuser,
                    });
                });
            } else {
              var bestloja = user.chosenChains[0].lojas[0]; //Assigning any sort of store as the best lojas for logic initiation purpose
              user.chosenChains[0].lojas.map((loja) => {
                //Mapping through the stores
                if (loja.consumo > bestloja.consumo) {
                  //Selecting the best store of the chain based on consumo
                  bestloja = loja;
                }
              });
              user.chosenChains[0].lojas = bestloja; //Then making sure that only the best store is available under the selected chain
              console.log(user.chosenChains[0]);

              let resdata = {
                subscriptionType: user.subscriptionType,
                chosenChains: user.chosenChains,
              };
              return res.status(200).json(resdata); //sending the chosenChain with only the best store for the front-end as the response
            }
          } else if (
            user.subscriptionType == "level_two" ||
            "level_three" ||
            "level_four" ||
            "level_five" ||
            "premium_level"
          ) {
            //Checking if the user's subscription is any thing other than Basic Level

            if (req.query.name) {
              const searchQuery = { cadeia_nome: req.query.name };
              
              // Graph.find(searchQuery).then((graphs) => {
              //   let resdata = {
              //     subscriptionType: user.subscriptionType,
              //     chosenChains: graphs,
              //   };
              //   return res.status(200).json(resdata); //sending the chosenChain with all the stores available for that chain for the front-end as the response
              // });

              user.chosenChains.forEach((chain)=>{
                if(chain.cadeia_nome == req.query.name){
                  let chainarr = [];
                  chainarr.push(chain);  
                  let resdata = {
                  subscriptionType: user.subscriptionType,
                  chosenChains: chainarr,
                };
                return res.status(200).json(resdata);
                }
              })
              
            } else {
              let resdata = {
                subscriptionType: user.subscriptionType,
                chosenChains: user.chosenChains,
              };
              return res.status(200).json(resdata); //sending the chosenChain with all the stores available for that chain for the front-end as the response
            }
          } else {
            return res.status(500).json({ error: "Internal server error." }); //Handing internal errors if there is any
          }
        });
    } catch (err) {
      //Handing internal errors if there is any
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async update(req, res) {
    // updating the user based upon the subscription status
    try {
      const { user_id } = req.params; // Extracting user_id from the url
      const { subscriptionType, chosenChains } = req.body; // Assigning user subscriptionType and chosenChains details
      const isSubscribed = true; //Assigning user subscription statu

      let subscriptionDuration = null;
      let today = new Date(Date.now());
      if (subscriptionType == "basic_level" || "level_two" || "level_four") {
        //Setting the subscription End Date by an increment of a month

        subscriptionDuration = new Date(today.setMonth(today.getMonth() + 1));
      } else if (
        subscriptionType == "level_three" ||
        "level_five" ||
        "premium_level"
      ) {
        //Setting the subscription End Date by an increment of a year
        subscriptionDuration = new Date(
          today.setFullYear(today.getFullYear() + 1)
        );
      }
      const user = await User.findById(user_id); // Finding the user with user_id
      if (!user) {
        // Handling the error if the user doesn't exist
        return res.status(404).json({ error: "User not found" });
      }
      const nuser = await user.updateOne({
        isSubscribed,
        subscriptionType,
        subscriptionDuration,
        chosenChains,
      }); // Updating all the user subscription details
      User.findById(user._id)
        .populate("chosenChains")
        .then((muser) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(muser);
        });
    } catch (err) {
      // Handling possible internal errors
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async updateVisitorId(req, res) {
    //
    try {
      const { user_id } = req.params; // Extracting user_id from the url
      const { visitorId } = req.body;
      const user = await User.findByIdAndUpdate(
        user_id,
        { visitorId: visitorId },
        { new: true }
      ); // Finding

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new AccessController(); // exports as a new instance of the class AccessControl
