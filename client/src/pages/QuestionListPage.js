import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../redux/actions";
import "../";

const QuestionListPage = () => {
  const questions = useSelector((state) => state.question.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(questionActions.questionsRequest());
  }, []);
  return (
    <div className="d-flex flex-wrap formBasicQuestion">
      {questions.map((question) => (
        <Card className="m-3" style={{ width: "10rem" }}>
          <Card.Body>
            <Card.Title>{question.title}</Card.Title>
            <Card.Text>{question.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default QuestionListPage;
