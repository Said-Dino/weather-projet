import { useEffect, useContext, useState } from "react";
import axios from "axios";
import {corddContext, weatherContextState,dateContext , languageContext} from "./Context/WeatherContext";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import 'moment/locale/ar-dz';


export const useCustomEffectAxios = () => {
  const { setWheatherState } = useContext(weatherContextState);
  const { cord } = useContext(corddContext);
  let cancelAxios = null;  
  useEffect(() => {
    
    if (cord.lt && cord.lg) {
      cancelAxios = null; // Réinitialiser

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cord.lt}&lon=${cord.lg}&appid=bb1b2d37b81861e17815fbb175ef8f0d`,
          {
            cancelToken: new axios.CancelToken((c) => {
              cancelAxios = c;
            }),
          }
        )
        .then((response) => {
          setWheatherState({
            temp: response.data.main.temp,
            min: response.data.main.temp_min,
            max: response.data.main.temp_max,
            desc: response.data.weather[0].description,
            rise: response.data.sys.sunrise,
            set: response.data.sys.sunset,
            icoon: response.data.weather[0].icon,
            hum: response.data.main.humidity,
            Wind: response.data.wind.speed,
            wilaya: response.data.name,
          });
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log(error);
          }
        });
    }

    return () => {
        // console.log("canceling with token")
      if (cancelAxios) cancelAxios();
    };
  }, [cord]);
};



export const useLanguagehook = (language)=>{
  const { t, i18n } = useTranslation();
  useEffect(()=>{
      i18n.changeLanguage(language)
  },[language]
  )
}

export const useSetTime = ()=>{
  const {lan} = useContext(languageContext);
  const {dateTime, setDateTime} = useContext(dateContext);
  useEffect(() => {
  const interval = setInterval(() => {
     moment.locale(lan.timelanguage);
    setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
  }, 1000);
  return () => clearInterval(interval) // ⏹️ Nettoyage si démontage
}, [dateTime, lan.timelanguage]);
}