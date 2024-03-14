import styles from "@/styles/Home.module.css";
import { Button, Grid, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import RTL from "@/modules/RTL/RTL";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Router from "next/router";
import { useContext } from "react";
import timeContext from "@/context/context";

const data = [
  { text: "jQuery", value: 25 },
  { text: "MongoDB", value: 18 },
  { text: "JavaScript", value: 38 },
  { text: "React", value: 30 },
  { text: "Nodejs", value: 28 },
  { text: "Express.js", value: 25 },
  { text: "HTML5", value: 33 },
  { text: "CSS3", value: 20 },
  { text: "Webpack", value: 22 },
  { text: "Babel.js", value: 7 },
  { text: "ECMAScript", value: 25 },
  { text: "Jest", value: 15 },
  { text: "Mocha", value: 17 },
  { text: "React Native", value: 27 },
  { text: "Angular.js", value: 30 },
  { text: "TypeScript", value: 15 },
  { text: "Flow", value: 30 },
  { text: "Python", value: 110 },
  { text: "C++", value: 90 },
  { text: "C#", value: 99 },
  { text: "java", value: 110 },
  { text: "Ruby", value: 40 },
  { text: "ML", value: 11 },
  { text: "Prolog", value: 19 },
  { text: "F#", value: 20 },
  { text: "Postgere", value: 101 },
  { text: "Oracle", value: 90 },
  { text: "access", value: 90 },
  { text: "visual basic", value: 70 },
  { text: "asp.net", value: 40 },
  { text: "Unity", value: 70 },
  { text: "Assembly", value: 20 },
  { text: "AVL", value: 9 },
  { text: "reactNative", value: 70 },
  { text: "ALGORITHM", value: 140 },
  { text: "data structure", value: 70 },
  { text: "FlowChart", value: 90 },
  { text: "visual studio", value: 90 }
];

export default function Home() {
  const {time,setTime} = useContext(timeContext) 
  console.log('time2',time)
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const ReactWordcloud = dynamic(() => import("react-wordcloud"));
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 40],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 2000
  };

  const submitHandler = async (values) => {
    const userBody = {
      name: values.name,
      lastname: values.lastname,
      school: values.school,
      codeMelli: values.codeMelli,
      phoneNumber: values.phoneNumber
    };
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(res);
    if (res.status === 201) {
      Toast.fire({
        icon: "success",
        title: "کاربر جدید اضافه شد ...."
      });
      Router.push({ pathname: "/exam/1" });
      } else {
      Toast.fire({
        icon: "error",
        title: " مشکلی در ثبت اطلاعات رخ داده است ...."
      });
    }
  };

  return (
    <Grid container >

    <div className={styles.container} >
      <div className={styles.loginForm}  >
        <div className={styles.loginFormContainer} >
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              codeMelli: "",
              school: "",
              phoneNumber: ""
            }}
            validate={(values) => {
              const errors = {};
              if (values.name.length == 0) {
                errors.name = " نام کاربر الزامی است ...";
              } else if (values.name.length == 1) {
                errors.name = " نام کاربر حداقل باید دو حرف داشته باشد ...";
              }
              if (values.lastname.length == 0) {
                errors.lastname = " نام خانوادگی الزامی است ...";
              } else if (values.lastname.length == 1) {
                errors.lastname =
                  " نام خانوادگی حداقل باید دو حرف داشته باشد ...";
              }
              if (values.codeMelli.length == 0) {
                errors.codeMelli = " کد ملی الزامی است ...";
              } else if (values.codeMelli.length != 10) {
                errors.codeMelli = " کد ملی باید ده رقمی باشد ...";
              }
              if (values.phoneNumber.length == 0) {
                errors.phoneNumber = " شماره همراه الزامی است ...";
              } else if (values.phoneNumber.length != 11) {
                errors.phoneNumber = " شماره همراه باید یازده رقمی باشد ...";
              }
              return errors;
            }}
            onSubmit={(values) => {
              submitHandler(values);

              console.log("submitted ... ");
            }}
          >
            {({
              isSubmitting,
              submitForm,
              values,
              handleChange,
              handleBlur,
              errors,
              touched
            }) => (
              <>
                <Form className={styles.form}>
                  <RTL>
                    <Field component={TextField} name="name" label="نام" />
                  </RTL>

                  <RTL>
                    <Field
                      component={TextField}
                      label="نام خانوادگی"
                      name="lastname"
                    />
                  </RTL>
                  <RTL>
                    <Field
                      component={TextField}
                      label="کد ملی"
                      name="codeMelli"
                    />
                  </RTL>
                  <RTL>
                    <Field component={TextField} label="مدرسه" name="school" />
                  </RTL>
                  <RTL>
                    <Field
                      component={TextField}
                      type="text"
                      label="شماره تماس"
                      name="phoneNumber"
                    />
                  </RTL>

                  <Button
                    className={styles.btn}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    ورود به آزمون
                  </Button>
                </Form>
                {isSubmitting && <LinearProgress />}
              </>
            )}
          </Formik>
          <div className={styles.yellowCircle}></div>
          {/* <div className={styles.blueCircle}></div> */}

          <section className={styles.stage}>
            <figure className={`${styles.ball} ${styles.bubble}`}></figure>
          </section>
          <div className={styles.tag}>
            <ReactWordcloud words={data} options={options} />
          </div>
        </div>
      </div>
    </div>

    </Grid>
  );
}
