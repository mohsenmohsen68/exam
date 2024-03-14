import "@/styles/globals.css";
import timeContext from "@/context/context";
import questions from "@/utils/questions";
import { useState } from "react";



export default function App({ Component, pageProps }) {
  const [time, setTime] = useState(
    questions.map((item) => item.secsNeededToAnswer)
  );
  
    return (
    <timeContext.Provider  value={{time, setTime}}>
      <Component {...pageProps}/>
      </timeContext.Provider>
      )
 
}
