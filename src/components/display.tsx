import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import Score from "../utils/score";
import * as Actions from "../actions";
import { RootState } from "../reducers";

const ScoreDisplay: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scores = useSelector((state: RootState) => state.scores);
  const labels = useSelector((state: RootState) => state.labels);
  const [isUndoing, setIsUndoing] = useState(false);

  useEffect(() => {
    if (isUndoing) {
      navigate("/scorecard");
      dispatch(Actions.undoLastScore());
    }
  }, [isUndoing, navigate, dispatch]);

  const isNav = searchParams.get("navigation");
  const filteredHistory = scores.filter((card) => card.eventId === labels.id);
  const latestCard = filteredHistory[filteredHistory.length - 1];
  const score = latestCard
    ? Score.calcTotal(latestCard.scores, labels).toFixed(1)
    : t("display.notApplicable");
  const buttons = isNav ? (
    ""
  ) : (
    <div className="action-buttons">
      <div className="row justify-content-center gx-5">
        <div className="col-md-3 d-grid">
          <button
            className="btn btn-warning"
            onClick={() => {
              setIsUndoing(true);
            }}
          >
            {t("display.cancel")}
          </button>
        </div>
        <div className="col-md-3 d-grid">
          <button
            className="btn btn-success"
            onClick={() => {
              dispatch(Actions.clearCurrent());
              navigate("/scorecard");
            }}
          >
            {t("display.next")}
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="d-flex flex-column h-100">
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <h1 className="totaldisp">{isUndoing ? "" : score}</h1>
      </div>
      <div className="container py-3">{buttons}</div>
    </div>
  );
};

export default ScoreDisplay;
