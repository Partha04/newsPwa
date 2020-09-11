import React from 'react';

const Card=({article})=>{
   // console.log(article)
    return (
        <div className="card bg-light mb-3">
        <img src={article.urlToImage} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{article.title} </h5>
          <p className="card-text">{article.description}</p>
          <p className="card-text"><small className="text-muted">{article.author}--{article.publishedAt}</small></p>

        </div>
      </div>
    )
}

export default Card;