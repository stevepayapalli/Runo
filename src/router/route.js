const express=require('express')
const router = express.Router()


const UserController= require("../controller/userController")
//const BookController= require("../controllers/bookController")
//const Middleware= require("../middleware/authorization")
//const ReviewController= require("../controllers/reviewController")

router.post("/registerUser",UserController.registerUser)
 router.post("/loginUser", UserController.loginUser)
// router.post("/books",Middleware.loginCheck, BookController.createBook)//1
// router.post("/books/:bookId/review", ReviewController.createReviewByBookId)//1
// router.put("/books/:bookId/review/:reviewId", ReviewController.updateReviews)

// //**************************************GET API*****************************************************/

// router.get("/books", Middleware.loginCheck, BookController.getBooks)//2
// router.get("/books/:bookId",  Middleware.loginCheck,BookController.getBookDetailsById)//3
// router.put("/books/:bookId",  Middleware.loginCheck,BookController.updateDetails)//3
// router.delete("/books/:bookId",  Middleware.loginCheck,BookController.deleteBookById)//3
// router.delete("/books/:bookId/review/:reviewId", ReviewController.deleteReview)







module.exports= router;