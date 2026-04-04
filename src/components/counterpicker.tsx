import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

interface CounterPickerProps {
  label: string;
  id: number;
  value: number;
  handleValueChange: (id: number, value: number) => void;
  step?: number;
  max?: number;
  min?: number;
  minNonZero?: number;
}

const CounterPicker: React.FC<CounterPickerProps> = (props) => {
  const {
    step = 1,
    max = Number.MAX_SAFE_INTEGER,
    min = 0,
    minNonZero,
  } = props;

  const handleDecrement = () => {
    if (props.value > min) {
      let newValue = Math.round((props.value - step) * 10) / 10;
      if (minNonZero !== undefined && newValue < minNonZero) {
        newValue = 0;
      }
      props.handleValueChange(props.id, Math.max(min, newValue));
    }
  };

  const handleIncrement = () => {
    if (props.value < max) {
      let newValue;
      if (props.value === 0 && minNonZero !== undefined) {
        newValue = minNonZero;
      } else {
        newValue = Math.round((props.value + step) * 10) / 10;
      }
      props.handleValueChange(props.id, Math.min(max, newValue));
    }
  };

  return (
    <div className="row equal mb-2">
      <div className="col-lg-4 rowlabel">
        <Form.Label>{props.label}</Form.Label>
      </div>
      <div className="col-lg-8">
        <ButtonGroup className="w-100">
          <Button variant="outline-danger" onClick={handleDecrement} size="lg">
            -
          </Button>
          <Button variant="light" disabled size="lg" className="flex-grow-1">
            {step >= 1 ? props.value.toFixed(0) : props.value.toFixed(1)}
          </Button>
          <Button variant="outline-success" onClick={handleIncrement} size="lg">
            +
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CounterPicker;
