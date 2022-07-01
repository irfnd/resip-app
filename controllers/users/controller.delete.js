const { responseSuccess } = require("../../libs/response");
const { usersModel } = require("../../models");
const { deleteFile } = require("../../libs/deleteFile");

exports.deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await usersModel.delete.deleteOneModel(id);
			if (results.request[0].photo_profile !== null) {
				await deleteFile(results.request[0].photo_profile);
			}
			res.status(200).json(responseSuccess("deleted", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};
