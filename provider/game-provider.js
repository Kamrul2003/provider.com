const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Crash multiplier generator
function getCrashPoint() {
  let r = Math.random();
  return (1 / r).toFixed(2);
}

// Handle game round
app.post("/play", (req, res) => {
  const { token, bet } = req.body;

  if (!token.startsWith("casino-token")) {
    return res.json({ success: false, message: "Invalid token" });
  }

  const crashPoint = getCrashPoint();
  let win = 0;

  if (bet.cashout && bet.cashout <= crashPoint) {
    win = bet.amount * bet.cashout;
  }

  res.json({ success: true, crashPoint, win });
});

app.listen(5000, () => console.log("Provider running at http://localhost:5000"));
