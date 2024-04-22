const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
  list: (req, res) => {
    db.Movie.findAll().then((movies) => {
      res.render("moviesList.ejs", { movies });
    });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesDetail.ejs", { movie });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("newestMovies", { movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    }).then((movies) => {
      res.render("recommendedMovies.ejs", { movies });
    });
  },
  //Aqui dispongo las rutas para trabajar con el CRUD
  add: function (req, res) {
    db.Genre.findAll()
      .then((genres) => {
        res.render("moviesAdd.ejs", { genres });
      })
      .catch((error) => console.log(error));
  },
  create: function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      db.Genre.findAll()
        .then((genres) => {
          res.render("moviesAdd.ejs", { genres, errors: errors.array() });
        })
        .catch((error) => console.error(error));
    } else {
      db.Movie.create({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      })
        .then((movie) => {
          res.redirect("/movies");
        })
        .catch((error) => {
          console.error("Error al crear la película:", error);
          res.status(500).send("Error =(");
        });
    }
  },
  edit: function (req, res) {
    const movieId = req.params.id;

    db.Movie.findByPk(movieId, {
      include: [{ model: db.Genre, as: "genre" }],
    })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send("Película no encontrada");
        }

        db.Genre.findAll()
          .then((genres) => {
            res.render("moviesEdit.ejs", { movie, genres });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error("Error al buscar la película:", error);
        res.status(500).send("Error =(");
      });
  },
  update: function (req, res) {
    const movieId = req.params.id;

    db.Movie.findByPk(movieId)
      .then((movie) => {
        if (!movie) {
          return res.status(404).send("Película no encontrada");
        }

        movie
          .update({
            title: req.body.title,
          })
          .then(() => {
            res.redirect("/movies");
          })
          .catch((error) => {
            console.error("Error al actualizar la película:", error);
            res.status(500).send("Error =(");
          });
      })
      .catch((error) => {
        console.error("Error al buscar la película:", error);
        res.status(500).send("Error =(");
      });
  },
  delete: function (req, res) {
    db.Movie.findByPk(req.params.id, {})
      .then((Movie) => {
        return res.render("moviesDelete.ejs", { Movie });
      })
      .catch((error) => console.log(error));
  },
  destroy: function (req, res) {
    db.Movie.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        return res.redirect("/movies");
      })
      .catch((error) => console.log(error));
},
};
module.exports = moviesController;