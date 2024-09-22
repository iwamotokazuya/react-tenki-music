import { useEffect, useState } from "react";
import axios from "axios";
import {styled} from 'styled-components'

const Content = styled.div`
  width: 400px;
  align-items: center;
  justify-content: center;
  padding: 150px 16px;
  margin-left: 10%;
  flex-shrink: 0;
  color: #5f91dd;
  font-size: 40px;
  font-weight: bold;
  display: inline-block;
  position:absolute;
  z-index: 30;
`

const Playlist = styled.div`
padding-top: 20px;
  color: #AB61E5;
  font-size: 40px;
  font-weight: bold;
  z-index: 30;
`

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
    axios.get("https://api.spotify.com/v1/search", {
    headers: {
      'Content-Type' : "application/json",
      'Authorization': `Bearer ${spotifyList}`
    },
    params: {
      q: `#{props.tenki}`,
      type: 'playlist',
      market: 'JP'
    }
  })
  .then((response) => {
    const res = response.data.playlists.items[1];
      setplaylist(res.name);
      setplaylistImage(res.images[0].url);
      setplaylistUrl(res.external_urls.spotify);
    });
  }, []);

  return (
    <>
      <Content>
        <div>
          {props.tenki}に聴きたい
        </div>
        <div>
          プレイリスト名
        </div>
        <Playlist>&nbsp;&nbsp;&nbsp;{componentName()}</Playlist>
      </Content>
      <img className="image" src={componentImage()}></img>
      <a className="link" href={componentUrl()}>Spotifyでチェックする</a>
    </>
  );
};