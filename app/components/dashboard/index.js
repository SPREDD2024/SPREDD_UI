"use client";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, Checkbox, IconButton, Pagination, Stack, Tooltip, Typography, colors } from "@mui/material";
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

  const historyItemsPerPage = isMobile ? 5 : 10;

  const [loading, setLoading] = useState(true);

  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);

  const historyStartIndex = (currentHistoryPage - 1) * historyItemsPerPage;
  const historyEndIndex = historyStartIndex + historyItemsPerPage;
  const historyData = history.data.slice().reverse();
  let currentHistoryItems = historyData.slice(historyStartIndex, historyEndIndex);
  const historyPageCount = Math.ceil(historyData.length / historyItemsPerPage);
  if (currentHistoryItems && currentHistoryItems.length % 2 !== 0 && historyItemsPerPage !== 5) {
    const dummyData = { id: -1, dummy: true };
    currentHistoryItems = [...currentHistoryItems, dummyData];
  }
  const today = new Date();
  const formattedToday = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = [
    yesterday.getFullYear(),
    String(yesterday.getMonth() + 1).padStart(2, "0"),
    String(yesterday.getDate()).padStart(2, "0"),
  ].join("-");

  const oldDate = new Date();
  oldDate.setDate(oldDate.getDate() - 5);
  const startDate = [oldDate.getFullYear(), String(oldDate.getMonth() + 1).padStart(2, "0"), String(oldDate.getDate()).padStart(2, "0")].join("-");

  useEffect(() => {
    axios
      .get(PREDICTION_API_URL + formattedToday)
      .then((response) => {
        const dataWithChecked = response.data.map((item) => ({
          ...item,
          checked: false,
        }));
        dispatch(fetchPredictionsDataSuccess(dataWithChecked));
      })
      .catch((error) => dispatch(fetchPredictionsDataFailure(error)))
      .finally(() => setLoading(false));

    axios
      .get(`${HISTORY_API_URL}?start_date=${startDate}&end_date=${formattedYesterday}`)
      .then((response) => {
        dispatch(fetchHistoryDataSuccess(response.data.data));
      })
      .catch((error) => dispatch(fetchHistoryDataFailure(error)))
      .finally(() => setLoading(false));
  }, [dispatch]);

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
      {isMobile ? (
        <div className="flex image-rollercoaster">
          <img src="images/no-bs-mob.png" alt="nba banner" className="nba-banner" />
          <img src="images/get-ready-mob.png" alt="nba banner" className="nba-banner" />
        </div>
      ) : (
        <div className="flex image-rollercoaster">
          <img src="images/no-bs.png" alt="nba banner" className="nba-banner" />
          <img src="images/get-ready.png" alt="nba banner" className="nba-banner" />
        </div>
      )}
      <div className="prediction-card">
        <Stack spacing={1.5}>
          <div className="card-header flex">
            <Typography className="header-text">
              <span className="header-title">Today's Games: {formattedToday}</span>
              <Tooltip title="*Win Probability Percentages by Spredd's AI Prediction Engine" placement="right" arrow>
                <IconButton>
                  <InfoIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Typography>
          </div>
          {predictions.data.length > 0 &&
            predictions.data.map((item, index) => (
              <div className="flex match-card" key={index} style={{ outline: item.checked ? "1px solid #ff6700" : "0px" }}>
                <Typography style={{ color: "#8F96A9", fontWeight: "700" }} className="center number">
                  {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                </Typography>
                <div className="flex center opponents">
                  <div className="home-team flex-row">
                    {item.home_team === item.prediction && (
                      <Tooltip
                        title={
                          <Typography className="medium">
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
                    <Typography className="center medium">VS</Typography>
                    <div className="center percentage flex-row">
                      {item.home_team === item.prediction && <DoubleArrowIcon sx={{ transform: "rotate(180deg)" }}/>}
                      <Typography className="center small">{item.win_percentage}%</Typography>
                      {item.away_team === item.prediction && <DoubleArrowIcon />}
                    </div>
                    <Typography className="center mobile-percentage percentage flex">
                      {item.home_team === item.prediction && <DoubleArrowIcon sx={{ transform: "rotate(180deg)" }} />}
                      <Typography className="center">{item.win_percentage}%</Typography>
                      {item.away_team === item.prediction && <DoubleArrowIcon />}
                    </Typography>
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
                    <Button
                      variant={item.checked ? "contained" : "outlined"}
                      className={item.checked ? "bet-button center checked" : "bet-button center"}
                      onClick={() => handleBetClick(item.id)}
                    >
                      <Checkbox
                        checked={item.checked}
                        icon={<CheckBoxOutlineBlankIcon color="primary" />}
                        checkedIcon={<CheckBoxIcon color="primary" />}
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
            <Pagination
              count={historyPageCount}
              size="medium"
              page={currentHistoryPage}
              onChange={handleHistoryPageChange}
              shape="rounded"
              sx={{ button: { color: "#ffffff" } }}
            />
          </div>
          <div className="history-div">
            {currentHistoryItems &&
              currentHistoryItems.map((item, index) => (
                <div
                  className="flex match-card mb-5"
                  key={index}
                  style={{
                    border: item.checked ? "1px solid #ff6700" : "0px",
                    marginBottom: "12px",
                  }}
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
                          <Typography className="center small">{item.date}</Typography>
                          <Typography className="center medium">VS</Typography>
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
      <div className="disclaimer-card">
        <Typography className="disclaimer">Notice: Our content is intended for individuals aged 18 and older. The information provided is strictly for entertainment purposes only, not advice. We are not liable for any outcomes.</Typography>
      </div>
    </div>
  );
};

export default Dashboard;
