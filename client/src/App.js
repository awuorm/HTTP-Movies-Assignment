import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
import AddMovie from "./Movies/AddMovies";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [editedMovie, setEditedMovie] = useState({id:"",title:"", director:"",  metascore:""});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMoviesList(res.data ))
      .catch(err => console.log(err.response));
  },[moviesList]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => <MovieList moviesList={moviesList} {...props}/>} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}/>
        <Route  path={`/update-movie/:id`} 
    render={(props) => <MovieForm editedMovie={editedMovie} setEditedMovie={setEditedMovie} {...props}/> }/>
      <Route  path={`/add-movie`} 
    render={(props) => <AddMovie editedMovie={editedMovie} setEditedMovie={setEditedMovie} {...props}/> }/>
      </>
      
  );
};

export default App;
