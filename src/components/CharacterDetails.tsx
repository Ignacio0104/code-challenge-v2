import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/CharacterDetails.css";

const CharacterDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  return (
    <div className="card-container">
      <div className="title-container">
        <h2>{state.id}</h2>
        <h2>{state.name}</h2>
      </div>
      <img src={state.image} />
      <div className="info-container">
        <h4>Status: {state.status}</h4>
        <h4>Species: {state.species}</h4>
      </div>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default CharacterDetails;
