import * as types from "../constants/question.constants";
import api from "../../apiService";
import { toast } from "react-toastify";


const questionsRequest = (
  pageNum = 1,
  limit = 10,
  query = null,
  ownerId = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.QUESTION_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `&title[$regex]=${query}&title[$options]=i`;
    }
    if (ownerId) {
      queryString = `${queryString}&author=${ownerId}`;
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/questions?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );
    dispatch({
      type: types.QUESTION_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.QUESTION_REQUEST_FAILURE, payload: error });
  }
};

const getSingleQuestion = (questionId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_QUESTION_REQUEST, payload: null });
  try {
    const res = await api.get(`/questions/${questionId}`);
    dispatch({
      type: types.GET_SINGLE_QUESTION_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_QUESTION_REQUEST_FAILURE,
      payload: error,
    });
  }
};

const createNewQuestion = (title, content) => async (dispatch) => {
  dispatch({ type: types.CREATE_QUESTION_REQUEST, payload: null });
  try {
    // For uploading file manually
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.length) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("images", images[index]);
    //   }
    // }
    // const res = await api.post("/questions", formData);

    // Upload images using cloudinary already
    const res = await api.post("/questions", { title, content });

    dispatch({
      type: types.CREATE_QUESTION_SUCCESS,
      payload: res.data.data,
    });
    toast.success("New question has been created!");
  } catch (error) {
    dispatch({ type: types.CREATE_QUESTION_FAILURE, payload: error });
  }
};

const updateQuestion = (questionId, title, content, images) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_QUESTION_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/questions/${questionId}`, {
      title,
      content,
      images,
    });

    dispatch({
      type: types.UPDATE_QUESTION_SUCCESS,
      payload: res.data.data,
    });
    toast.success("The question has been updated!");
  } catch (error) {
    dispatch({ type: types.UPDATE_QUESTION_FAILURE, payload: error });
  }
};

const deleteQuestion = (questionId) => async (dispatch) => {
  dispatch({ type: types.DELETE_QUESTION_REQUEST, payload: null });
  try {
    const res = await api.delete(`/questions/${questionId}`);
    console.log(res);
    dispatch({
      type: types.DELETE_QUESTION_SUCCESS,
      payload: res.data,
    });
    toast.success("The question has been deleted!");
  } catch (error) {
    dispatch({ type: types.DELETE_QUESTION_FAILURE, payload: error });
  }
};

export const questionActions = {
  questionsRequest,
  getSingleQuestion,
  createNewQuestion,
  updateQuestion,
  deleteQuestion,
};
