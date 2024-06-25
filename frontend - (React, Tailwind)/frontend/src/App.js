import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Todo from './components/Todo';

function App() {
  return (
    <div className="h-screen antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
      <h1 class="text-center py-5 text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">TodoList</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
