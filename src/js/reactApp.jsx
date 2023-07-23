import React from 'react';
import ReactDOM from 'react-dom';

import './Alert.tsx'
import Alert from './Alert.tsx';

const App = () => {
  return (
    <>
      <div style={{ color: "#000", backgroundColor: "red" }}>
        Hellow react!!
      </div>
      <Alert message={"typescript start!"} />
    </>
  )
}

const reactRoot = document.getElementById('root');

if (reactRoot) {
  ReactDOM.render(<App />, reactRoot);
} else {
  console.log('nono')
}

