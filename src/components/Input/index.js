import React, { useState } from 'react';
const apiUrlRegExpr = /^https:\/\/my12\.digitalexperience\.ibm\.com\/api\//

const Input = ({onResponse, history}) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const onSubmit = () => {
    if(inputValue === '') {
      setErrorMessage('Please enter URL')
    } else if (apiUrlRegExpr.test(inputValue)) {
      setErrorMessage('')
      fetch(inputValue)
        .then(res => res.json())
        .then(res => {
          onResponse(res);
          history.push('/result')
        })
        .catch(err => history.push('/not-found'))
    } else {
      setErrorMessage('Wrong URL')
    }
    
  }
  
  return (
    <div>
      <div>
        <label>
          Enter URL:&nbsp;
          <input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text"/>
          <button onClick={onSubmit}>Get Data</button>
        </label>
      </div>
      <div>
        <small style={{color: 'red'}}>{errorMessage}</small>
      </div>
    </div>
  );
};

export default Input;