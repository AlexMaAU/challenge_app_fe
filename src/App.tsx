import { useEffect, useState } from "react";
import ChallengeList from "./components/ChallengeList";
import axios from "axios";
import AddChallenge from "./components/AddChallenge";
import Challenge from "./interfaces/Challenge";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/challenges");
      setChallenges(response.data.challengeDTOList);
    } catch (error) {
      console.error("Error fetching challenges: ", error);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Monthly Challenges</h1>
      <AddChallenge fetchChallenges={fetchChallenges} />
      <ChallengeList challenges={challenges} setChallenges={setChallenges} />
    </div>
  );
}

export default App;

