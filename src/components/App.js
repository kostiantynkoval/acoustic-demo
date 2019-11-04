import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Input from './Input'
import Result from './Result'
import NotFound from './NotFound'
import './App.css'

const App = () => {
  const [jsonValue, setJsonValue] = useState({});
  const setJson = (jsonObj) => {
    setJsonValue(jsonObj)
  }
  
  useEffect(() => {
    document.body.classList.add('ParseJSON-body')
    return () => document.body.classList.remove('ParseJSON-body')
  }, [])
  
  useEffect(() => {
    console.log('jsonValue', jsonValue)
  }, [jsonValue])
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/input"/>}/>
        <Route path="/input" render={props => <Input {...props} onResponse={setJson} />}/>
        <Route path="/result" render={props => <Result {...props} jsonValue={jsonValue} />}/>
        <Route path="/not-found" component={NotFound}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )
}

export default App;