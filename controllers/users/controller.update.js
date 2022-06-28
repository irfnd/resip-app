const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { usersModel } = require("../../models");
const { uploadPhotoProfile } = require("../../middlewares/multer");

const upload = uploadPhotoProfile.single("photo_profile");

exports.updateOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			const { id } = req.params;
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			} else {
				const data = {
					...req.body,
					photo_profile: req.file ? `/${req.file.path.split("\\").slice(-2).join("/")}` : null,
				};
				if (Number(id)) {
					const results = await usersModel.update.updateOneModel(data, id);
					res.status(200).json(responseSuccess("Successfully updated data.", results));
				} else {
					throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
				}
			}
		} catch (err) {
			const error = JSON.parse(err.message);
			res.status(error.code).json(responseError(error.message));
		}
	});
};
