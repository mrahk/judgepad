import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import ScorePicker from "./scorepicker";
import CounterPicker from "./counterpicker";
import TogglePicker from "./togglepicker";
import RankPicker from "./rankpicker";
import SubmitButton from "./submit";
import Score from "../utils/score";
import { RootState } from "../reducers";
import * as Actions from "../actions";

const Scorecard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.current);
  const history = useSelector((state: RootState) => state.scores);
  const labels = useSelector((state: RootState) => state.labels);
  const [isSaving, setIsSaving] = useState(false);

  const handleValueChange = (id: number, value: number) => {
    const newRows = rows.map((row) =>
      row.id === id ? { ...row, value } : row,
    );
    dispatch(Actions.updateCurrent(newRows));
  };

  const renderScoringUI = () => {
    if (labels.id === "dantai" || labels.id === "tenkai") {
      const rowElements = rows.slice(0, 5).map((rowprops, i) => {
        const { key, ...rest } = rowprops;
        return (
          <ScorePicker
            key={key}
            {...rest}
            label={labels.labels[i]}
            handleValueChange={handleValueChange}
          />
        );
      });
      const extraRow = rows[5];
      const { key, ...rest } = extraRow;
      const extraPicker = (
        <ScorePicker
          key={key}
          {...rest}
          label={labels.labels[5]}
          handleValueChange={handleValueChange}
          isExtra
        />
      );
      return (
        <>
          {rowElements}
          {extraPicker}
        </>
      );
    }

    if (labels.id === "dantai_intl") {
      const getRow = (idx: number) => rows[idx] || { id: idx, key: idx, value: 0 };
      const categories = [
        { name: "A", min: 8.6, max: 9.2 },
        { name: "B", min: 8.1, max: 8.5 },
        { name: "C", min: 7.5, max: 8.0 },
      ];
      return (
        <>
          <h5>{t("dantai_hokei.deductions", "Deductions")}</h5>
          <CounterPicker
            {...getRow(0)}
            label={labels.labels[0]}
            handleValueChange={handleValueChange}
          />
          <CounterPicker
            {...getRow(1)}
            label={labels.labels[1]}
            handleValueChange={handleValueChange}
          />
          <CounterPicker
            {...getRow(2)}
            label={labels.labels[2]}
            handleValueChange={handleValueChange}
          />
          <hr />
          <RankPicker
            {...getRow(3)}
            label={labels.labels[3]}
            handleValueChange={handleValueChange}
            categories={categories}
          />
          <hr />
          <h5>{t("dantai_hokei.bonuses", "Bonus Points")}</h5>
          <CounterPicker
            {...getRow(4)}
            label={labels.labels[4]}
            handleValueChange={handleValueChange}
            step={0.1}
            max={0.2}
          />
          <CounterPicker
            {...getRow(5)}
            label={labels.labels[5]}
            handleValueChange={handleValueChange}
            step={0.1}
            max={0.2}
          />
          <CounterPicker
            {...getRow(6)}
            label={labels.labels[6]}
            handleValueChange={handleValueChange}
            step={0.1}
            max={0.4}
          />
          <CounterPicker
            {...getRow(7)}
            label={labels.labels[7]}
            handleValueChange={handleValueChange}
            step={0.1}
            max={0.8}
          />
        </>
      );
    }

    if (labels.id === "tenkai_intl_main") {
      const getRow = (idx: number) => rows[idx] || { id: idx, key: idx, value: 0 };
      const categories = [
        { name: "A", min: 9.0, max: 10.0 },
        { name: "B", min: 8.0, max: 8.9 },
        { name: "C", min: 7.0, max: 7.9 },
      ];
      return (
        <>
          <h5>{t("tenkai.deductions", "Deductions")}</h5>
          <CounterPicker
            {...getRow(0)}
            label={labels.labels[0]}
            handleValueChange={handleValueChange}
          />
          <CounterPicker
            {...getRow(1)}
            label={labels.labels[1]}
            handleValueChange={handleValueChange}
          />
          <CounterPicker
            {...getRow(2)}
            label={labels.labels[2]}
            handleValueChange={handleValueChange}
          />
          <CounterPicker
            {...getRow(3)}
            label={labels.labels[3]}
            handleValueChange={handleValueChange}
          />
          <hr />
          <RankPicker
            {...getRow(4)}
            label={labels.labels[4]}
            handleValueChange={handleValueChange}
            categories={categories}
          />
        </>
      );
    }

    if (labels.id === "tenkai_intl_sub") {
      const getRow = (idx: number) => rows[idx] || { id: idx, key: idx, value: 0 };
      const categories = [
        { name: "A", min: 9.0, max: 10.0 },
        { name: "B", min: 8.0, max: 8.9 },
        { name: "C", min: 7.0, max: 7.9 },
      ];
      return (
        <>
          <h5>{t("tenkai.deductions", "Deductions")}</h5>
          <CounterPicker
            {...getRow(0)}
            label={labels.labels[0]}
            handleValueChange={handleValueChange}
          />
          <CounterPicker
            {...getRow(1)}
            label={labels.labels[1]}
            handleValueChange={handleValueChange}
            step={0.1}
            min={0}
            max={1.0}
            minNonZero={0.5}
          />
          <CounterPicker
            {...getRow(2)}
            label={labels.labels[2]}
            handleValueChange={handleValueChange}
            step={0.1}
            min={0}
            max={1.0}
            minNonZero={0.5}
          />
          <hr />
          <RankPicker
            {...getRow(3)}
            label={labels.labels[3]}
            handleValueChange={handleValueChange}
            categories={categories}
          />
        </>
      );
    }

    return null;
  };

  const total = Score.calcTotal(rows, labels);
  const standing = Score.getStanding(history, rows, labels);
  const isTie = Score.isTie(history, rows, labels);
  const warningSign = <i className="fa fa-warning" style={{ color: "red" }} />;

  return (
    <div className="d-flex flex-column h-100">
      <div className="px-3 py-3 flex-grow-1 overflow-auto">
        <div className="row align-items-center">
          <div className="col-6">
            <strong>
              {t("scorecard.team")} {history.length + 1}
            </strong>
          </div>
          <div className="col-6 text-end">
            {!labels.id.startsWith("dantai_intl") &&
            !labels.id.startsWith("tenkai_intl") ? (
              ""
            ) : (
              <h4 className="mb-0">
                {t("scorecard.totalScore")}: {total.toFixed(1)}
              </h4>
            )}
          </div>
        </div>
        <hr className="my-3" />
        {renderScoringUI()}
        <hr className="my-3" />
        <div className="row equal">
          <div className="col-md-6">
            <strong>{t("scorecard.totalScore")}:</strong>{" "}
            {total.toFixed(1)}
          </div>
          <div className="col-md-6">
            {!labels.id.startsWith("dantai_intl") &&
            !labels.id.startsWith("tenkai_intl") ? (
              <>
                <strong>{t("scorecard.currentStanding")}:</strong> {standing}{" "}
                {isTie && !isSaving ? warningSign : ""}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="action-buttons px-3 py-3">
        <div className="row justify-content-center mt-2">
          <div className="col-md-8 text-center">
            {isTie && !isSaving && labels.id !== "dantai" ? (
              <div className="alert alert-danger">
                {labels.id.startsWith("tenkai_intl")
                  ? t("scorecard.tenkaiTieWarning")
                  : t("scorecard.equalPointsNotPossibleToSave")}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row justify-content-center gx-5">
          <div className="col-md-3 d-grid">
            <button
              className="btn btn-warning"
              onClick={() => dispatch(Actions.clearCurrent())}
            >
              {t("scorecard.clear")}
            </button>
          </div>
          <div className="col-md-3 d-grid">
            <SubmitButton
              className="btn btn-success"
              nextPage="/display"
              setIsSaving={setIsSaving}
            >
              {t("scorecard.saveAndDisplay")}
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
