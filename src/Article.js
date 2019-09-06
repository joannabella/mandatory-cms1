import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './App.css';

function Article({ match }) {
  const [article, updateArticle] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/collections/get/Articles?filter[_id]=' + match.params.id)
      .then(response => {
        updateArticle(response.data.entries[0]);
      });
  }, []);

  if (!article) {
    return <></>;
  }

  return (
    <div className="container">
      <Helmet>
        <title>Article</title>
      </Helmet>
      <div className="article-container">
        <img className='article-img' src={article.image.path} alt=''></img>
        <h4 className='article-title'>{article.title}</h4>
        <ReactMarkdown source={article.body} className='article-body'></ReactMarkdown>
        <p className='article-published'>Published: {article.published_on}</p>
        <p className='article-author'>Author: {article.author.display}</p>
      </div>
    </div>
  );
}

export default Article;