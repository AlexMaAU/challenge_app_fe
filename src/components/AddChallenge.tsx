import { useState } from "react";

export default function AddChallenge() {
  const [month, setMonth] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeMonth(e: React.ChangeEvent<HTMLInputElement>) {
    setMonth(e.target.value);
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  return (
    <div>
      <div>
        <label htmlFor="month">Month</label>
        <input
          type="text"
          id="month"
          value={month}
          onChange={handleChangeMonth}
        ></input>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleChangeDescription}
        ></input>
      </div>
    </div>
  );
}

