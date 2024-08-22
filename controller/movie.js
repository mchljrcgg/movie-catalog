const Movie = require('../models/Movie')
const { errorHandler } = require("../auth")


module.exports.addMovie = (req, res) => {
    let newMovie = new Movie ({
        title : req.body.title,
        director : req.body.director,
        year : req.body.year,
        description : req.body.description,
        genre : req.body.genre,     
    })

    return newMovie.save()
    .then(result => res.status(201).send(result))
    .catch(err => errorHandler(err, req, res))

}


module.exports.getAllMovies = (req, res) => {

    return Movie.find({})
    .then(result => {
        if (result.length > 0) {
            return res.status(200).send({
                movies: result
            })
        } else {
            return res.send(result)
        }
    })
    .catch(err => errorHandler(err, req, res))
}

module.exports.getMovieById = (req, res) => {

    return Movie.findOne(req.params.id)
    .then(movie => {
        if(movie) {
            return res.status(200).send(movie);
        } else {
            return res.status(404).send({ message: 'Movie not found'})
        }
    })
    .catch(err => errorHandler(err, req, res))
}


module.exports.updateMovie = (req, res) => {
    let updatedMovie = {
        title : req.body.title,
        director : req.body.director,
        year : req.body.year,
        description : req.body.description,
        genre : req.body.genre,     
    }

    return Movie.findByIdAndUpdate(req.params.movieId, updatedMovie)
    .then(movie => {
        if (movie) {
            res.status(200).send({ 
                message: 'Movie updated successfully',
                updatedMovie: movie
            })
        } else {
            res.status(404).send({ messgae: 'Movie not found'})
        }
    })
    .catch(err => errorHandler(err, req, res))
}


module.exports.deleteMovie = (req, res) => {
    
    return Movie.findByIdAndDelete(req.params.movieId)
    .then(deleteMovie => {
        if (deleteMovie) {
            res.status(200).send({
                message: 'Movie deleted successfully'
            })
        } else {
            res.status(404).send({
                message: 'Movie not found'
            })
        }
    })
    .catch(err => errorHandler(err, req, res))

}

// add comment to a movie
module.exports.addMovieComment = async (req, res) => {
    const { movieId, comment } = req.body;
    const userId = req.user.id; // assuming req.user is populated by the authentication middleware

    try {
        // Find the movie by its ID
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Add the comment to the movie's comments array
        const newComment = {
            userId,
            comment
        };

        movie.comments.push(newComment);

        // Save the updated movie document
        await movie.save();

        return res.status(200).json({
            message: 'Comment added successfully',
            movie
        });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while adding the comment',
            error: err.message
        });
    }
};