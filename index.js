import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import multer from "multer";

import { registerValidation, loginValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js"

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.1cwhv02.mongodb.net/foodhub')
	.then(() => console.log("DataBase Started"))
	.catch((err) => console.log(err));


const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
})

const upload = multer({ storage });



app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(cors())



app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register)
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)

app.post("/upload", checkAuth, upload.single('image'), (req, res) => {
	console.log(req.file.originalname)
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);




app.listen(process.env.PORT || 4444, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log("Server started")
})