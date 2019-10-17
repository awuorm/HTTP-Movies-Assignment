import React, {useEffect} from "react";
import axios from "axios";

const MovieForm = (props) => {
    console.log("props from movie form", props);
    const {editedMovie, setEditedMovie} = props;
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
          .then(res => {
    console.log("response from server,movieform", res);
                setEditedMovie(res.data);
          })
          .catch(err => console.log(err.response));
      },[props.match.params.id,setEditedMovie]);

      const valuechange = (e) => {
          setEditedMovie({...editedMovie,
             [e.target.name]:e.target.value})
             console.log("edited movie", editedMovie);
      };

      const submitMovie = (e) => {
          e.preventDefault();
          axios
          .put(`http://localhost:5000/api/movies/${props.match.params.id}`,editedMovie)
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
                <label>Director</label>
                <input name="director" onChange={valuechange} value={editedMovie.director}/>
                <label>Metascore</label>
                <input name="metascore" onChange={valuechange} value={editedMovie.metascore}/>
                <label>Title</label>
                <input name="title" onChange={valuechange} value={editedMovie.title}/>
                {/* <label>To be Attempted</label>
            <input/> */}
            <button onClick={submitMovie}>Submit</button>
            </form>
        </div>
    )
};

export default MovieForm;