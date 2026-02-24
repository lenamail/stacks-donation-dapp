import React, { useState } from 'react';
import { connectWallet } from './connect';
import { sendDonation } from './contract';

function App() {
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(""); // NEW: status message
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    if (amount <= 0) {
      setStatus("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Sending donation...");
      const result = await sendDonation(amount); // assumes sendDonation returns a promise
      if (result.success) {
        setStatus("✅ Donation successful!");
      } else {
        setStatus("❌ Donation failed: " + result.error);
      }
    } catch (err) {
      setStatus("❌ Transaction error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Stacks Donation DApp</h1>
      <button onClick={connectWallet} style={{ margin: "5px" }}>Connect Wallet</button>

      <div style={{ marginTop: "10px" }}>
        <input 
          type="number" 
          placeholder="Amount" 
          onChange={e => setAmount(Number(e.target.value))} 
          disabled={loading}
        />
        <button onClick={handleDonate} disabled={loading}>
          {loading ? "Processing..." : "Donate"}
        </button>
      </div>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>} {/* NEW: Status display */}
    </div>
  );
}

export default App;
