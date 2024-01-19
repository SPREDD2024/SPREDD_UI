import React from "react";
import "./styles.css";
import GameCard from "./GameCard";
import HistoryCard from "./HistoryCard";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <img
          src="images/nba-banner.png"
          alt="nba banner"
          className="nba-banner"
        />

        <div className="dashboard-card">
          <div className="card-container">
            <div className="flex">
              <div>
                <div className="card-heading">All Matches</div>
                <div className="info">
                  <div>i</div>
                  <div className="info-tip">
                    <div>
                      *Win Probability Percentages by <br />
                      Spredd's AI Prediction Engine
                    </div>
                    <svg
                      className="info-triangle"
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
              </div>
              <div>page numbers</div>
            </div>
            <div className="Gamecard-container">
              <div className="highlight">
                <GameCard />
              </div>
              <div className="highlight">
                <GameCard />
              </div>{" "}
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-container">
            <div className="flex">
              <div className="card-heading">History</div>
              <div>page numbers</div>
            </div>
            <div className="flex history">
              <HistoryCard />
              <HistoryCard />
            </div>
            <div className="flex history">
              <HistoryCard />
              <HistoryCard />
            </div>
            <div className="flex history">
              <HistoryCard />
              <HistoryCard />
            </div>
            <div className="flex history">
              <HistoryCard />
              <HistoryCard />
            </div>
            <div className="flex history">
              <HistoryCard />
              <HistoryCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
