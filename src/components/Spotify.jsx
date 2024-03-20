import { useEffect, useState } from "react";
import axios from "axios";

export const Spotify = (props) => {
  const componentName = () => playList;
  const componentImage = () => playListImage;
  const componentUrl = () => playListUrl;
  const [spotifyList, setspotify] = useState(null);
  const [playList, setplaylist] = useState(null);
  const [playListImage, setplaylistImage] = useState(null);
  const [playListUrl, setplaylistUrl] = useState(null);

  const params = {
    'grant_type': 'client_credentials',
    'client_id': `${process.env.REACT_APP_Client_ID}`,
    'client_secret': `${process.env.REACT_APP_Client_SECRET}`
  };

  useEffect(() => {
    axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then((response) =>
    setspotify(response.data.access_token)
  )}, []);

  useEffect(() => {
    axios.get('https://weather.tsukumijima.net/api/forecast/city/130010')
    .then((resp) => {
    axios.get("https://api.spotify.com/v1/search", {
    headers: {
      'Content-Type' : "application/json",
      'Authorization': `Bearer ${spotifyList}`
    },
    params: {
      q: `${resp.data.forecasts[1].telop}`,
      type: 'playlist',
      market: 'JP'
    }
  })
  .then((response) => {
    const res = response.data.playlists.items[0];
      setplaylist(res.name);
      setplaylistImage(res.images[0].url);
      setplaylistUrl(res.external_urls.spotify);
    });
  }, [])
});

  return (
    <>
      <div className="tenki-wrapper">
        明日の天気は{props.tenki}です。
      </div>
      <div className="test-wrapper">
      {props.tenki}におすすめプレイリストは...
      </div>
      <div>{componentName()}です。</div>
      <img src={componentImage()}></img>
      <a href={componentUrl()}>Spotifyでチェックする</a>
    </>
  );
};