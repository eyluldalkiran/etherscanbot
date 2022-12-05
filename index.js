import fetch from "node-fetch";
// import ethers from 'ethers';
import dotenv from "dotenv";
import telegramBot from "node-telegram-bot-api";
import { convertToUSD } from "./functions.js";
import { getEtherValue } from "./functions.js";
import { getWalletEtherValue } from "./functions.js";
dotenv.config();

const bot = new telegramBot(process.env.TELEGRAM_KEY, { polling: true });

const adresses = ["0x2e7212016ba40a1ee366f3a54c5ad6b4916eae74"];

bot.on("message", async (message) => {
  console.log("Message received: " + message.text);
  if (message.text?.startsWith("!value")) {
    /*  const array = message.text.split(" ");
    const walletAddress = array[1]; */
    const etherValue = await getWalletEtherValue(adresses);
    console.log("in ether: " + etherValue);
    const usdValue = await convertToUSD(etherValue);
    adresses.map((address) => {
      bot.sendMessage(
        message.chat.id,
        `*Ethers*: ${etherValue}\n*Wallet value in USD*: ${usdValue} ---
         `,
        {
          parse_mode: "Markdown",
        }
      );
    });
  }
  if (message.text === "!ether") {
    bot.sendMessage(
      message.chat.id,
      `*Ether value in USD*: ` + (await getEtherValue()),
      {
        parse_mode: "Markdown",
      }
    );
  }
});
