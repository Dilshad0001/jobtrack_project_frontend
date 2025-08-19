import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import UserChat from "./UserChat";

function NumberInput() {
    
  const [number, setNumber] = useState(null);
  const navigate = useNavigate(); // ✅ Fix typo

  const handleChange = (e) => {
    const value = e.target.value;
    setNumber(value === "" ? null : parseInt(value));
  };

  const startChat = () => {
    if (number !== null) {
      navigate(`/chat`); // ✅ navigate with number in URL
    }
  };

  return (
    <div>
      <label>Enter a number:</label>
      <input
        type="number"
        value={number === null ? "" : number}
        onChange={handleChange}
        placeholder="Type a number"
      />
      <p>You entered: {number}</p>
      <button onClick={startChat}>Start</button>

         {number && <UserChat receiverId={number}/>}

    </div>
  );
}

export default NumberInput;
