const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");
const validators = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authentication");
const { body, param } = require("express-validator");

/**
 * @route GET api/questions?page=1&limit=10
 * @description Get questions with pagination
 * @access Public
 */
router.get("/", questionController.getQuestions);

/**
 * @route GET api/questions/:id
 * @description Get a single blog
 * @access Public
 */
router.get(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  questionController.getSingleQuestion
);

/**
 * @route POST api/questions
 * @description Create a new question
 * @access Login required
 */

router.post(
  "/",
  authMiddleware.loginRequired,
  //uploader.array("images",2),
  validators.validate([
    body("title", "Missing title").exists().notEmpty(),
    body("content", "Missing content").exists().notEmpty(),
  ]),
  questionController.createNewQuestion
);

/**
 * @route PUT api/questions/:id
 * @description update a question
 * @access Login required
 */
router.put(
  "/:id",
  authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("title", "Missing title").exists().notEmpty(),
    body("content", "Missing content").exists().notEmpty(),
  ]),
  questionController.updateSingleQuestion
);

/**
 * @route DELETE api/questions/:id
 * @description delete a question
 * @access Login required
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  questionController.deleteSingleQuestion
);

module.exports = router;
