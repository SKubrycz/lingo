//import { useState, useEffect, useRef } from 'react';

import Navbar from '../Reusables/Navbar/Navbar';
import MainHome from './MainHome';
import Footer from '../Reusables/Footer/Footer';

import './Home.scss';

function Home() {

  const linkArray: string[] = ['/about', '/login', '/register'];
  const optionsArray: string[] = ['O aplikacji', 'Logowanie', 'Rejestracja'];

  const footerLinkArray: string[] = ['/about', '/login', '/register'];
  const footerOptionsArray: string[] = ['O aplikacji', 'Logowanie', 'Rejestracja'];
  
  return (
    <div className='wrapper'>
      <Navbar link={linkArray} options={optionsArray}></Navbar>
      <MainHome></MainHome>
      <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
    </div>
  );
}

export default Home;
