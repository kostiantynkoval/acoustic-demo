import React from 'react';
import {NavLink} from "react-router-dom";
import './styles.css'

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>Nothing Found</h1>
      <NavLink to='/input'>Back to Form</NavLink>
    </div>
  );
};

export default NotFound;