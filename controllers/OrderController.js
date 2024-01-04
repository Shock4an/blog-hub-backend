import mongoose from 'mongoose'
import OrderModel from '../models/Order.js'

export const create = async (req, res) => {
  try {
    const doc = new OrderModel({
      user: req.userId,
      price: req.body.price,
      items: req.body.items
    })

    const order = await doc.save()

    res.json(order)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      massage: 'Не удалось создать заказ',
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const orders =
      await OrderModel
        .find()
        .populate('user')
        .populate({
          path: 'items',
          populate: {
            path: 'item',
            model: 'Item',
          },
        })
        .exec()

    res.json(orders)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      massage: 'Не удалось найти ваш заказ',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id

    OrderModel.findOneAndDelete({
      _id: postId,
    }).then(doc => {
      if (!doc) {
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
        massage: 'Не удалось удалить заказ',
      })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      massage: 'Не удалось найти ваш заказ',
    })
  }
}