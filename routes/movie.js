

const express = require('express')
const movieController = require('../controller/movie')
const router = express.Router();
const { verify, verifyAdmin } = require('../auth')


// For all users
router.get('/getMovies', verify, movieController.getAllMovies);
router.get('/getMovie/:movieId', verify, movieController.getMovieById);
router.patch('/addComment', verify, movieController.addMovieComment);


// For admin only
router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);
router.patch('/updateMovie/:movieId', verify, verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:movieId', verify, verifyAdmin, movieController.deleteMovie);

module.exports = router;

