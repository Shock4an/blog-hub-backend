import { body } from 'express-validator';

export const orderValidation = [
  body('items', "Выберите товары").isArray().notEmpty().withMessage("В заказе нет никаких товаров")
]