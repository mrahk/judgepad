import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export interface RankCategory {
  name: string;
  min: number;
  max: number;
}

interface RankPickerProps {
  label: string;
  id: number;
  value: number;
  handleValueChange: (id: number, value: number) => void;
  categories: RankCategory[];
}

const RankPicker: React.FC<RankPickerProps> = (props) => {
  const renderCategory = (cat: RankCategory) => {
    const values = [];
    for (let i = cat.max; i >= cat.min; i -= 0.1) {
      values.push(Math.round(i * 10) / 10);
    }

    return (
      <div key={cat.name} className="mb-3">
        <h6>Rank {cat.name}</h6>
        <div className="d-flex flex-wrap gap-2">
          {values.map((val) => (
            <Button
              key={val}
              variant={props.value === val ? "primary" : "outline-primary"}
              className="flex-grow-1"
              style={{ minWidth: "55px", padding: "10px 5px" }}
              onClick={() => props.handleValueChange(props.id, val)}
              size="lg"
            >
              {val.toFixed(1)}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-4">
      <Form.Label>
        <strong>{props.label}</strong>
      </Form.Label>
      {props.categories.map(renderCategory)}
    </div>
  );
};

export default RankPicker;
