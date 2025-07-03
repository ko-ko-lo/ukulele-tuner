import "./TuningOptionButton.scss";

type Props = {
  name: string;
  notes: string[];
  isSelected: boolean;
  onClick: () => void;
};

export const TuningOptionButton: React.FC<Props> = ({
  name,
  notes,
  isSelected,
  onClick,
}) => (
  <button
    className={`tuning-option ${isSelected ? "selected" : ""}`}
    onClick={onClick}
  >
    <h3>{name}</h3>
    <p>{notes.join(" - ")}</p>
  </button>
);
