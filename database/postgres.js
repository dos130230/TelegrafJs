const { Sequelize ,Model,DataTypes} = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:130230@localhost:5432/dars_demo') 


!async function () {
	try {
		await sequelize.authenticate()
		console.log('database connected!')
	} catch(error) {
		console.log('Error in connection to database: ' + error.message)
	}
}()

class UserModel extends Model {}
UserModel.init({
    user_id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    }
},{
    sequelize, tableName : 'Users'
})

UserModel.sync({
    force : true
})

