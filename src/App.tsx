import { useEffect, useState } from "react";
import ChallengeList from "./components/ChallengeList";
import axios from "axios";
import AddChallenge from "./components/AddChallenge";

function App() {

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const response = await axios.get("http://localhost:8080/api/challenges");
      setChallenges(response.data.challengeDTOList);
    };
    fetchChallenges();
  }, []);

  return (
    <div>
      <h1>Monthly Challenges</h1>
      <AddChallenge />
      <ChallengeList challenges={challenges} />
    </div>
  );
}

export default App;

