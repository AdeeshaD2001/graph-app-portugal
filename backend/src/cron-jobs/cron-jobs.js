import cron from 'node-cron';
import User from "../models/User";

const cronTest = function () {
    
    cron.schedule('* * * * * *', function() { // node-cron test function.
        console.log('Running a task every second');
    });
}

const validateSubscription = async function(){ // utility funtion to validate a subscriptionDuration
    try{
        let users = await  User.find({isSubscribed: true});// fetch all the users in the database with active subscriptions.
        users.forEach(async function(user) {// iterate over all the subscribed users to verify the validity.
            console.log(Date.now() - user.subscriptionDuration.getTime());
            if (Date.now() - user.subscriptionDuration.getTime() > 0) {// check whether the user subscription is expired by checking the unix timestamps of the subscription end date and the current time.
                console.log(`${user.name} subscription expired.`);
                const nuser = await User.findByIdAndUpdate(user._id, {isSubscribed: false, subscriptionType:null, subscriptionDuration: null, chosenChains:null, visitorId:null}, {new: true});
                //update the user in the database with the expired subscription state field values
                console.log(nuser);
            }
        });
    }catch(err){

    }
}

const subscriptionAutomation = function () {
    
    // node-cron schedule function that is initiated when the server first goes live
    //Will trigger the validation function everyday at 00:00AM.
    cron.schedule('0 0 * * *', function() {
        console.log('Running a task at 00:00 AM every day.');
        validateSubscription();
    });
}

export default subscriptionAutomation;