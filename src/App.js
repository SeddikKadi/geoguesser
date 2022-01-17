import './App.css';

import React,{useState,useEffect,Fragment} from 'react';
import Map from "./mapsComponent"
import randomStreetView from "./randomStreetView/RandomStreetView"
import StreetViewComponent from './streetView';
import Welcome from './Welcome';
import Game from './Game';
import axios from 'axios';
import Result from './Result';
import GameParameters from "./gameParameters";
import Breakdown from "./Breakdown"

import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Welcome />} />
            <Route path="/newgame/:map/:gameid/:time/:roundid/:usergameid" element={<Game />} />
              <Route path="/gameparameter/:map/:gameid" element={<GameParameters />} />
            <Route path="/result/:map/:gameid/:time/:roundid" element={<Result />} />
              <Route path="/breakdown" element={<Breakdown />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
