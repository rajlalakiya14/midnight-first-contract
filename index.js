const express = require("express");
const app = express();

// home route
app.get("/", (req, res) => {
  res.send("Web3 Wallet Checker API is running 🚀");
});

// wallet checker route
app.get("/wallet", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.json({
      status: "error",
      message: "Wallet address required"
    });
  }

  // fake response (upgrade karenge next step me)
  res.json({
    status: "success",
    wallet: address,
    balance: "0.00 ETH",
    message: "Demo response (real data coming next)"
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});