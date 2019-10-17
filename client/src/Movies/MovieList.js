import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieForm from "./MovieForm";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   movies: []
    // };
  }

  
  // componentDidMount() {
  //   axios
  //   .get("http://localhost:5000/api/movies")
  //   .then(res => this.setState({ movies: res.data }))
  //   .catch(err => console.log(err.response));
  // }
  
  render() {
    console.log("props from app ", this.props.moviesList);
    return (
      <div className="movie-list">
        {this.props.moviesList.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (<>
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  </>);
}
