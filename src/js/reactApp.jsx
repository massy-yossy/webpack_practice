import React from 'react';
import { createRoot } from 'react-dom/client';

import './Alert.tsx'
import Alert from './Alert.tsx';

const App = () => {
  return (
    <>
      <div style={{ color: "#000", fontWeight: "bold" }}>
        Hellow react!!
      </div>
      <Alert message={"typescript start!"} />
    </>
  )
}

const reactRoot = document.getElementById('root');

if (reactRoot) {
  const root = createRoot(reactRoot)
  root.render(<App />)
} else {
  console.log('nono')
}

