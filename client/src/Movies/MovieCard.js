import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";

const MovieCard = props => {
  const { title, director, metascore, stars,id } = props.movie;
  
  
  const deleteMovie = (e) => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
console.log("response from server,deleted", res);
          // setEditedMovie(res.data);
          props.history.push("/");
    })
    .catch(err => console.log(err.response));
}
  
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <NavLink to={`/update-movie/${id}`}>Edit Movie</NavLink>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
};

export default MovieCard;
