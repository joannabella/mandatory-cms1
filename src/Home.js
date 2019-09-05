import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './App.css';

function createList(article) {

  return (
    <Link to={'/article/' + article._id} key={article._id}>
      <li className='article'>
        <img src={article.image.path} className='home-img'></img>
        <h4 className='home-title'>{article.title}</h4>
        <p className='home-body'>{article.body}</p>
        <p className='home-published'>Published: {article.published_on}</p>
        <p className='home-author'>Author: {article.author.display}</p>
      </li>
    </Link>
  );
}

function Home() {
  const [articles, updateArticles] = useState([]);
  const [total, updateTotal] = useState(0);
  const [skip, updateSkip] = useState(0);

  function increaseSkip() {
    if (skip === total - 3) {
      updateSkip(0);
    }
    else {
      updateSkip(skip + 3);
    }
  }

  function decreaseSkip() {
    if (skip === 0) {
      updateSkip(total - 3);
    }
    else {
      updateSkip(skip - 3);
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/collections/get/Articles?limit=3&skip=' + skip)
      .then(response => {
        updateArticles(response.data.entries);
        updateTotal(response.data.total);
      });
  }, [skip]);

  return (
    <div className='Home'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <header className='header'>
        <img src='https://www.linuxfoundation.org/wp-content/uploads/2016/12/lf_background_trees.jpg' className='header-pic'></img>
      </header>
      <section className='main-section'>
        <ul className='articles'>
          {articles.map(article => {
            return createList(article);
          })}
        </ul>
        <button className='backward' onClick={() => decreaseSkip()}><i className="fas fa-chevron-left"></i></button>
        <button className='forward' onClick={() => increaseSkip()}><i className="fas fa-chevron-right"></i></button>
      </section>
    </div>
  );
}

export default Home;
