import './App.css';
import Colleges from './Components/Colleges';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseDetails from './Components/CourseDetails';
import Students from './Components/Students';
import StudentDetails from './Components/StudentDetails';
import TransactionDetails from './Components/TransactionDetails';
// import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Colleges />} />
          <Route path='/Courses' element={<CourseDetails />} />
          <Route path='/Students' element={<Students />}></Route>
          <Route path='/Student' element={<StudentDetails />}></Route>
          <Route path='/Transaction' element={<TransactionDetails />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
