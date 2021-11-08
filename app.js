const express = require("express");
const app = express();
const fs = require("fs");

const PORT = 3000;
app.use(express.json());

// App level middleware
// let movies = [
//   {
//     id: 1,
//     name: "how to lose a guy in 10 days",
//     isFav: true,
//     isDel: true,
//   },
//   {
//     id: 2,
//     name: "Dune",
//     isFav: true,
//     isDel: false,
//   },
//   {
//     id: 3,
//     name: "The Hill",
//     isFav: false,
//     isDel: false,
//   },
// ];

// let id = movies[movies.length - 1].id + 1;
// crud opearations
// app.get("/movies", (req, res) => {
//   fs.readFileSync("./movies.json", (err, data) => {
//     let movies = JSON.parse(data.toString());
//     console.log(movies);
//     res.status(200).json(movies);
//   });
// });

// q1. get all isDel = false
// app.get("/deleted", (req, res) => {
//   const { isDel } = req.query;
//   const deleMovies = movies.filter((movies) => {
//     return movies.isDel === false;
//   });
//   if (deleMovies.length) {
//     res.status(200).json(deleMovies);
//   } else {
//     res.status(404).json("Not found");
//   }
// });
app.get("/deleted", (req, res) => {
  fs.readFile("./movies.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const movies = JSON.parse(data.toString());
      let deletedMovies = [];
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].isDel === false) {
          deletedMovies.push(movies[i]);
        }
      }
      res.status(200).json(data);
      console.log(deletedMovies);
    }
  });
});

// q2. get movie by id
// app.get("/movieId", (req, res) => {
//   const { id } = req.query;
//   const movieId = movies.find((elem) => {
//     return elem.id == id;
//   });
//   if (movieId) {
//     res.status(200).json(movieId);
//   } else {
//     res.status(404).json("Not found");
//   }
// });

app.get("/movieId", (req, res) => {
  fs.readFile("./movies.json", (err, data) => {
    let id = movies[movies.length - 1].id + 1;

    const { id } = req.query;
    const movies = JSON.parse(data.toString());
    const movieId = movies.find((elem) => {
      return elem.id == id;
    });
    if (err) {
      console.log(err);
    } else {
      res.status(404).json(movieId);
    }
  });
});

// q3. creat new movie
// app.post("/newMovie", (req, res) => {
//   const { name } = req.body;
//   movies.push({
//     name: require.body,
//   });
//   res.status(200);
//   res.json({ id, name, isFav, isDel });
// });

app.post("/newMovie", (req, res) => {
  fs.readFile("./data.json", function (err, data) {
    const { name } = req.body;
    const movies = JSON.parse(data.toString());
    let id = movies[movies.length - 1].id + 1;

    const newMovie = { id, name };
    movies.push(newMovie);
    writeToFile(movies);
    res.status(201).json(newMovie);
  });
});

// q4. update movie by id
// app.put("/movie/:id/:editMovie", (req, res) => {
//   const { id } = req.params;
//   const { editMovie } = req.params;
//   movies.forEach((elem) => {
//     if (elem.id == id) {
//       elem.name = editMovie;
//     }
//   });
//   res.status(200);
//   res.json(`the movie is updated`);
// });

// q5.  soft delete movie by id
// app.delete("/movie/:id", (req, res) => {
//   const { id } = req.params.id;
//   for (let i = 0; i < movies.length; i++) {
//     const e = movies[i];
//     if (movies.id == id) {
//       movies.splice(e, 1);
//     }
//   }
//   res.status(200);
//   res.json(`the movie is deleted`);
// });

// q6. add data from a file and get the data from a file

// now I guess I need to edit the all 5 qs

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
