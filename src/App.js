import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './Home';
import Article from './Article';
import Authors from './Authors';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <nav className='nav'>
          <Link to='/' className='home-link'>Home</Link>
          <Link to='/authors' className='authors-link'>Authors</Link>
        </nav>
        <Route exact path='/' component={Home} />
        <Route path='/article/:id' component={Article} />
        <Route path='/authors' component={Authors} />
      </div>
    </Router>
  );
}

export default App;
