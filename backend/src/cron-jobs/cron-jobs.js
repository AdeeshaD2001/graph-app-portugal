import cron from 'node-cron';
import User from "../models/User";

const cronTest = function () {
    
    cron.schedule('* * * * * *', function() {
        console.log('Running a task every second');
    });
}

const validateSubscription = async function(){
    try{
        let users = await  User.find({isSubscribed: true});
        users.forEach(async function(user) {
            console.log(Date.now() - user.subscriptionDuration.getTime());
            if (Date.now() - user.subscriptionDuration.getTime() > 0) {
                console.log(`${user.name} subscription expired.`);
                const nuser = await User.findByIdAndUpdate(user._id, {isSubscribed: false, subscriptionType:null, subscriptionDuration: null, chosenChains:null, visitorId:null}, {new: true});
                console.log(nuser);
            }
        });
    }catch(err){

    }
}

const subscriptionAutomation = function () {
    
    cron.schedule('0 0 * * *', function() {
        console.log('Running a task at 00:00 AM every day.');
        validateSubscription();
    });
}

export default subscriptionAutomation;