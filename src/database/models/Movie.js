module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models) {
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genre_id'
        });
        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'MovieActor',
            foreignKey: 'movie_id',
            otherKey: 'actor_id'
        });
    };

    return Movie;
};