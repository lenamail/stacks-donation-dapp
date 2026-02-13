import React, { useState } from 'react';
import { connectWallet } from './connect';
import { sendDonation } from './contract';

function App() {
  const [amount, setAmount] = useState(0);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Stacks Donation DApp</h1>
      <button onClick={connectWallet} style={{ margin: "5px" }}>Connect Wallet</button>
      <div style={{ marginTop: "10px" }}>
        <input type="number" placeholder="Amount" onChange={e => setAmount(Number(e.target.value))} />
        <button onClick={() => sendDonation(amount)}>Donate</button>
      </div>
    </div>
  );
}

export default App;
