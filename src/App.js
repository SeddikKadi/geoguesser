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
import {Navigate} from "react-router-dom";

import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import Login from "./Login";
import Signin from "./Signin";
import ProtectedRoutes from "./ProtectedRoute";
import Intro from "./intro";
import AddMap from "./AddMap"
import Button from '@mui/material/Button';

function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>

              <Route element={<ProtectedRoutes/>}>
                  <Route path="/" exact element={<Welcome />} />
                  <Route path="/newgame/:map/:gameid/:time/:roundid/:usergameid" element={<Game />} />
                  <Route path="/gameparameter/:map" element={<GameParameters />} />
                  <Route path="/result/:map/:gameid/:time/:roundid" element={<Result />} />
                  <Route path="/breakdown" element={<Breakdown />} />
             </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/addmap" exact element={<AddMap/>} />
              <Route
                  path="*"
                  element={<Navigate to="/" />}
              />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
