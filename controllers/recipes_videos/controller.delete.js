const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { recipesVideosModel } = require("../../models");
const { deleteFile } = require("../../libs/deleteFile/deleteFile");

exports.deleteOne = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await recipesVideosModel.delete.deleteOneModel(id);
			if (results.request[0].recipe_video !== null) {
				await deleteFile("recipes", results.request[0].recipe_video);
			}
			res.status(200).json(responseSuccess("Successfully deleted data.", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
