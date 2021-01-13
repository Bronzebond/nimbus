import * as types from "../constants/question.constants";

const initialState = {
  questions: [],
  totalPageNum: 1,
  selectedQuestion: null,
  loading: false,
};

const questionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.QUESTION_REQUEST:
    case types.GET_SINGLE_QUESTION_REQUEST:
    case types.GET_QUESTION_LIST_REQUEST:
    case types.CREATE_QUESTION_REQUEST:
    case types.UPDATE_QUESTION_REQUEST:
    case types.DELETE_QUESTION_REQUEST:
      return { ...state, loading: true };

    case types.QUESTION_REQUEST_SUCCESS:
      return {
        ...state,
        questions: payload.questions,
        totalPageNum: payload.totalPages,
        loading: false,
      };

    case types.GET_SINGLE_QUESTION_REQUEST_SUCCESS:
      return { ...state, selectedQuestion: payload, loading: false };

    case types.GET_QUESTION_LIST_REQUEST_SUCCESS:
      return { ...state, selectedQuestion: payload, loading: false };

    case types.UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        selectedQuestion: payload,
        loading: false,
      };

    case types.QUESTION_REQUEST_FAILURE:
    case types.GET_SINGLE_QUESTION_REQUEST_FAILURE:
    case types.CREATE_QUESTION_FAILURE:
    case types.UPDATE_QUESTION_FAILURE:
    case types.DELETE_QUESTION_FAILURE:
    case types.GET_QUESTION_LIST_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedQUESTION: {},
      };
    default:
      return state;
  }
};

export default questionReducer;
