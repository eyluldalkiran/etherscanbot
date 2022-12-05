import fetch from "node-fetch";
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

  export{convertToUSD,getEtherValue,getWalletEtherValue}