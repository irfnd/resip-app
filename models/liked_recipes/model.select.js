const db = require("../connection");

const table = "liked_recipes";
const sql = {
	selectByUser: `SELECT * FROM ${table} WHERE id_user = $1`,
	selectByRecipe: `SELECT * FROM ${table} WHERE id_recipe = $1`,
};

exports.selectByUserModel = (id_user) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByUser, [id_user], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
				}
				resolve(result.rows);
			}
		});
	});
};

exports.selectByRecipeModel = (id_recipe) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByRecipe, [id_recipe], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
				}
				resolve(result.rows);
			}
		});
	});
};
