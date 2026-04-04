import { Row, Labels, ScoreCard } from "../types";

const calcTotal = (rows: Row[], labels?: Labels): number => {
  if (rows.length === 0) return 0;
  if (!labels || labels.id === "dantai" || labels.id === "tenkai") {
    return (
      rows
        .slice(0, 6)
        .map((item) => item.value)
        .reduce(
          (a, b) =>
            Number.parseFloat(a.toString()) + Number.parseFloat(b.toString()),
          0,
        ) / 5
    );
  }

  if (labels.id === "dantai_intl") {
    const deductions =
      rows[0].value * 0.1 + rows[1].value * 0.1 + rows[2].value * 0.3;
    const baseScore = rows[3].value;
    const bonuses =
      rows[4].value + rows[5].value + rows[6].value + rows[7].value;
    return baseScore + bonuses - deductions;
  }

  if (labels.id === "tenkai_intl_main") {
    const deductions =
      rows[0].value * 0.2 +
      rows[1].value * 1.0 +
      rows[2].value * 1.0 +
      rows[3].value * 0.5;
    const aScore = 10 - deductions;
    const bScore = rows[4].value;
    return aScore + bScore;
  }

  if (labels.id === "tenkai_intl_sub") {
    const deductions =
      rows[0].value * 0.1 + rows[1].value + rows[2].value; // For rows 1 and 2, we store the actual deduction value
    const bScore = rows[3].value;
    return bScore - deductions;
  }

  return 0;
};

const getStanding = (
  history: ScoreCard[],
  current: Row[],
  labels?: Labels,
): number => {
  const currentTotal = Math.round(calcTotal(current, labels) * 10) / 10;
  const filteredHistory = labels
    ? history.filter((card) => card.eventId === labels.id)
    : history;

  return filteredHistory.reduce(
    (a, b) =>
      Math.round(calcTotal(b.scores, labels) * 10) / 10 > currentTotal
        ? a + 1
        : a,
    1,
  );
};

const isTie = (
  history: ScoreCard[],
  current: Row[],
  labels?: Labels,
): boolean => {
  const currentTotal = Math.round(calcTotal(current, labels) * 10) / 10;
  const filteredHistory = labels
    ? history.filter((card) => card.eventId === labels.id)
    : history;

  return filteredHistory.some(
    (team) => Math.round(calcTotal(team.scores, labels) * 10) / 10 === currentTotal,
  );
};

export default { calcTotal, getStanding, isTie };
