const { body } = require('express-validator');

router.post('/create', [
    body('title')
        .notEmpty()
        .withMessage('El título es obligatorio'),
    body('rating')
        .notEmpty()
        .isFloat({ min: 0, max: 10 })
        .withMessage('El rating debe ser un número entre 0 y 10'),
    body('awards')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('El número de premios debe ser un número entero positivo'),
    body('release_date')
        .notEmpty()
        .isDate()
        .withMessage('La fecha de estreno debe ser válida'),
    body('length')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('La duración debe ser un número entero positivo'),
    body('genre_id')
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage('Se debe seleccionar un género')
], moviesController.create);