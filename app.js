const express = require("express");
const app = express();

const PORT = 4000;
app.use(express.json());
// App level middleware
let movies = [
  {
    id: 1,
    name: "how to lose a guy in 10 days",
    isFav: true,
    isDel: true,
  },
  {
    id: 2,
    name: "Dune",
    isFav: true,
    isDel: false,
  },
  {
    id: 3,
    name: "The Hill",
    isFav: false,
    isDel: false,
  },
];

let id = movies[movies.length - 1].id + 1;
// crud opearations
app.get("/movies", (req, res) => {
  res.status(200);
  res.json(movies);
});
// q1. get all isDel = false
app.get("/deleted", (req, res) => {
  const { isDel } = req.query;
  const deleMovies = movies.filter((movies) => {
    return movies.isDel === false;
  });
  if (deleMovies.length) {
    res.status(200).json(deleMovies);
  } else {
    res.status(404).json("Not found");
  }
});

// q2. get movie by id
app.get("/movieId", (req, res) => {
  const { id } = req.query;
  const movieId = movies.find((elem) => {
    return elem.id == id;
  });
  if (movieId) {
    res.status(200).json(movieId);
  } else {
    res.status(404).json("Not found");
  }
});

// q3. creat new movie
app.post("/newMovie", (req, res) => {
  const { name } = req.body;
  movies.push({
    name: require.body,
  });
  res.status(200);
  res.json({ id, name, isFav, isDel });
});

// q4. update movie by id
app.put("/movie/:id/:editMovie", (req, res) => {
  const { id } = req.params;
  const { editMovie } = req.params;
  movies.forEach((elem) => {
    if (elem.id == id) {
      elem.name = editMovie;
    }
  });
  res.status(200);
  res.json(`the movie is updated`);
});

// q5.  soft delete movie by id
app.delete("/movie/:id", (req, res)=>{
  const { id } = req.params.id;
  for (let i = 0; i < movies.length; i++) {
    const e = movies[i];
    if(movies.id == id){
      movies.splice(e, 1)
    }
  }
  res.status(200);
  res.json(`the movie is deleted`);
});

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
