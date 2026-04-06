import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import Score from "../utils/score";
import { RootState } from "../reducers";

const HistoryTable: React.FC = () => {
  const { t } = useTranslation();
  const scores = useSelector((state: RootState) => state.scores);
  const current = useSelector((state: RootState) => state.current);
  const labels = useSelector((state: RootState) => state.labels);

  const filteredHistory = scores.filter((card) => card.eventId === labels.id);
  const allScores = [...filteredHistory.map((card) => card.scores), current];

  const header = _.range(0, allScores.length - 1).map((i) => (
    <th key={i}>
      {t("historyTable.team")} {i + 1}
    </th>
  ));
  header.push(<th key="current">{t("historyTable.current")}</th>);

  const isCounter = (index: number): boolean => {
    if (labels.id === "dantai_intl") return index <= 2;
    if (labels.id === "tenkai_intl_main") return index <= 3;
    if (labels.id === "tenkai_intl_sub") return index === 0;
    if (labels.id === "dantai" || labels.id === "tenkai") return index <= 4;
    return false;
  };

  const rows = _.range(0, labels.labels.length).map((i) =>
    allScores.map((score, j) => (
      <td key={`score${j}${i}`}>
        {isCounter(i) ? score[i].value.toFixed(0) : score[i].value.toFixed(1)}
      </td>
    )),
  );
  const rowDivs = rows
    ? rows.map((row, i) => (
        <tr key={i}>
          <th>{labels.labels[i]}</th>
          {row}
        </tr>
      ))
    : labels.labels.map((label, i) => (
        <tr key={i}>
          <th>{label}</th>
        </tr>
      ));
  const totals = allScores.map((team, i) => (
    <td key={`total${i}`}>
      <em>{Score.calcTotal(team, labels).toFixed(1)}</em>
    </td>
  ));
  const standings = allScores.map((team, i) => (
    <td key={`standing${i}`}>
      <strong>{Score.getStanding(filteredHistory, team, labels)}</strong>
    </td>
  ));

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr>
            <th>{t("historyTable.categoryTeam")}</th>
            {header}
          </tr>
        </thead>
        <tbody>
          {rowDivs}
          <tr>
            <th>{t("historyTable.finalScore")}</th>
            {totals}
          </tr>
          <tr>
            <th>{t("historyTable.standings")}</th>
            {standings}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
