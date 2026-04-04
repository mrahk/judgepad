import React from "react";
import { Button, Form } from "react-bootstrap";

interface TogglePickerProps {
  label: string;
  id: number;
  value: number;
  handleValueChange: (id: number, value: number) => void;
}

const TogglePicker: React.FC<TogglePickerProps> = (props) => {
  const handleToggle = () => {
    props.handleValueChange(props.id, props.value === 0 ? 1 : 0);
  };

  return (
    <div className="row equal mb-2">
      <div className="col-lg-4 rowlabel">
        <Form.Label>{props.label}</Form.Label>
      </div>
      <div className="col-lg-8 d-grid">
        <Button
          variant={props.value === 1 ? "success" : "outline-secondary"}
          size="lg"
          onClick={handleToggle}
        >
          {props.value === 1 ? "Selected" : "Not Selected"}
        </Button>
      </div>
    </div>
  );
};

export default TogglePicker;
