import ItemModel from '../models/Item.js'

export const getAll = async (req, res) => {
  try {
    const items = await ItemModel.find().exec()
    res.json(items)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      massage: 'Не удалось найти товары',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const itemId = req.body.id

    ItemModel.findOne({
      _id: itemId
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Товар не найден',
          })
        }

        res.json(doc)
      })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      massage: 'Не удалось вернуть товар',
    })
  }

}