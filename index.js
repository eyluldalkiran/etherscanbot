import fetch from "node-fetch";
// import ethers from 'ethers';
import dotenv from "dotenv";
import telegramBot from "node-telegram-bot-api";
import {
  convertToUSD,
  getEtherValue,
  getWalletEtherValue,
} from "./functions.js";
import express from "express";
const app = express();

dotenv.config();

const bot = new telegramBot(process.env.TELEGRAM_KEY, { polling: true });

const port = process.env.PORT || 8080;

const adresses = ["0x2e7212016ba40a1ee366f3a54c5ad6b4916eae74"];

bot.on("message", async (message) => {
  console.log("Message received: " + message.text);

  if (message.text?.startsWith("!value")) {
    /*  const array = message.text.split(" ");
    const walletAddress = array[1]; */

    const etherValue = await getWalletEtherValue(adresses);
    const usdValue = await convertToUSD(etherValue);
    bot.sendDocument(message.chat.id, "abc.gif");
    adresses.map((address) => {
      bot.sendMessage(
        message.chat.id,
        `*Pool prize=* ${usdValue}$
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
      `*Money in the pool=$*: ` + (await getEtherValue()),
      {
        parse_mode: "Markdown",
      }
    );
  }
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
