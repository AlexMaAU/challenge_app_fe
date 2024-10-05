import Challenge from "../interfaces/Challenge";
import ChallengeItem from "./ChallengeItem";

interface ChallengeListProps {
  challenges: Challenge[];
}

export default function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <div>
      {challenges.map((list) => {
        return <ChallengeItem key={list.id} list={list} />;
      })}
    </div>
  );
}

