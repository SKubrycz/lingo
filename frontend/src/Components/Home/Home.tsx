//import { useState, useEffect, useRef } from 'react';

import NavHome from './NavHome';
import MainHome from './MainHome';

import './Home.scss';

function Home() {
  
  return (
    <div className='wrapper'>
      <NavHome></NavHome>
      <MainHome></MainHome>
    </div>
  );
}

export default Home;
