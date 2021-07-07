import React, { useEffect } from "react";
import axios from "axios";

const MovieForm = props => {
  const { editedMovie, setEditedMovie } = props;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setEditedMovie(res.data);
      })
      .catch(err => console.log(err.response));
  }, [props.match.params.id, setEditedMovie]);

  const valuechange = e => {
    setEditedMovie({ ...editedMovie, [e.target.name]: e.target.value });
  };

  const submitMovie = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, {
        id: editedMovie.id,
        title: editedMovie.title,
        director: editedMovie.director,
        metascore: editedMovie.metascore,
        stars: editedMovie.stars.split(",")
      })
      .then(res => {
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      Hello from movie form!
      <form>
        <label>Director</label>
        <input
          name="director"
          onChange={valuechange}
          value={editedMovie.director}
        />
        <label>Metascore</label>
        <input
          name="metascore"
          onChange={valuechange}
          value={editedMovie.metascore}
        />
        <label>Title</label>
        <input name="title" onChange={valuechange} value={editedMovie.title} />
        <label>Stars</label>
        <input name="stars" onChange={valuechange} value={editedMovie.stars} />
        <button onClick={submitMovie}>Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
