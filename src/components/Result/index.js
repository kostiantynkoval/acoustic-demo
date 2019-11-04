import React, {useEffect} from 'react';

const Result = ({jsonValue, history}) => {
  
  useEffect(() => {
    console.log('HELLO')
    if(!jsonValue || !jsonValue.hasOwnProperty('name')) {
      history.push('/not-found')
    }
  });
  
  return (
    <div>{jsonValue.name} EEEEEEEEEEE</div>
  )
}

export default Result;