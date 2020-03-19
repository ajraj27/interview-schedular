import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import FormComponent from '../src/components/FormComponent/FormComponent';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
                <Route exact path="/" component={FormComponent} />
        </div>
    </BrowserRouter>
    
  );
}

export default App;
