import PostModel from "../models/Post.js"

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		});

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			massage: 'Не удалось создать статью',
		})
	}
}

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec()

		res.json(posts)
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			massage: 'Не найти статьи',
		})
	}
}

export const getOne = async (req, res) => {
	const postId = req.params.id

	PostModel.findOneAndUpdate(
		{
			_id: postId,
		}, 
		{
			$inc: { viewsCount: 1 },
		}, 
		{
			returnDocument: 'after',
		},
	).populate('user').then(doc => {
		if(!doc) {
			return res.status(404).json({
				message: 'Статья не найдена',
			})
		}
		
		res.json(doc)
	}).catch (err => {
		console.log(err)
		return res.status(500).json({
			massage: 'Не удалось вернуть статью',
		})
	})
}

export const remove = async (req, res) => {
	const postId = req.params.id

	PostModel.findOneAndDelete({
		_id: postId,
	}).then(doc => {
		if(!doc) {
			return res.status(404).json({
				message: 'Статья не найдена',
			})
		}

		res.json({
			message: "deleting success",
		})
	}).catch(err => {
		console.log(err)
		return res.status(500).json({
			massage: 'Не удалось удалить статью',
		})
	})
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id

		await PostModel.updateOne({
			_id: postId,
		},
		{
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		})

		res.json({
			message: "updating success",
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			massage: 'Не удалось обновить статью',
		})
	}
}