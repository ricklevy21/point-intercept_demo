import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

//pages
import Home from './pages/Home/Home'
import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import ResumeProject from './pages/ResumeProject'
import RecordPage from './pages/RecordPage'
import ViewData from './pages/ViewData'
import NotFound from './pages/NotFound'
import About from './pages/About'
import AdditionalSpeciesPage from './pages/AdditionalSpecies'
import Edit from './pages/Edit'
import Sync from './pages/Sync'


//components
import Navbar from './components/Navbar/index'


//css
import './App.css'

function App() {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div className="spinner-grow" role="status"     style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
  }}> 
    <span className="sr-only">loading...</span>
  </div>
  }

  return (
    <Router>
      <Navbar/>
    <div className="container">
      <Switch>
      <Route exact path="/">
        {<Home
        className='home'

        />}
      </Route>
      <Route exact path="/projects">
        {<Projects />}
      </Route>
      <Route exact path="/create">
        {<CreateProject />}
      </Route>
      <Route exact path="/resume/:_id">
        {<ResumeProject />}
      </Route>
      <Route exact path="/edit/:_id">
        {<Edit />}
      </Route>
      <Route exact path="/record/:_id">
        {<RecordPage />}
      </Route>
      <Route exact path="/additional/:_id">
        {<AdditionalSpeciesPage />}
      </Route>
      <Route exact path="/data/:_id">
        {<ViewData />}
      </Route>
      <Route exact path="/about">
        {<About />}
      </Route>
      <Route exact path="/sync">
        {<Sync />}
      </Route>
      <Route path="/*">
        {<NotFound />}
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
