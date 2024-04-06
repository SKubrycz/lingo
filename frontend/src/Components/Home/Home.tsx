//import { useState, useEffect, useRef } from 'react';

import MainHome from './MainHome';
import NavHome from './NavHome';

import './Home.scss';

function Home() {
  return (
    <div className='home-wrapper'>
      <NavHome></NavHome>
      <MainHome></MainHome>
    </div>
  );
}

export default Home;
