import React, { useState } from 'react';
import './styles.css'

const apiUrlRegExpr = /^https:\/\/my12\.digitalexperience\.ibm\.com\/api\//

const Input = ({onResponse, history}) => {
  const [inputValue, setInputValue] = useState('https://my12.digitalexperience.ibm.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/fa9519d5-0363-4b8d-8e1f-627d802c08a8');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = () => {
    if(inputValue === '') {
      setErrorMessage('Please enter URL')
    } else if (apiUrlRegExpr.test(inputValue)) {
      setErrorMessage('')
      setIsLoading(true)
      fetch(inputValue)
        .then(res => res.json())
        .then(res => {
          console.log("res", res)
          if(!!res.errors && res.errors.length) {
            history.push('/not-found')
            alert('Fetching data is faled!' + res.message)
          }
          onResponse(res, inputValue);
          setIsLoading(false)
          history.push('/result')
        })
        .catch(err => {
          console.log("Error", err)
          history.push('/not-found')
          alert('Fetching data is faled!')
        })
    } else {
      setErrorMessage('Wrong URL')
    }
    
  }
  
  return isLoading ? (
    <div><h1>Loading...</h1></div>
  ) : (
    <div className='Input-wrapper'>
      <div className='Input-row-container'>
        <div className='Input-row'>
          <label>
            Enter URL:&nbsp;
          </label>
          <input
            placeholder="Please enter your URL here"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            type="text"
          />
        </div >
        <div className='Input-error-row'>
          <small style={{color: 'red'}}>{errorMessage}</small>
        </div>
      </div>
      <div className="Input-row-container">
        <button
          className="Submit-button"
          onClick={onSubmit}>Get Data</button>
      </div>
    </div>
  );
};

export default Input;