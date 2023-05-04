import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/CharacterDetails.css";

const CharacterDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="card-container">
      <div className="title-container">
        <h2>{state.character.id}</h2>
        <h2>{state.character.name}</h2>
      </div>
      <img src={state.character.image} alt={`${state.character.name}`} />
      <div className="info-container">
        <h4>Status: {state.character.status}</h4>
        <h4>Species: {state.character.species}</h4>
      </div>
      <button
        onClick={() =>
          navigate("/", {
            state: state.page,
          })
        }
      >
        Back
      </button>
    </div>
  );
};

export default CharacterDetails;
