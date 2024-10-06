import { Dispatch, SetStateAction } from "react";
import Challenge from "../interfaces/Challenge";
import ChallengeItem from "./ChallengeItem";

interface ChallengeListProps {
  challenges: Challenge[];
  setChallenges: Dispatch<SetStateAction<Challenge[]>>;
}

export default function ChallengeList({
  challenges,
  setChallenges,
}: ChallengeListProps) {
  return (
    <div className="list-group">
      {challenges.map((list) => {
        return (
          <ChallengeItem
            key={list.id}
            list={list}
            challenges={challenges}
            setChallenges={setChallenges}
          />
        );
      })}
    </div>
  );
}

