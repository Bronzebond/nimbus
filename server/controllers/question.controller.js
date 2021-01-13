const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Question = require("../models/Question");

const User = require("../models/User");
const questionController = {};

questionController.getQuestions = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const totalQuestions = await Question.countDocuments({
    ...filter,
    isDeleted: false,
  });
  const totalPages = Math.ceil(totalQuestions / limit);
  const offset = limit * (page - 1);

  // console.log({ filter, sortBy });
  const questions = await Question.find(filter)
    .sort({ ...sortBy, createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("author");

  return sendResponse(res, 200, true, { questions, totalPages }, null, "");
});

questionController.getSingleQuestion = catchAsync(async (req, res, next) => {
  let question = await Question.findById(req.params.id).populate("author");
  if (!question)
    return next(
      new AppError(404, "Question not found", "Get Single Question Error")
    );
  question = question.toJSON();
  question.reviews = await Review.find({ question: question._id }).populate(
    "user"
  );
  return sendResponse(res, 200, true, question, null, null);
});

questionController.createNewQuestion = catchAsync(async (req, res, next) => {
  console.log("heres");
  const author = req.userId;
  const { title, content } = req.body;
  console.log({ author, title, content });

  const question = await Question.create({
    title,
    content,
    author,
  });

  return sendResponse(
    res,
    200,
    true,
    question,
    null,
    "Create new question successful"
  );
});

questionController.updateSingleQuestion = catchAsync(async (req, res, next) => {
  const author = req.userId;
  const questionId = req.params.id;
  const { title, content } = req.body;

  const question = await Question.findOneAndUpdate(
    { _id: questionId, author: author },
    { title, content },
    { new: true }
  );
  if (!question)
    return next(
      new AppError(
        400,
        "Question not found or User not authorized",
        "Update Question Error"
      )
    );
  return sendResponse(
    res,
    200,
    true,
    question,
    null,
    "Update Question successful"
  );
});

questionController.deleteSingleQuestion = catchAsync(async (req, res, next) => {
  const author = req.userId;
  const questionId = req.params.id;

  const question = await Question.findOneAndUpdate(
    { _id: questionId, author: author },
    { isDeleted: true },
    { new: true }
  );
  if (!question)
    return next(
      new AppError(
        400,
        "Question not found or User not authorized",
        "Delete Question Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete Question successful");
});

module.exports = questionController;

/////

// const {
//   AppError,
//   catchAsync,
//   sendResponse,
// } = require("../helpers/utils.helper");
// const Question = require("../models/Question");

// const User = require("../modelsUser");
// const questionController = {};

// questionController.getQuestions = catchAsync(async (req, res, next) => {
//   let { page, limit, sortBy, ...filter } = { ...req.query };
//   page = parseInt(page) || 1;
//   limit = parseInt(limit) || 10;

//   const totalQuestions = await Question.countDocuments({
//     ...filter,
//     isDeleted: false,
//   });
//   const totalPages = Math.ceil(totalQuestions / limit);
//   const offset = limit * (page - 1);

//   //console.log({ filter, sortBy });
//   const questions = await Question.find(filter)
//     .sort({ ...sortBy, createdAt: -1 })
//     .skip(offset)
//     .limit(limit)
//     .populate("author");

//   return sendResponse(
//     res,
//     200,
//     true,
//     true,
//     { questions, totalPages },
//     null,
//     ""
//   );
// });

// questionController.getSingleQuestion = catchAsync(async (req, res, next) => {
//   let question = await Question.findById(req.params.id).populate("author");
//   if (!question)
//     return next(
//       new AppError(404, "Question not found", "Get Single Question Error")
//     );
//   question = question.toJSON();
//   question.reviews = await Review.find({ question: question._id }).populate(
//     "user"
//   );
//   return sendResponse(res, 200, true, question, null, null);
// });

// questionController.createNewQuestion = catchAsync(async (req, res, next) => {
//   const author = req.userId;
//   const { title, content } = req.body;

//   const question = await Question.create({
//     title,
//     content,
//     author,
//   });

//   return sendResponse(
//     res,
//     200,
//     true,
//     question,
//     null,
//     "Create new question successful"
//   );
// });

// module.exports = QuestionController;
