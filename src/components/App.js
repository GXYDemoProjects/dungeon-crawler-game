import React from 'react';
import GithubCorner from 'react-github-corner';
import StatusContainer from '../containers/StatusContainer';
import BoardContainer from '../containers/BoardContainer';
import '../styles/App.css';

const App = () => (
  <div className="Main">
    <GithubCorner 
      href="https://github.com/GuoXiaoyang/DungeonCrawlerGame"
      bannerColor="#61ba74"
      octoColor="#272727"
    />
    <StatusContainer />
    <BoardContainer />
  </div>
);


export default App;
