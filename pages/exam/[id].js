import { useContext } from "react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import styles from "./exam.module.css";
import questions from "@/utils/questions";
import Radio from "@mui/material/Radio";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import timeContext from "@/context/context";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function index(props) {
  const { time, setTime } = useContext(timeContext);
  const rout = useRouter();
  const questionNumber = props.QuestionItem.number;
  const examAnswer = props.examAnswers;
  const [prevBtnDisable, setPrevBtnDisable] = useState(true);
  const [nextBtnDisable, setNextBtnDisable] = useState(false);
  const [value, setValue] = useState("");
  const [remainTime, setRemainTime] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [showFinishBtn, setShowFinishBtn] = useState(false);
  console.log("qqq", props.examAnswers);
  console.log("qqq", answers);
  const [play, setPlay] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [key, setKey] = useState(0);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  console.log("ppp", play);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     // Custom logic to handle the refresh
  //     // Display a confirmation message or perform necessary actions
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  useEffect(() => {
    if (questionNumber === 1) {
      setPrevBtnDisable(true);
    } else {
      setPrevBtnDisable(false);
    }
    if (questionNumber === 10) {
      setNextBtnDisable(true);
    } else {
      setNextBtnDisable(false);
    }
    setKey((prev) => prev + 1);
  }, [questionNumber]);

  const prevHandler = async () => {
    const newTime = time.map((item, index) => {
      if (index + 1 === questionNumber) {
        return remainTime;
      } else {
        return item;
      }
    });
    setTime(newTime);

    const newCountDown = play.map((item, index) => {
      if (index + 1 === questionNumber - 1) {
        return true;
      } else {
        return false;
      }
    });
    setPlay(newCountDown);

    Router.replace({ pathname: `/exam/${questionNumber - 1}` });
  };

  const examHandler = async () => {
    console.log("bnbnbnbn", answers.length);
    console.log("klknbn", examAnswer);
    let c = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] == String(examAnswer[i])) {
        c = c + 1;
        console.log("hi");
      }
    }

    Router.replace({ pathname: "/score", query: { score: c } });
  };
  const submitHandler = () => {
    setShowFinishBtn(true);
    const newAnswers = answers.map((item, index) => {
      if (index + 1 === questionNumber) {
        return value;
      } else {
        return item;
      }
    });
    setAnswers(newAnswers);

    if (questionNumber === 10) {
    } else {
      nextHandler();
    }
    setValue("");
  };

  const nextHandler = async () => {
    const newTime = time.map((item, index) => {
      if (index + 1 === questionNumber) {
        return remainTime;
      } else {
        return item;
      }
    });
    setTime(newTime);

    const newCountDown = play.map((item, index) => {
      if (index + 1 === questionNumber + 1) {
        return true;
      } else {
        return false;
      }
    });
    setPlay(newCountDown);
    Router.replace({ pathname: `/exam/${questionNumber + 1}` });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.questionBox}>
        <div style={{ width: "100%" }}>
          <div className={styles.header}>
            <div className={styles.qNumber}>
              <p className={styles.p}> {props.QuestionItem.number} </p>
            </div>
            <div style={{ display: "flex", color: "black" }}>
              <CountdownCircleTimer
                key={key}
                isPlaying={play[questionNumber - 1]}
                duration={time[questionNumber - 1]}
                // initialRemainingTime={time[questionNumber-1]}
                colors={["#38b000", "#ffba08", "#f26419", "#d00000"]}
                colorsTime={[20, 9, 5, 0]}
                size={70}
                strokeWidth={4}
                onComplete={() => {
                  setDisabledSubmit(true);
                }}
              >
                {({ remainingTime }) => {
                  setRemainTime(remainingTime);
                  remainingTime > 0
                    ? setDisabledSubmit(false)
                    : setDisabledSubmit(true);
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <p className={styles.p}>{remainingTime}</p>
                      <p className={styles.p}> ثانیه </p>
                    </div>
                  );
                }}
              </CountdownCircleTimer>
            </div>
          </div>

          <FormControl style={{ width: "100%" }}>
            <div className={styles.question}>
              <p style={{ marginRight: "20px" }}>
                {props.QuestionItem.question}
              </p>
            </div>
            <RadioGroup
              value={value}
              onChange={handleChange}
              style={{ color: "black" }}
            >
              <div className={styles.answerContainer}>
                <Box >
                  <Grid container >
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        className={styles.options}
                        value={props.QuestionItem.answers[0].answer}
                        control={<Radio />}
                        label={props.QuestionItem.answers[0].answer}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        className={styles.options}
                        value={props.QuestionItem.answers[1].answer}
                        control={<Radio />}
                        label={props.QuestionItem.answers[1].answer}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>

              <div className={styles.answerContainer}>
              <Box >
                  <Grid container >
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        className={styles.options}
                        value={props.QuestionItem.answers[2].answer}
                        control={<Radio />}
                        label={props.QuestionItem.answers[2].answer}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        className={styles.options}
                        value={props.QuestionItem.answers[3].answer}
                        control={<Radio />}
                        label={props.QuestionItem.answers[3].answer}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </RadioGroup>
          </FormControl>
        </div>

        <div style={{ display: "flex" }}>
          <Tippy content={<span> سوال قبلی </span>}>
            <Button
              className={styles.btn}
              variant="contained"
              disabled={prevBtnDisable}
              onClick={prevHandler}
            >
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </Tippy>
          <Tippy content={<span> ثبت پاسخ </span>}>
            <Button
              className={styles.btn}
              variant="contained"
              disabled={disabledSubmit}
              onClick={submitHandler}
            >
              <FileDownloadDoneIcon />
            </Button>
          </Tippy>
          <Tippy content={<span> سوال بعد </span>}>
            <Button
              className={styles.btn}
              variant="contained"
              disabled={nextBtnDisable}
              onClick={nextHandler}
            >
              <KeyboardDoubleArrowLeftIcon />
            </Button>
          </Tippy>
        </div>
      </div>
      {showFinishBtn && (
        <Tippy
          content={<span> با فشردن این دکمه آزمون به اتمام می‌رسد ... </span>}
        >
          <Button
            variant="contained"
            data-tippy-content="hello"
            className={styles.submitBtn}
            onClick={examHandler}
          >
            اتمام آزمون
          </Button>
        </Tippy>
      )}{" "}
    </div>
  );
}

export const getServerSideProps = async (params) => {
  // console.log(params)
  const questionNumber = params.query.id;
  const QuestionItem = questions[questionNumber - 1];
  const examAnswers = questions.map((item) => {
    const ans = item.answers.find((ans) => ans.validation === true);
    return ans.answer;
  });
  return {
    props: {
      QuestionItem,
      examAnswers
    }
  };
};
