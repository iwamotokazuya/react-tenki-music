import './App.css';
import { Tenki } from './components/Tenki';
import { createGlobalStyle } from 'styled-components'


const BackgroundStyle = createGlobalStyle`
  html, body, #app {
    height: 100%;
    background-color: #F5FFFD;
  }
  body {
     /* https://css-tricks.com/snippets/css/system-font-stack/ */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

    overflow-wrap: break-word;
  }
`

function App() {
  return (
    <>
      <BackgroundStyle />
      <Tenki />
    </>
  );
}

export default App;
