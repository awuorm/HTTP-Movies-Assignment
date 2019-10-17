import React, {useState} from "react";
import axios from "axios";

const AddMovie = (props) => {
    const [stars, setStars] = useState([]);
    console.log("props from movie form", props);
    const {editedMovie, setEditedMovie} = props;
      const valuechange = (e) => {
          if(e.target.name === "stars") {
              setStars([...e.target.value]);
              console.log("stars", stars);

          };
          console.log("stars 2", stars);
          setEditedMovie({...editedMovie,stars,
            [e.target.name]:e.target.value});
             console.log("edited movie", editedMovie);
      };

      const submitMovie = (e) => {
          e.preventDefault();
          axios
          .post(`http://localhost:5000/api/movies`,editedMovie)
          .then(res => {
    console.log("response from server,edited", res);
                // setEditedMovie(res.data);
                props.history.push("/");
          })
          .catch(err => console.log(err.response));
      }

    return (
        <div>Hello from movie form!
            <form>
            <label>ID</label>
                <input name="id" onChange={valuechange} value={editedMovie.id}/>
                <label>Director</label>
                <input name="director" onChange={valuechange} value={editedMovie.director}/>
                <label>Metascore</label>
                <input name="metascore" onChange={valuechange} value={editedMovie.metascore}/>
                <label>Title</label>
                <input name="title" onChange={valuechange} value={editedMovie.title}/>
                <label>stars</label>
            <input name="stars" onChange={valuechange}/>
            <button onClick={submitMovie}>Submit</button>
            </form>
        </div>
    )
};

export default AddMovie;