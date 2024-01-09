import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import multer from "multer";

import { registerValidation, loginValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";
import { productCreateValidation } from "./validations/product.js"
import handleValidationErrors from "./utils/handleValidationErrors.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js"
import * as ProductController from "./controllers/ProductController.js"
import * as ItemController from "./controllers/ItemController.js"
import * as OrderController from "./controllers/OrderController.js"

import Item from './models/Item.js'

import { check } from "express-validator";
import { orderCreateValidation } from "./validations/order.js";

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.1cwhv02.mongodb.net/new-app')
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

// app.get("/items", ProductController.getAll)
// app.get("/items/:id", ProductController.getOne)
// app.post("/items", checkAuth, productCreateValidation, handleValidationErrors, ProductController.create)
// app.delete("/items/:id", checkAuth, ProductController.remove)
// app.patch("/items/:id", checkAuth, productCreateValidation, handleValidationErrors, ProductController.update)

app.get("/items", ItemController.getAll)
// app.get("/items/:id", checkAuth, ItemController.getOne)
app.post("/items/order", checkAuth, orderCreateValidation, handleValidationErrors, OrderController.create)
app.get("/items/orders", checkAuth, OrderController.getAll)
app.delete("/items/order/:id", checkAuth, OrderController.remove)


app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  const newItem = new Item({
    name: 'Devil\'s Bounty',
    price: 2,
    imageUrl: 'Devils_Bounty.png'
  })

  newItem.save()



  console.log("Server started")
})
