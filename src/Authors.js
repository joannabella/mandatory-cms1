import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './App.css';

function createList(author) {

  return (
    <li key={author._id} className='author'>
      <p className='author-name'>{author.name}</p>
      <div className='img-container'>
        <img className='author-img' src={author.avatar.path} alt=''></img>
      </div>
      <p className='biography-title'>Biography</p>
      <p className='author-body'>{author.description}</p>
    </li>
  );
}

function Authors() {
  const [authors, updateAuthor] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/collections/get/Authors')
      .then(response => {
        updateAuthor(response.data.entries);
      });
  }, []);

  return (
    <div className="authors-container">
      <Helmet>
        <title>Authors</title>
      </Helmet>
      <ul className='authors'>
        {authors.map(author => {
          return createList(author);
        })}
      </ul>
    </div>
  );
}

export default Authors;