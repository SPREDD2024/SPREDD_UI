"use client";
import React, { useState } from "react";
import "./styles.css";
import { Button, Checkbox, IconButton, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DashboardMatches from "../common/constants/dashboardMatches";
import TeamColorCodes from "../common/constants/teamColorCodes";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TeamColors from "../common/TeamColors";

const Dashboard = () => {
  const gameItemsPerPage = 5;
  const historyItemsPerPage = 10;

  const [matches, setMatches] = useState(DashboardMatches);

  const [currentGamePage, setCurrentGamePage] = useState(1);

  const handleGamePageChange = (event, value) => {
    setCurrentGamePage(value);
  };

  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);

  const handleHistoryPageChange = (event, value) => {
    setCurrentHistoryPage(value);
  };

  const handleBetClick = (id) => {
    setMatches((prevMatches) => prevMatches.map((match) => (match.id === id ? { ...match, checked: !match.checked } : match)));
  };

  const getTeamColors = (team) => {
    const teamColors = TeamColorCodes.find((item) => item.name === team);
    return teamColors ? teamColors.colors : [];
  };

  const gameStartIndex = (currentGamePage - 1) * gameItemsPerPage;
  const gameEndIndex = gameStartIndex + gameItemsPerPage;
  const currentGameItems = matches.slice(gameStartIndex, gameEndIndex);

  const historyStartIndex = (currentHistoryPage - 1) * historyItemsPerPage;
  const historyEndIndex = historyStartIndex + historyItemsPerPage;
  const currentHistoryItems = matches.slice(historyStartIndex, historyEndIndex);

  return (
    <>
      <div className="dashboard-container flex-column">
        <img src="images/nba-banner.png" alt="nba banner" className="nba-banner" />
        <div className="prediction-card">
          <Stack spacing={1}>
            <div className="card-header flex">
              <Typography className="header-text">
                All Matches
                <Tooltip title="*Win Probability Percentages by Spredd's AI Prediction Engine" placement="right" arrow>
                  <IconButton>
                    <InfoIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Pagination
                count={Math.ceil(matches.length / gameItemsPerPage)}
                size="medium"
                page={currentGamePage}
                onChange={handleGamePageChange}
                color="primary"
              />
            </div>
            {currentGameItems.map((item, index) => (
              <div className="flex match-card" style={{ border: item.checked ? "1px solid #ff6700" : "0px" }}>
                <Typography className="center number">{(currentGamePage - 1) * gameItemsPerPage + index + 1}</Typography>
                <div className="flex center opponents">
                  <div className="home-team flex-row">
                    {item.homeTeam === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
                    <Typography className="center medium">{item.homeTeam}</Typography>
                    <TeamColors teamColors={getTeamColors(item.homeTeam)} />
                  </div>
                  <div className="vs flex-column">
                    <Typography className="center small">VS</Typography>
                    <div className="center percentage flex-row">
                      {item.homeTeam === item.prediction && <DoubleArrowIcon sx={{ transform: "rotate(180deg)" }} />}
                      <Typography className="center">{item.winPercentage}%</Typography>
                      {item.awayTeam === item.prediction && <DoubleArrowIcon />}
                    </div>
                  </div>
                  <div className="away-team flex-row">
                    <TeamColors teamColors={getTeamColors(item.awayTeam)} />
                    <Typography className="center">{item.awayTeam}</Typography>
                    {item.awayTeam === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
                  </div>
                </div>
                <div className="flex results">
                  <div className="divider" />
                  <Typography className="center prediction">Prediction: {item.prediction}</Typography>
                  <div className="flex-row mobile-bet-button">
                    <Typography className="center mobile-percentage">{item.winPercentage}%</Typography>
                    <Button variant={item.checked ? "contained" : "outlined"} className="bet-button center" onClick={() => handleBetClick(item.id)}>
                      <Checkbox
                        checked={item.checked}
                        icon={<CheckBoxOutlineBlankIcon color="primary" />}
                        checkedIcon={<CheckBoxIcon color="secondary" />}
                      />
                      BET
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Stack>
        </div>
        <div className="prediction-card">
          <Stack spacing={1}>
            <div className="card-header flex">
              <Typography className="header-text">History</Typography>
              <Pagination
                count={Math.ceil(matches.length / historyItemsPerPage)}
                size="medium"
                page={currentHistoryPage}
                onChange={handleHistoryPageChange}
                color="primary"
              />
            </div>
            <div className="history-div">
              {currentHistoryItems.map((item, index) => (
                <div className="flex match-card mb-5" style={{ border: item.checked ? "1px solid #ff6700" : "0px" }}>
                  <div className="flex center opponents">
                    <div className="home-team-history flex-row">
                      <Typography className="center medium">{item.homeTeam}</Typography>
                      {item.homeTeam === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
                      <TeamColors teamColors={getTeamColors(item.homeTeam)} />
                    </div>
                    <div className="vs flex-column">
                      <Typography className="center small">VS</Typography>
                      <div className="center percentage flex-row">
                        {item.homeTeam === item.prediction && <DoubleArrowIcon sx={{ transform: "rotate(180deg)" }} />}
                        <Typography className="center">{item.winPercentage}%</Typography>
                        {item.awayTeam === item.prediction && <DoubleArrowIcon />}
                      </div>
                    </div>
                    <div className="away-team-history flex-row">
                      <TeamColors teamColors={getTeamColors(item.awayTeam)} />
                      {item.awayTeam === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
                      <Typography className="center">{item.awayTeam}</Typography>
                    </div>
                  </div>
                  <div className="flex history-results">
                    <div className="divider" />
                    <Typography className="center prediction">Results: {item.prediction}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
