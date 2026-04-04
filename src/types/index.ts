import {
  ADD_SCORE,
  UPDATE_CURRENT,
  CLEAR_CURRENT,
  CLEAR_SCORES,
  UNDO_LAST_SCORE,
  CHANGE_LABELS,
  ADD_ALERT,
  REMOVE_ALERT,
} from "../actions";

export interface Row {
  key: number;
  id: number;
  value: number;
}

export interface ScoreCard {
  scores: Row[];
  eventId: string;
}

export interface Labels {
  id: string;
  name: string;
  labels: string[];
}

export interface Alert {
  text: string;
  style: string;
  id: string;
}

interface AddScoreAction {
  type: typeof ADD_SCORE;
  scores: Row[];
  eventId: string;
}

interface UpdateCurrentAction {
  type: typeof UPDATE_CURRENT;
  rows: Row[];
}

interface ClearCurrentAction {
  type: typeof CLEAR_CURRENT;
}

interface ClearScoresAction {
  type: typeof CLEAR_SCORES;
}

interface UndoLastScoreAction {
  type: typeof UNDO_LAST_SCORE;
}

interface ChangeLabelsAction {
  type: typeof CHANGE_LABELS;
  labels: Labels;
}

interface AddAlertAction {
  type: typeof ADD_ALERT;
  text: string;
  style: string;
  id: string;
}

interface RemoveAlertAction {
  type: typeof REMOVE_ALERT;
  id: string;
}

export type AppAction =
  | AddScoreAction
  | UpdateCurrentAction
  | ClearCurrentAction
  | ClearScoresAction
  | UndoLastScoreAction
  | ChangeLabelsAction
  | AddAlertAction
  | RemoveAlertAction;
