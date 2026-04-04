import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import * as Actions from "../actions";
import Score from "../utils/score";
import { RootState } from "../reducers";

interface SubmitButtonProps {
  nextPage: string;
  children: React.ReactNode;
  className: string;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  nextPage,
  children,
  className,
  setIsSaving,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.current);
  const history = useSelector((state: RootState) => state.scores);
  const labels = useSelector((state: RootState) => state.labels);

  const handleClick = () => {
    setIsSaving(true);
    dispatch(Actions.addScore(rows, labels.id));
    const id = uuidv4();
    dispatch(Actions.addAlert(t("submit.saved"), "alert alert-success", id));
    setTimeout(() => dispatch(Actions.removeAlert(id)), 2000);
    navigate(nextPage);
  };

  const isTie = Score.isTie(history, rows, labels);
  const disabled = isTie && labels.id !== "dantai_intl" && labels.id !== "dantai";
  return (
    <Button className={className} onClick={handleClick} disabled={disabled}>
      {children}
    </Button>
  );
};

export default SubmitButton;
