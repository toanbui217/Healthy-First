import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Button from "@mui/material/Button";
import "./Filter.css";

const maxWord = 5;

function Filter({ title, criteria, onChange, filter }) {
  const [value, setValue] = useState(criteria[filter]);

  useEffect(() => {
    setValue(criteria[filter]);
  }, [criteria]);

  const handleChange = (e) => {
    var value = e.target.value == "true";
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
        {value != undefined && (
          <Button className="filter__remove" onClick={removeChoose}>
            <ClearRoundedIcon />
          </Button>
        )}
      </div>

      <RadioGroup name={"filter"} className={"filter__choices"}>
        <FormControlLabel
          control={
            <Radio
              checked={value == true}
              value={"true"}
              onChange={handleChange}
              size="small"
            />
          }
          label={<CheckRoundedIcon />}
          classes={{ label: "filter__ensure" }}
        />
        <FormControlLabel
          control={
            <Radio
              checked={value == false}
              value={"false"}
              onChange={handleChange}
              size="small"
            />
          }
          label={<ClearRoundedIcon />}
          classes={{ label: "filter__not-ensure" }}
        />
      </RadioGroup>
    </div>
  );
}

export default Filter;
