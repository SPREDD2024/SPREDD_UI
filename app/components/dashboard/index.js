"use client";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, Checkbox, IconButton, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { PREDICTION_API_URL, HISTORY_API_URL } from "../common/constants/apiURLs";
import TeamColorCodes from "../common/constants/teamColorCodes";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TeamColors from "../common/TeamColors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPredictionsDataSuccess,
  fetchPredictionsDataFailure,
  fetchHistoryDataSuccess,
  fetchHistoryDataFailure,
} from "../../store/actions/dataActions";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const predictions = useSelector((state) => state.predictions);
  const history = useSelector((state) => state.history);

  const gameItemsPerPage = 5;
  const historyItemsPerPage = isMobile ? 5 : 10;

  const [loading, setLoading] = useState(true);

  const [currentGamePage, setCurrentGamePage] = useState(1);
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const gameStartIndex = (currentGamePage - 1) * gameItemsPerPage;
  const gameEndIndex = gameStartIndex + gameItemsPerPage;
  const currentGameItems = predictions.data && predictions.data.slice(gameStartIndex, gameEndIndex);
  const gamePageCount = Math.ceil(predictions.data.length / gameItemsPerPage);

  const historyStartIndex = (currentHistoryPage - 1) * historyItemsPerPage;
  const historyEndIndex = historyStartIndex + historyItemsPerPage;
  let currentHistoryItems = history.data && history.data.slice(historyStartIndex, historyEndIndex);
  const historyPageCount = Math.ceil(history.data.length / historyItemsPerPage);
  if (currentHistoryItems && currentHistoryItems.length % 2 !== 0 && historyItemsPerPage !== 5) {
    const dummyData = { id: -1, dummy: true };
    currentHistoryItems = [...currentHistoryItems, dummyData];
  }
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 5);
    const formattedStartDate = startDate.toISOString().split("T")[0];

    axios
      .get(PREDICTION_API_URL + today, { headers: { "Content-Security-Policy": "upgrade-insecure-requests" } })
      .then((response) => {
        const dataWithChecked = response.data.map((item) => ({ ...item, checked: false }));
        dispatch(fetchPredictionsDataSuccess(dataWithChecked));
      })
      .catch((error) => dispatch(fetchPredictionsDataFailure(error)))
      .finally(() => setLoading(false));

    axios
      .get(`${HISTORY_API_URL}?start_date=${formattedStartDate}&end_date=${today}`, {
        headers: { "Content-Security-Policy": "upgrade-insecure-requests" },
      })
      .then((response) => {
        dispatch(fetchHistoryDataSuccess(response.data.data));
      })
      .catch((error) => dispatch(fetchHistoryDataFailure(error)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleGamePageChange = (event, value) => {
    setCurrentGamePage(value);
  };

  const handleHistoryPageChange = (event, value) => {
    setCurrentHistoryPage(value);
  };

  const handleBetClick = (id) => {
    if (predictions.data) {
      dispatch(fetchPredictionsDataSuccess(predictions.data.map((match) => (match.id === id ? { ...match, checked: !match.checked } : match))));
    }
  };

  const getTeamColors = (team) => {
    const teamColors = TeamColorCodes.find((item) => item.name === team || item.commonlyKnownAs === team);
    return teamColors ? teamColors.colors : [];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container flex-column">
      <img src="images/nba-banner.png" alt="nba banner" className="nba-banner" />
      <div className="prediction-card">
        <Stack spacing={1}>
          <div className="card-header flex">
            <Typography className="header-text">
              <span className="header-title">Today's Matches {today}</span>
              <Tooltip title="*Win Probability Percentages by Spredd's AI Prediction Engine" placement="right" arrow>
                <IconButton>
                  <InfoIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Pagination count={gamePageCount} size="medium" page={currentGamePage} shape="rounded" onChange={handleGamePageChange} color="primary" />
          </div>
          {currentGameItems &&
            currentGameItems.map((item, index) => (
              <div className="flex match-card" key={index} style={{ outline: item.checked ? "1px solid #ff6700" : "0px" }}>
                <Typography className="center number">
                  {(currentGamePage - 1) * gameItemsPerPage + index + 1 < 10
                    ? "0" + ((currentGamePage - 1) * gameItemsPerPage + index + 1)
                    : (currentGamePage - 1) * gameItemsPerPage + index + 1}
                </Typography>
                <div className="flex center opponents">
                  <div className="home-team flex-row">
                    {item.home_team === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
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
                    {item.away_team === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
                  </div>
                </div>
                <div className="flex results">
                  <div className="divider" />
                  {!isMobile && <Typography className="center prediction">Prediction: {item.prediction}</Typography>}
                  <div className="flex-row mobile-bet-button">
                    <Typography className="center mobile-percentage">{item.win_percentage}%</Typography>
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
            <Typography className="header-text">
              <span className="header-title">History</span>
            </Typography>
            <Pagination count={historyPageCount} size="medium" page={currentHistoryPage} onChange={handleHistoryPageChange} color="primary" />
          </div>
          <div className="history-div">
            {currentHistoryItems &&
              currentHistoryItems.map((item, index) => (
                <div className="flex match-card mb-5" key={index} style={{ border: item.checked ? "1px solid #ff6700" : "0px" }}>
                  {!item.dummy && (
                    <>
                      <div className="flex center opponents">
                        <div className="home-team-history flex-row">
                          {item.home_team === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
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
                        <div className="away-team-history flex-row">
                          {!isMobile && <TeamColors teamColors={getTeamColors(item.away_team)} />}
                          <Typography className="center">{item.away_team}</Typography>
                          {item.away_team === item.prediction && <EmojiEventsIcon className="center" color="primary" />}
                        </div>
                      </div>
                      <div className="flex history-results">
                        <div className="divider" />
                        <Typography className="center prediction">Results: {item.prediction}</Typography>
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

export default Dashboard;
