"use client";
import React, { useState } from "react";
import "./styles.css";
import { Avatar, Button, Checkbox, IconButton, Pagination, Stack, ToggleButton, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DashboardMatches from "../constants/dashboardMatches";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const Dashboard = () => {
  const itemsPerPage = 5;

  const [matches, setMatches] = useState(DashboardMatches);

  // const getCircleStyle = (teamColors) => {
  //   const gradient = `linear-gradient(to right, ${teamColors.join(", ")})`;

  //   return {
  //     background: gradient,
  //     width: 50, // Adjust the width as needed
  //     height: 50,
  //     borderRadius: "50%",
  //     display: "inline-block",
  //     margin: "5px", // Adjust spacing as needed
  //   };
  // };

  // const teams = [
  //   {
  //     name: "Atlanta Hawks",
  //     colors: ["#E03A3E", "#C1D32F", "#26282A"],
  //   },
  //   {
  //     name: "Boston Celtics",
  //     colors: ["#007A33", "#BA9653"],
  //   },
  //   // Add more teams as needed
  // ];

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleBetClick = (id) => {
    setMatches((prevMatches) => prevMatches.map((match) => (match.id === id ? { ...match, checked: !match.checked } : match)));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = matches.slice(startIndex, endIndex);
  return (
    <>
      {/* {teams.map((team, index) => (
        <div key={index} style={getCircleStyle(team.colors)}></div>
      ))} */}
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
                    <Avatar alt={item.homeTeam} className="center" src={item.homeImageURL} sx={{ bgcolor: "#ff6700" }} />
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
                    <Avatar alt={item.awayTeam} className="center" src={item.awayImageURL} sx={{ bgcolor: "#ff6700" }} />
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
