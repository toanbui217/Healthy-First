import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Button from "@mui/material/Button";
import "./Filter.css";

const maxWord = 5;

function Filter({ title, choices, criteria, onChange, filter }) {
  const [value, setValue] = useState(criteria[filter]);

  useEffect(() => {
    setValue(criteria[filter]);
  }, [criteria]);

  const handleChange = (e) => {
    var value = e.target.value;
    setValue(value);
    onChange(value, filter);
  };

  const removeChoose = () => {
    setValue(undefined);
    onChange(undefined, filter);
  };

  return (
    <div className="filter__container">
      <div className="filter__header">
        <Tooltip title={title} arrow enterDelay={500}>
          <h2 className={"filter__title"}>
            {title.split(" ").length > maxWord
              ? title.split(" ").slice(0, maxWord).join(" ") + " ..."
              : title}
          </h2>
        </Tooltip>
        {value && (
          <Button className="filter__remove" onClick={removeChoose}>
            <ClearRoundedIcon />
          </Button>
        )}
      </div>

      <RadioGroup name={"filter"} className={"filter__choices"}>
        {choices.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Radio
                checked={value == index}
                value={index}
                onChange={handleChange}
                size="small"
              />
            }
            label={item}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default Filter;
