import React from 'react';
import GithubCorner from 'react-github-corner';
import StatusBar from './StatusBar';
import Board from './Board';
import '../styles/App.css';

const App = (props) => {

  const { map, player, game, restartGame, toggleDarkness } = props;
  return (
    <div className="Main">
      <GithubCorner 
        href="https://github.com/GuoXiaoyang/DungeonCrawlerGame"
        bannerColor="#61ba74"
        octoColor="#272727"
      />
      <StatusBar player={player} game={game}  restartGame={restartGame} toggleDarkness={toggleDarkness} />
      <Board map={map}/>
    </div>
  );
};


export default App;
