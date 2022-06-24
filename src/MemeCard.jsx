import { useNavigate } from "react-router-dom";
import "./styles/MemeCard.css";

export default function MemeCard({ i }) {
  const navigate = useNavigate();
  return (
    <div className="memecard">
      <img src={i.url} alt="" />
      <button onClick={() => navigate("/generator", { state: { item: i } })}>
        Use this template
      </button>
    </div>
  );
}
