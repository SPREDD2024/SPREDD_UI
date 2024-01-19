import React from "react";
import "./styles.css";
const HistoryCard = () => {
  return (
    <>
      <div className="game-card history-card">
        <div className="game-flex">
          <div className="teams-flex">
            <div className="flex">
              <img src="images/crown.png" alt="crown icon" className="crown" />
              <div>Lakers</div>
            </div>
            <img
              src="images/placeholder.png"
              alt="preferred team icon"
              className="team-icon preferred"
            />
            <div>
              <div className="vs">vs</div>
              <div className="relative">
                <div className="probability">80%</div>
                <svg
                  className="triangle"
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.29409 6.92715C0.46036 6.5902 0.460359 5.4098 1.29409 5.07285L12.6253 0.493402C13.2826 0.227743 14 0.711558 14 1.42055L14 10.5795C14 11.2884 13.2826 11.7723 12.6253 11.5066L1.29409 6.92715Z"
                    fill="#FE6800"
                  />
                </svg>
              </div>
            </div>
            <img
              src="images/placeholder.png"
              alt="preffered team icon"
              className="team-icon"
            />
            <div>Celtics</div>
          </div>
          <div className="vertical-line"> </div>
          <div className="prediction-flex">
            <div className="just-flex">
              <div className="prediction-text">Results:</div>
              <div className="prediction">Lakers</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryCard;
