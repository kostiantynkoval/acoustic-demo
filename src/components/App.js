import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
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
    console.log('jsonValue', jsonValue)
  }, [jsonValue])
  
  return (
    <Router>
      <Route path="/" exact render={() => <Redirect to="/input"/>}/>
      <Route path="/input" render={props => <Input {...props} onResponse={setJson} />}/>
      <Route path="/result" render={props => <Result {...props} jsonValue={jsonValue} />}/>
      <Route path="/not-found" component={NotFound}/>
      <Redirect from='*' to='/not-found' />
    </Router>
  )
}

export default App;