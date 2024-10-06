import axios from "axios";
import Challenge from "../interfaces/Challenge";
import { Dispatch, SetStateAction } from "react";

interface ChallengeProps {
  list: Challenge;
  challenges: Challenge[];
  setChallenges: Dispatch<SetStateAction<Challenge[]>>;
}

export default function ChallengeItem({
  list,
  challenges,
  setChallenges,
}: ChallengeProps) {
  async function handleDelete(id: number) {
    await axios.delete(`http://localhost:8080/api/challenges/${id}`);
    const updatedChallenges = challenges.filter((item) => item.id !== list.id);
    setChallenges(updatedChallenges);
  }

  async function handleGetByMonth(month: string) {
    const response = await axios.get(
      `http://localhost:8080/api/challenges/${month}`
    );
    setChallenges(response.data.challengeDTOList);
  }

  return (
    <a
      href="#"
      className="list-group-item list-group-item-action"
      aria-current="true"
      onClick={() => handleGetByMonth(list.monthName)}
    >
      <div className="d-flex w-100 justify-content-between align-items-center">
        <h5 className="mb-1">{list.monthName}</h5>
        <button
          className="btn btn-danger"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(list.id as number);
          }}
        >
          X
        </button>
      </div>
      <p className="mb-1">{list.description}</p>
    </a>
  );
}

