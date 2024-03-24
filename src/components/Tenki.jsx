import { useEffect, useState } from "react";
import axios from "axios";
import {styled} from 'styled-components'
import { Spotify } from "./Spotify";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #fefefe;
  flex-shrink: 0;
  color: #3a455b;
  font-size: 30px;
  font-weight: bold;
`

export const Tenki = ({ tenki }) => {
  const componentName = () => tenkiList;
  const tenkiDate = () => date;
  const [tenkiList, settenkiList] = useState([]);
  const [date, settenkiDate] = useState([]);

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
      <Header>
        <div>{tenkiDate()}の天気は{componentName()}です。</div>
      </Header>
      <Spotify 
        tenki = { tenki = componentName()}
      />
    </>
  );
};
