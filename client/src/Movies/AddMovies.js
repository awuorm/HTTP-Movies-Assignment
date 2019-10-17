import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {
  const [stars, setStars] = useState([]);
  const { editedMovie, setEditedMovie } = props;
  const valuechange = e => {
    if (e.target.name === "stars") {
      setStars(e.target.value);
    }

    setEditedMovie({ ...editedMovie, stars, [e.target.name]: e.target.value });
  };

  const submitMovie = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, {
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
        <label>ID</label>
        <input name="id" onChange={valuechange} value={editedMovie.id} />
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
        <label>stars</label>
        <input name="stars" onChange={valuechange} />
        <button onClick={submitMovie}>Submit</button>
      </form>
    </div>
  );
};

export default AddMovie;
