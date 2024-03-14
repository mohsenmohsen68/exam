import React from "react";

export default function index(props) {
  console.log(props.query.score);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{
        display: "flex",
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <h2 style={{ color: "black" }}>
          {" "}
          شما به {props.query.score} سوال پاسخ صحیح دادید ....
        </h2>
        <h2 style={{ color: "black" }}>
          {" "}
          از اینکه در این آزمون شرکت کردید متشکریم ...{" "}
        </h2>
      </div>
    </div>
  );
}

export const getServerSideProps = async (params) => {
  console.log(params.query);

  return {
    props: {
      query: params.query
    }
  };
};
