import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router/index.tsx';

function App() {
  return (
    <RouterProvider router={routerConfig}></RouterProvider>
  )
}

export default App;