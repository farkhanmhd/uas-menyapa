import * as cron from "node-cron";
import { config } from "dotenv";

config({ path: "./.env" });

// Cron job to check and expire orders after event endTime
// 0 * * * * for every hour
const crons = () => {
  console.log("Starting cron jobs");
  // expire orders
  cron.schedule("0 * * * *", async () => {
    // Run every minute
    console.log("Running cron job to expire all orders for every minute");

    try {
      const expireOrderResponse = await fetch(
        `${process.env.BASE_URL}/api/orders/cron`,
        {
          method: "PUT",
        },
      );

      const json = await expireOrderResponse.json();
      console.log(json);
    } catch (error) {
      console.error("Error in expireOrdersCronJob:", error);
    }

    try {
      const generateCertificateRespons = await fetch(
        `${process.env.BASE_URL}/api/certificates`,
        {
          method: "POST",
        },
      );

      const json = await generateCertificateRespons.json();
      console.log(json);
    } catch (error) {
      console.error("Error in generateCertificateCronJob", error);
    }

    try {
      const absenceTicketResponse = await fetch(
        `${process.env.BASE_URL}/api/tickets`,
        {
          method: "PUT",
        },
      );

      const json = await absenceTicketResponse.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  });
};

crons();
