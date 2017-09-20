import React from 'react';
import StatusBar from './StatusBar';
import BoardContainer from '../containers/BoardContainer';
import Footer from './Footer';


const App = () => (
  <div className="Main">
    <StatusBar />
    <BoardContainer />
    <Footer />
  </div>
);


export default App;
