import _ from "lodash";

import {
  UPDATE_CURRENT,
  CLEAR_CURRENT,
  ADD_SCORE,
  CLEAR_SCORES,
  CHANGE_LABELS,
  UNDO_LAST_SCORE,
  ADD_ALERT,
  REMOVE_ALERT,
} from "../actions";
import { AppAction, Row, Labels, Alert, ScoreCard } from "../types";

const defaultRows: Row[] = [
  { key: 0, id: 0, value: 0 },
  { key: 1, id: 1, value: 0 },
  { key: 2, id: 2, value: 0 },
  { key: 3, id: 3, value: 0 },
  { key: 4, id: 4, value: 0 },
  { key: 5, id: 5, value: 0 },
  { key: 6, id: 6, value: 0 },
  { key: 7, id: 7, value: 0 },
  { key: 8, id: 8, value: 0 },
  { key: 9, id: 9, value: 0 },
];

const defaultLabels: Labels = {
  id: "dantai",
  name: "Dantai Hokei",
  labels: [
    "Form preservation, synchronization",
    "Technical purity",
    "Technical difficulty",
    "Breathing and effectiveness",
    "Impression",
    "Additional point",
  ],
};

const currentCard = (
  state: Row[] = _.cloneDeep(defaultRows),
  action: AppAction,
): Row[] => {
  switch (action.type) {
    case UPDATE_CURRENT:
      return action.rows;
    case CLEAR_CURRENT:
    case CHANGE_LABELS:
      return _.cloneDeep(defaultRows);
    default:
      return state;
  }
};

const scoreCards = (state: ScoreCard[] = [], action: AppAction): ScoreCard[] => {
  switch (action.type) {
    case ADD_SCORE:
      return [...state, { scores: action.scores, eventId: action.eventId }];
    case CLEAR_SCORES:
      return [];
    case UNDO_LAST_SCORE:
      return state.slice(0, -1);
    default:
      return state;
  }
};

const labels = (state: Labels = defaultLabels, action: AppAction): Labels => {
  switch (action.type) {
    case CHANGE_LABELS:
      return action.labels;
    default:
      return state;
  }
};

const alerts = (state: Alert[] = [], action: AppAction): Alert[] => {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...state,
        {
          text: action.text,
          style: action.style,
          id: action.id,
        },
      ];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.id);
    default:
      return state;
  }
};

export { currentCard, scoreCards, labels, alerts };
