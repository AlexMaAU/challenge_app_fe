import Challenge from "../interfaces/Challenge";

interface ChallengeProps {
  list: Challenge;
}

export default function ChallengeItem({ list }: ChallengeProps) {
  return (
    <div>
      <h5>{list.monthName}</h5>
      <p>{list.description}</p>
    </div>
  );
}

