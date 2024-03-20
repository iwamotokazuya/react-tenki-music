import { useEffect, useState } from "react";
import axios from "axios";
import { Spotify } from "./Spotify";

export const Tenki = ({ tenki }) => {
  const componentName = () => tenkiList;
  const tenkiDate = () => date;
  const [tenkiList, settenkiList] = useState(null);
  const [date, settenkiDate] = useState(null);

  useEffect(() => { axios.get('https://weather.tsukumijima.net/api/forecast/city/130010')
  .then((response) => {
    settenkiList(response.data.forecasts[1].telop);
    const date = changeDate(response.data.forecasts[1].date);
    settenkiDate(date);
    });
  }, [])

  function changeDate(date) {
    const tomorrow = date.replace(/(\d\d\d\d)-(\d\d)-(\d\d)/g,'$2/$3');
    return tomorrow;
  }
  return (
    <>
      <div>{tenkiDate()}の天気は{componentName()}です。</div>
        <Spotify 
          tenki = { tenki = componentName()}
        />
    </>
  );
};
