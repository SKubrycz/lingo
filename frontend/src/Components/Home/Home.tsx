//import { useState, useEffect, useRef } from 'react';

import Navbar from '../Reusables/Navbar/Navbar';
import MainHome from './MainHome';

import './Home.scss';

function Home() {

  const linkArray: string[] = ['/about', '/login', '/register'];
  const optionsArray: string[] = ['O aplikacji', 'Logowanie', 'Rejestracja'];
  
  return (
    <div className='wrapper'>
      <Navbar link={linkArray} options={optionsArray}></Navbar>
      <MainHome></MainHome>
    </div>
  );
}

export default Home;
