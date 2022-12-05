import fetch from "node-fetch";
// import ethers from 'ethers';
import dotenv from "dotenv";
import telegramBot from "node-telegram-bot-api";
dotenv.config();

const bot = new telegramBot(process.env.TELEGRAM_KEY, { polling: true });

async function convertToUSD(etherValue) {
  console.log("entered ether value: " + etherValue);
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${process.env.MINAPI_KEY}`
  );
  const data = await response.json();
  const usd = etherValue * data.USD;
  console.log("This USD: " + usd);
  return usd;
}

async function getWalletEtherValue(walletAddress) {
  const API_KEY = process.env.ETHERSCAN_API_KEY;
  console.log(API_KEY);
  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&apiToken=${API_KEY}`
  );
  const data = await response.json();
  const ether = ((await data.result) / 1000000000000000000).toFixed(2);
  console.log("This ether: " + ether);
  return ether;
}

async function getEtherValue() {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${process.env.MINAPI_KEY}`
  );
  const data = await response.json();
  const usd = data.USD;
  console.log("This USD: " + usd);
  return usd;
}

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
        `*Address*: ${address}\n*Ethers*: ${etherValue}\n*Wallet value in USD*: ${usdValue} ---
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
