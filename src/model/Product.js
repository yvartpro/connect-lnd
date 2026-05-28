const defineProduct = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
    }, {
        tableName: 'products',
        timestamps: true,
        underscored: true,
        paranoid: true,
    });

    return Product;
};

module.exports = defineProduct;
