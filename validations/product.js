import { body } from 'express-validator';

export const productCreateValidation = [
	body('name', "Введите название").isLength({ min: 3 }).isString(),
	body('imageUrl', "Добавьте картинку").isString(),
	body('description', "Добавьте описанние").isLength({ min: 10 }).isArray(),
]