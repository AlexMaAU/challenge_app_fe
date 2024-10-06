import axios from "axios";
import { useState } from "react";

interface AddChanllengeProps {
  fetchChallenges: () => Promise<void>;
}

export default function AddChallenge({ fetchChallenges }: AddChanllengeProps) {
  const [month, setMonth] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeMonth(e: React.ChangeEvent<HTMLInputElement>) {
    setMonth(e.target.value);
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/challenges", {
        monthName: month,
        description,
      });
      fetchChallenges();
      setMonth("");
      setDescription("");
    } catch (error) {
      console.error("Error fetching challenges: ", error);
    }
  }

  return (
    <div className="card my-5">
      <div className="card-header">Add New Challenge</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="month" className="form-label">
              Month
            </label>
            <input
              type="text"
              className="form-control"
              id="month"
              placeholder="Enter a month, e.g.January"
              value={month}
              onChange={handleChangeMonth}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Describe the challenge"
              value={description}
              onChange={handleChangeDescription}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

