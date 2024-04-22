module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Actor = sequelize.define(alias, cols, config); 

    Actor.associate = function(models) {
        Actor.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'MovieActor',
            foreignKey: 'actor_id',
            otherKey: 'movie_id'
        });
    };

    return Actor;
};
