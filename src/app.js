import React, { useState, useEffect } from "react";
import axios from "axios";
import "./bootstrap.min.css";
import Card from "./component/card";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setloading] = useState(true);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    getNews();
  }, []);

  //functions

  //1 get all top headlines
  const getNews =async () => {
    const p={ 
      sources:"bbc-news,the-hindu,google-news,google-news-in,the-times-of-india",
      q:query,
      pagesize:40,
    };
   await axios.get(
     `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines`,
      {
        
        headers: {
          "X-Api-Key":"0cc387f4b77f4ed88b4989e9d38b9c21"
        },
        params:p
      } )
      .then(artices=>{
      console.log(artices);
      setloading(false);
      setNews(artices.data.articles)
    })
    .catch(err=>{console.log(err)})
  };
  
  const getQuerynews=async (e)=>{
    e.preventDefault();
    const p={ 
      q:query,
      language:"en",
      apiKey:"0cc387f4b77f4ed88b4989e9d38b9c21"
    };
    await axios.get(
   `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything`,
   {
        crossDomain: true,
        params:p
      } )
    .then(artices=>{
      //console.log(artices)
      setNews(artices.data.articles)
      setQuery("")
    })
    .catch(err=>{console.log(err)})
  }


  return (<div>
    <div>
      <div className="d-flex  justify-content-around  p-3 align-content-center">
      <h3 className="text-center bg-success text-white p-1">News</h3>
      <form className="form d-flex justify-content-center align-content-center h-50" onSubmit={getQuerynews}>
      <input type="text" className="form-control" placeholder="Topic"  onChange={e=>setQuery(e.target.value)}/>
      <input type="submit" className="btn btn-primary " value="Search"/>
      </form>
      </div>
      
      
    {!loading?
      <div className="col-md-8 mx-auto">
      {news.map((article, index) => {
        return <Card key={index} article={article} />;
      })}
      </div>
    :
    <div>
      <h3 className="text-center">loading........</h3>
    </div>
        }
   </div>
    </div> 
    );

    };
    
    export default App;
    