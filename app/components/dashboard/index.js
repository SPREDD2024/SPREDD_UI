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
  const itemsPerPage = 5;

  const [matches, setMatches] = useState(DashboardMatches);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleBetClick = (id) => {
    setMatches((prevMatches) => prevMatches.map((match) => (match.id === id ? { ...match, checked: !match.checked } : match)));
  };
  
  const getTeamColors = (team) => {
    const teamColors = TeamColorCodes.find((item) => item.name === team);
    return teamColors ? teamColors.colors : [];
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = matches.slice(startIndex, endIndex);

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
              <Pagination count={Math.ceil(matches.length / itemsPerPage)} size="medium" page={currentPage} onChange={handleChange} color="primary" />
            </div>
            {currentItems.map((item, index) => (
              <div className="flex match-card" style={{ border: item.checked ? "1px solid #ff6700" : "0px" }}>
                <Typography className="center number">{(currentPage - 1) * itemsPerPage + index + 1}</Typography>
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
        <div className="prediction-card"></div>
      </div>
    </>
  );
};

export default Dashboard;
