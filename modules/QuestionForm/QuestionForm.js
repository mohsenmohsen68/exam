import React, { useState } from "react";
import UserModel from "@/models/userData";
import styles from "./exam.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import questions from "@/utils/questions";

export default function QuestionForm(props) {
  const QuestionItem = questions.find((item) => item.number === props.QNumber);
  console.log(questions)
  const [time, setTime] = useState(props.Qtime);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [value, setValue] = React.useState(QuestionItem.answers[0].answer);

  return (
    <div className={styles.body}>
      <p className={styles.p}> {QuestionItem.number} </p>
      <div style={{display:'flex',color:'black'}}>
        <CountdownCircleTimer
          isPlaying
          duration={props.Qtime}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          {QuestionItem.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          style={{ color: "black" }}
        >
          <FormControlLabel
            value={QuestionItem.answers[0].answer}
            control={<Radio />}
            label={QuestionItem.answers[0].answer}
          />
          <FormControlLabel
            value={QuestionItem.answers[1].answer}
            control={<Radio />}
            label={QuestionItem.answers[1].answer}
          />
          <FormControlLabel
            value={QuestionItem.answers[2].answer}
            control={<Radio />}
            label={QuestionItem.answers[2].answer}
          />
          <FormControlLabel
            value={QuestionItem.answers[3].answer}
            control={<Radio />}
            label={QuestionItem.answers[3].answer}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
