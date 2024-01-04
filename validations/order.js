import { body } from 'express-validator';

export const orderCreateValidation = [
  body('items', "Выберите товары").isArray().notEmpty().withMessage("В заказе нет никаких товаров")
]