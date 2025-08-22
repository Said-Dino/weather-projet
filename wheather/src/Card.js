// images
import a from "./a.png";
// images


// hooks and customHooks
import { useContext, useState, useReducer } from "react";
import { useTheme, themme } from "./CustomState";
import { weatherContextState, corddContext, dateContext} from "./Context/WeatherContext";
import { languageContext } from "./Context/WeatherContext";
import { useCustomEffectAxios } from "./EffectHook";
import { useLanguagehook, useSetTime } from "./EffectHook";
import lanReducer from "./Reducers/WeatherReducer";
// hooks and customHooks


// externel library
import moment from 'moment'
import "moment/min/locales";
import { t } from "i18next";
import WindPowerIcon from "@mui/icons-material/WindPower";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import SunnyIcon from "@mui/icons-material/Sunny";
import Button from "@mui/material/Button";
// externel library


export default function Card() {
  

  //change language language for text (using i18next library) and timeLanguage (using momentjs library) fort time and useReducer
  // const [lan, dispatch] = useReducer(lanReducer, {langue:"ar",timelanguage:"ar-dz",arabe:true});
  const {lan, dispatch} = useContext(languageContext);
  
  useLanguagehook(lan.langue);      // to change text language usinge i18n.changeLanguage(language) in EEfectHook.js
  //change language lan for text (using i18next library) and timeLanguage (using momentjs library) fort time

  // states of request weather api
  const {dateTime, setDateTime} = useContext(dateContext);   // time state from weather api
  const {weatherState} = useContext(weatherContextState);    // weather state from weather api
  const {setCord} = useContext(corddContext);                // GPS coordinates (latitude & longitude) from weather api
  // states of request weather api

  // custom Theme which useTheme is a custom useHook
  const [colorTheme, setColorTheme] = useTheme();
  // custom Theme which useTheme is a custom useHook

  
  // custom useEffect hook -request to weather api using axios library - 
  useCustomEffectAxios();
  // custom useEffect hook -request to weather api using axios library - 



  // custom useEfect hook for setting time
  useSetTime();
  // custom useEfect hook for setting time



  const Temp = Math.round(weatherState.temp - 273.15);
  const Wilaya = weatherState.wilaya;
  const Min = Math.round(weatherState.min - 273.15);
  const Max = Math.round(weatherState.max - 273.15);
  const Humidity = weatherState.hum;
  const windSpeed = Math.round(weatherState.Wind * 3.6);
  const Desc = weatherState.desc;
  const yes = new Date(weatherState.rise * 1000);
  const yees = new Date(weatherState.set * 1000);
  const vraiDate = yes.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const vraiset = yees.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // handler functions
  function handleOranMeteo() {
    setCord({ lt: 35.7, lg: -0.64 });
  }
  function handleTlemcenMeteo() {
    setCord({ lt: 34.89, lg: -1.32 });
  }
  function handleTemouchentMeteo() {
    setCord({ lt: 35.3, lg: -1.14 });
  }
  function handleBelabbesMeteo() {
    setCord({ lt: 35.26, lg: -0.56 });
  }
  function handlePrimary() {
    setColorTheme("primary");
  }
  function handleSecondary() {
    setColorTheme("secondary");
  }
  
  function handleLanguage(){
    dispatch({type:"langue"})
  }
  // handler functions


  
  return (
    <div style={{ height: "100%", background: themme.palette[colorTheme].bdy }}>
    <h1>wlecome to dino</h1>
      <div style={{ marginBottom: "-20px"}}>
        <Button
          style={{ marginBottom: "50px" }}
          variant="contained"
          color="secondary"
          onClick={handleSecondary}
        >
          {t("pink mode")}
        </Button>
        <img
          src={a}
          style={{ width: "300px", marginBottom: "-20px", marginTop: "-30px" }}
          alt="cloud"
        />
        <Button
          style={{ marginBottom: "50px" }}
          variant="contained"
          color="primary"
          onClick={handlePrimary}
        >
          {t("blue mode")}
        </Button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Button
          style={{ marginBottom: "1px", marginRight: "5px" }}
          variant="contained"
          onClick={handleTemouchentMeteo}
          color={colorTheme}
        >
          {t("Aïn Temouchent")}
        </Button>
        <Button
          style={{ margin: "5px" }}
          variant="contained"
          onClick={handleOranMeteo}
          color={colorTheme}
        >
          {t("Oran")}
        </Button>
        <Button
          style={{ margin: "5px" }}
          variant="contained"
          onClick={handleTlemcenMeteo}
          color={colorTheme}
        >
          {t("Tlemcen")}
        </Button>
        <Button
          style={{ margin: "5px" }}
          variant="contained"
          onClick={handleBelabbesMeteo}
          color={colorTheme}
        >
          {t("Sidi Bel Abbes")}
        </Button>
      </div>
      <div
        style={{
          width: "800px",
          height: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            background: themme.palette[colorTheme].light,
            width: "70%",
            margin: "auto",
            borderRadius: "10px",
            maxHeight: "300px",
            boxShadow: `10px 30px 20px ${themme.palette[colorTheme].shdw}`
          }}
        >
          {/* riyad + time */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
              direction: lan.arabe? 'rtl' : 'ltr',
            }}
          >
            <h1 style={{ marginLeft: lan.arabe? "0px" : "20px", marginRight: lan.arabe? "20px" : "0px" }}>{Wilaya ? t(Wilaya) : ""}</h1>
            <h4 style={{ marginLeft: lan.arabe? "20px" : "0px", marginRight: lan.arabe? "0px" : "20px" }}>{dateTime}</h4>
          </div>
          {/* ///////////////////////////////////////////////////////// */}
          <hr></hr>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "white",
              direction:lan.arabe? 'rtl' : 'ltr',
            }}
          >
            <div style={{ marginLeft: lan.arabe? "0px" : "50px", marginRight: lan.arabe? "50px" : "0px" }}>
              <h3>{t(Desc)}</h3>
              <img
                style={{ marginTop: "-20px" }}
                src={`https://openweathermap.org/img/wn/${weatherState.icoon}@2x.png`}
                alt="iiccon"
              />
            </div>

            <div style={{ marginLeft: lan.arabe? "50px" : "0px", marginRight: lan.arabe? "0px" : "50px" }}>
              <h1>
                <DeviceThermostatIcon /> {Temp}º
              </h1>
              <h3>
                {t("min")} {Min} | {t("max")} {Max}
              </h3>
            </div>
          </div>

          <div
            style={{
              borderRadius: "8px",
              background: themme.palette[colorTheme].dark,
              display: "flex",
              color: "white",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <SunnyIcon style={{ color: "yellow", marginRight: "5px" }} />{" "}
              {vraiDate}
            </h3>
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <WbTwilightIcon style={{ color: "yellow", marginRight: "5px" }} />{" "}
              {vraiset}
            </h3>
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <WaterDropIcon style={{ marginRight: "3px" }} /> {Humidity}%
            </h3>
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <WindPowerIcon style={{ marginRight: "5px" }} /> {windSpeed} {t("km")}
            </h3>
            <Button
          dir="rtl"
          variant="contained"
          color= {colorTheme}
          onClick={handleLanguage}
        >
          {t("Arabic")}
        </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
