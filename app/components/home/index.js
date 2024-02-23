"use client";
import React from "react";
import "./styles.css";
import { Button, Checkbox, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import dashboardMatches from "../common/constants/dashboardMatches";
import TeamColorCodes from "../common/constants/teamColorCodes";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TeamColors from "../common/TeamColors";

const Home = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const today = new Date();
  const formattedToday = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = [
    yesterday.getFullYear(),
    String(yesterday.getMonth() + 1).padStart(2, "0"),
    String(yesterday.getDate()).padStart(2, "0"),
  ].join("-");

  const getTeamColors = (team) => {
    const teamColors = TeamColorCodes.find((item) => item.name === team || item.commonlyKnownAs === team);
    return teamColors ? teamColors.colors : [];
  };

  return (
    <div className="dashboard-container flex-column">
      {!isMobile && (
        <div className="flex image-rollercoaster">
          <img src="images/no-bs.png" alt="nba banner" className="nba-banner" />
          <img src="images/get-ready.png" alt="nba banner" className="nba-banner" />
        </div>
      )}
      <div className="prediction-card">
        <Stack spacing={2}>
          <div className="card-header flex">
            <Typography className="header-text">
              <span className="header-title">Today's Matches {formattedToday}</span>
              <Tooltip title="*Win Probability Percentages by Spredd's AI Prediction Engine" placement="right" arrow>
                <IconButton>
                  <InfoIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Typography>
          </div>
          {dashboardMatches &&
            dashboardMatches.slice(0, 5).map((item, index) => (
              <div className="container">
                {index > 1 && <div className="blur"></div>}
                <div
                  className="flex match-card w100"
                  key={index}
                  style={{
                    outline: item.checked ? "1px solid #ff6700" : "0px",
                  }}
                >
                  <Typography className="center number">{index + 1}</Typography>
                  <div className="flex center opponents">
                    <div className="home-team flex-row">
                      {item.home_team === item.prediction && (
                        <Tooltip
                          title={
                            <Typography>
                              Chances of {item.home_team} winning are {item.win_percentage}%
                            </Typography>
                          }
                          placement="left"
                          arrow
                        >
                          <IconButton>
                            <EmojiEventsIcon className="center" color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Typography className="center medium">{item.home_team}</Typography>
                      {!isMobile && <TeamColors teamColors={getTeamColors(item.home_team)} />}
                    </div>
                    <div className="vs flex-column">
                      <Typography className="center small">VS</Typography>
                      <div className="center percentage flex-row">
                        {item.home_team === item.prediction && <DoubleArrowIcon sx={{ transform: "rotate(180deg)" }} />}
                        <Typography className="center">{item.win_percentage}%</Typography>
                        {item.away_team === item.prediction && <DoubleArrowIcon />}
                      </div>
                    </div>
                    <div className="away-team flex-row">
                      {!isMobile && <TeamColors teamColors={getTeamColors(item.away_team)} />}
                      <Typography className="center">{item.away_team}</Typography>
                      {item.away_team === item.prediction && (
                        <Tooltip
                          title={
                            <Typography>
                              Chances of {item.away_team} winning are {item.win_percentage}%
                            </Typography>
                          }
                          placement="right"
                          arrow
                        >
                          <IconButton>
                            <EmojiEventsIcon className="center" color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                  <div className="flex results">
                    <div className="divider" />
                    {!isMobile && (
                      <Typography className="center prediction">
                        <span className="prediction-text">Prediction:</span> {item.prediction}
                      </Typography>
                    )}
                    <div className="flex-row mobile-bet-button">
                      <Typography className="center mobile-percentage">{item.win_percentage}%</Typography>
                      <Button variant={item.checked ? "contained" : "outlined"} className="bet-button center">
                        <Checkbox
                          checked={item.checked}
                          icon={<CheckBoxOutlineBlankIcon color="grey" />}
                          checkedIcon={<CheckBoxIcon color="white" />}
                        />
                        BET
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Stack>
      </div>
      <div className="prediction-card">
        <Stack spacing={1}>
          <div className="card-header flex">
            <Typography className="header-text">
              <span className="header-title">History</span>
            </Typography>
          </div>
          <div className="history-div">
            {dashboardMatches &&
              dashboardMatches.slice(0, 6).map((item, index) => (
                <div
                  style={{
                    marginBottom: "12px",
                  }}
                  className="flex match-card mb-5"
                  key={index}
                >
                  {!item.dummy && (
                    <>
                      <div className="flex center opponents">
                        <div className="home-team-history flex-row">
                          {item.home_team === item.prediction && (
                            <Tooltip
                              title={
                                <Typography>
                                  Our Prediction: {item.prediction}
                                  <br />
                                  Actual Result: {item.win}
                                </Typography>
                              }
                              placement="bottom"
                              arrow
                            >
                              <IconButton>
                                <EmojiEventsIcon className="center" color="primary" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Typography className="center medium">{item.home_team}</Typography>
                          {!isMobile && <TeamColors teamColors={getTeamColors(item.home_team)} />}
                        </div>
                        <div className="vs flex-column">
                          <Typography className="center x-small">{item.date}</Typography>
                          <Typography className="center small">VS</Typography>
                          <div className="center percentage flex-row">
                            {item.home_team === item.prediction && <DoubleArrowIcon sx={{ transform: "rotate(180deg)" }} />}
                            <Typography className="center">{item.win_percentage}%</Typography>
                            {item.away_team === item.prediction && <DoubleArrowIcon />}
                          </div>
                        </div>
                        <div className="away-team-history flex-row">
                          {!isMobile && <TeamColors teamColors={getTeamColors(item.away_team)} />}
                          <Typography className="center">{item.away_team}</Typography>
                          {item.away_team === item.prediction && (
                            <Tooltip
                              title={
                                <Typography>
                                  Our Prediction: {item.prediction}
                                  <br />
                                  Actual Result: {item.win}
                                </Typography>
                              }
                              placement="bottom"
                              arrow
                            >
                              <IconButton>
                                <EmojiEventsIcon className="center" color="primary" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                      <div className="flex history-results">
                        <div className="divider" />
                        <Typography className="center prediction medium">
                          <span className="prediction-text">Results: </span>
                          {item.win}
                        </Typography>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Home;
