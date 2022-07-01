const { responseSuccess } = require("../../libs/response");
const { recipesVideosModel } = require("../../models");
const { uploadVideosRecipe } = require("../../middlewares/multer");

const upload = uploadVideosRecipe.single("recipe_video");

exports.insertOne = (req, res, next) => {
	upload(req, res, async (error) => {
		try {
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			} else {
				const data = {
					...req.body,
					recipe_video: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
				};
				const results = await recipesVideosModel.insert.insertOneModel(data);
				res.status(200).json(responseSuccess("added", results));
			}
		} catch (err) {
			next(err);
		}
	});
};
