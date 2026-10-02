// Game Provider (spribe.com)
const express = require("express");
const app = express();
app.use(express.json());

// Crash multiplier generator
function getCrashPoint() {
  let r = Math.random();
  return (1 / r).toFixed(2);
}

// Handle game round
app.post("/play", (req, res) => {
  const { token, bet } = req.body;

  // Verify token (mock)
  if (!token.startsWith("casino-token")) {
    return res.json({ success: false, message: "Invalid token" });
  }

  let crashPoint = getCrashPoint();
  let win = 0;

  if (bet.cashout && bet.cashout <= crashPoint) {
    win = bet.amount * bet.cashout;
  }

  res.json({ success: true, crashPoint, win });
});

app.listen(5000, () => {
  console.log("Game provider running at http://localhost:5000 (spribe.com)");
});
