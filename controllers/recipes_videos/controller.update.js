const { responseSuccess } = require("../../libs/response");
const { recipesVideosModel } = require("../../models");
const { uploadVideosRecipe } = require("../../middlewares/multer");

const upload = uploadVideosRecipe.single("recipe_video");

exports.updateOne = (req, res, next) => {
	upload(req, res, async (error) => {
		try {
			const { id } = req.params;
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			}
			const data = {
				...req.body,
				recipe_video: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
			};
			if (Number(id)) {
				const results = await recipesVideosModel.update.updateOneModel(data, id);
				res.status(200).json(responseSuccess("updated", results));
			} else {
				throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
			}
		} catch (err) {
			next(err);
		}
	});
};
