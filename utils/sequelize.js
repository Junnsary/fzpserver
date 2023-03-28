const { Sequelize, DataTypes, Deferrable } = require('sequelize')

const sequelize = new Sequelize('fzpdb', 'hhrx', 'xhr', {
    host: 'localhost',
    dialect: 'mariadb',
})

// const test = async () => {
//     try {
//         await sequelize.authenticate()
//         console.log('Connection has been established successfully.')
//     } catch (error) {
//         console.error('Unable to connect to the database:', error)
//     }
// }

// test()
// console.log('主线程')

const tags = sequelize.define('tags', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('article', 'video'),
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('knowledge', 'case'),
        allowNull: false,
    },
})

const managers = sequelize.define('managers', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

const articles = sequelize.define('articles', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
    },
    manager_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: managers,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
    status: {
        type: DataTypes.ENUM('normal', 'delete', 'Confirm delete'),
        defaultValue: 'normal',
        allowNull: false,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: tags,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
    cover: {
        type: DataTypes.STRING,
    },
})

// console.log(Articles === sequelize.models.Articles)
// console.log(Tags === sequelize.models.Tags)
// console.log(Managers === sequelize.models.Managers)

async function test() {
    const find = await articles.findAll()
    console.log(JSON.stringify(find, null, 2))
}

test()
