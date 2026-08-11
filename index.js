require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();

const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
  res.send("Web3 Wallet Checker API is running 🚀");
});

app.get("/wallet", async (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.json({
      status: "error",
      message: "Wallet address required"
    });
  }

  try {
    // ✅ UPDATED V2 API (important fix)
    const response = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`
    );

    console.log("API Response:", response.data);

    // ❌ API error handle
    if (response.data.status !== "1") {
      return res.json({
        status: "error",
        message: response.data.message,
        full: response.data
      });
    }

    const balanceWei = response.data.result;

    // ✅ Safe conversion
    const balanceEth = Number(balanceWei) / 1e18;

    res.json({
      status: "success",
      wallet: address,
      balance: balanceEth + " ETH"
    });

  } catch (error) {
    console.log(error.message);

    res.json({
      status: "error",
      message: "Failed to fetch balance"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});