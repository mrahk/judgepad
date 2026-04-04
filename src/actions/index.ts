import { Row, Labels, AppAction } from "../types";

export const ADD_SCORE = "ADD_SCORE";
export const UPDATE_CURRENT = "UPDATE_CURRENT";
export const CLEAR_CURRENT = "CLEAR_CURRENT";
export const CLEAR_SCORES = "CLEAR_SCORES";
export const UNDO_LAST_SCORE = "UNDO_LAST_SCORE";
export const CHANGE_LABELS = "CHANGE_LABELS";
export const ADD_ALERT = "ADD_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

/*
 * action creators
 */
export function updateCurrent(rows: Row[]): AppAction {
  return { type: UPDATE_CURRENT, rows };
}

export function clearCurrent(): AppAction {
  return { type: CLEAR_CURRENT };
}

export function addScore(scoreCard: Row[], eventId: string): AppAction {
  return { type: ADD_SCORE, scores: scoreCard, eventId };
}

export function clearScores(): AppAction {
  return { type: CLEAR_SCORES };
}

export function undoLastScore(): AppAction {
  return { type: UNDO_LAST_SCORE };
}

export function changeLabels(labels: Labels): AppAction {
  return { type: CHANGE_LABELS, labels };
}

export function addAlert(text: string, style: string, id: string): AppAction {
  return {
    type: ADD_ALERT,
    text,
    style,
    id,
  };
}

export function removeAlert(id: string): AppAction {
  return {
    type: REMOVE_ALERT,
    id,
  };
}
