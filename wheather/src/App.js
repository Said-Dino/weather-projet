import "./App.css";
import { useState, useReducer } from "react";
import Card from "./Card";
import { TmPvd } from "./CustomState";
import { weatherContextState, corddContext,dateContext } from "./Context/WeatherContext";
import lanReducer from "./Reducers/WeatherReducer";
import { languageContext } from "./Context/WeatherContext";

function App() {
  // console.log("rendring temperature")
  
  const [dateTime,setDateTime] = useState("");
  const [lan, dispatch] = useReducer(lanReducer, {langue:"ar",timelanguage:"ar-dz",arabe:true});
  const [cord, setCord] = useState({ lt:  53.408, lg: -2.991 });
  const [weatherState, setWheatherState] = useState({
    temp: null,
    min: null,
    max: null,
    desc: "",
    rise: null,
    set: null,
    icoon: null,
    pres: null,
    Wind: null,
    wilaya: null,
  });

  return (
    <TmPvd>
      <weatherContextState.Provider value={{ weatherState, setWheatherState }}>
        <corddContext.Provider value={{ cord, setCord }}>
          <dateContext.Provider value={{dateTime,setDateTime}}>
          <languageContext.Provider value={{lan,dispatch}}>
          <div className="App">
            <Card />
          </div>
         </languageContext.Provider>
          </dateContext.Provider>
        </corddContext.Provider>
      </weatherContextState.Provider>
    </TmPvd>
  );
}

export default App;
