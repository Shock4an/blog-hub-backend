import ProductModel from "../models/Product.js";

export const create = async (req, res) => {
    try {
        const doc = new ProductModel({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            user: req.userId,
        })

        const product = await doc.save()

        res.json(product)
    } catch (error) {
        console.log(error)
		return res.status(500).json({
			massage: 'Не удалось выставить продукт',
		})
    }
    
} 

export const getAll = async (req, res) => {
	try {
		const products = await ProductModel.find().populate('user').exec()
		res.json(products)
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			massage: 'Не найти товары',
		})
	}
}

export const getOne = async (req, res) => {
	const productId = req.params.id

	ProductModel.findOneAndUpdate(
		{
			_id: productId,
		}, 
		{
			returnDocument: 'after',
		},
	).populate('user').then(doc => {
		if(!doc) {
			return res.status(404).json({
				message: 'Товар не найден',
			})
		}
		
		res.json(doc)
	}).catch (err => {
		console.log(err)
		return res.status(500).json({
			massage: 'Не удалось получить товар',
		})
	})
}

export const remove = async (req, res) => {
	const productId = req.params.id

	ProductModel.findOneAndDelete({
		_id: productId,
	}).then(doc => {
		if(!doc) {
			return res.status(404).json({
				message: 'Товар не найден',
			})
		}

		res.json({
			message: "deleting success",
		})
	}).catch(err => {
		console.log(err)
		return res.status(500).json({
			massage: 'Не удалось удалить товар',
		})
	})
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id

		await ProductModel.updateOne({
			_id: postId,
		},
		{
			name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
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