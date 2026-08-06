import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LibraryPage from './pages/sample/LibraryPage';
import ButtonPage from './pages/material/ButtonPage';
import CommentPage from './pages/sample/CommentPage';
import CapacityPage from './pages/reactive/CapacityPage';
import EventPage from './pages/event/EventPage';
import TestRouterApp from './TestRouterApp';
import RenderingPage from './pages/rendering/RenderingPage';
import ToyApp from './ToyApp';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <LibraryPage />
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <ButtonPage/>
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <CommentPage/>
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <CapacityPage/>
// );


// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <EventPage/>
// );

//router
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <TestRouterApp/>
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <RenderingPage/>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ToyApp/>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
