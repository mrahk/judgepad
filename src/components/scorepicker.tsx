import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

interface ScorePickerProps {
  label: string;
  id: number;
  value: number;
  handleValueChange: (id: number, value: number) => void;
  isExtra?: boolean;
  customValues?: number[];
}

const ScorePicker: React.FC<ScorePickerProps> = (props) => {
  const handleChange = (value: number) =>
    props.handleValueChange(props.id, value);

  const values = props.customValues
    ? props.customValues
    : props.isExtra
      ? [-0.5, 0, 0.5]
      : [...Array(11).keys()];

  const buttons = values.map((i) => (
    <Button
      key={`row${props.id.toString()}btn${i.toString()}`}
      className={`button${i.toString()} scorecard-button`}
      size="large"
      variant="default"
      active={props.value === i}
      onClick={() => handleChange(i)}
    >
      {i.toFixed(1)}
    </Button>
  ));

  if (props.isExtra) {
    return (
      <div className="row equal">
        <div className="col-lg-4 rowlabel">
          <form onSubmit={(event) => event.preventDefault()}>
            <Form.Label>{props.label}</Form.Label>
          </form>
        </div>
        <div className="col-lg-8 d-grid">
          <ButtonGroup>{buttons}</ButtonGroup>
        </div>
      </div>
    );
  }

  return (
    <div className="row equal">
      <div className="col-lg-4 rowlabel">
        <form onSubmit={(event) => event.preventDefault()}>
          <Form.Label>{props.label}</Form.Label>
        </form>
      </div>
      <div className="col-lg-8">
        <div className="d-grid gap-2">
          <ButtonGroup>{buttons}</ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default ScorePicker;
