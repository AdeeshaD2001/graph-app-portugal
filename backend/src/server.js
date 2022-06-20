import "dotenv/config";
import app from "./app";
import subscriptionAutomation from "./cron-jobs/cron-jobs";

app.listen(process.env.PORT);
subscriptionAutomation();