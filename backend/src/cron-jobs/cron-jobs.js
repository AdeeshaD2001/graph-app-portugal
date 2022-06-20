import cron from 'node-cron';
import User from "../models/User";

const cronTest = function () {
    
    cron.schedule('* * * * * *', function() {
        console.log('Running a task every second');
    });
}


const subscriptionAutomation = function () {
    
    cron.schedule('0 0 * * *', function() {
        console.log('Running a task every day  00:00AM');
        
    });
}

export default subscriptionAutomation;