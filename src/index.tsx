import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { usePromiseTracker } from 'react-promise-tracker';
import { MoonLoader } from "react-spinners";

const LoadingIndicator = () => {
   const { promiseInProgress } = usePromiseTracker();
   const override = `
      position: fixed;
      margin: -40px auto;
      left: 0;
      right: 0;
      top: 50%;
      z-index: 1000
    `;
   return (
     promiseInProgress ?
     <MoonLoader
      css={override}
      size={80}
      color={"black"}
    />
    : null);
   }
ReactDOM.render(
  <React.StrictMode>
    <LoadingIndicator />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
