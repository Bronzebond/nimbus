import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../redux/actions";
import "../App.css";

const QuestionPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const loading = useSelector((state) => state.question.loading);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = formData;
    dispatch(questionActions.createNewQuestion(title, content));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicQuestion">
          <Form.Control
            type="title"
            placeholder="Question title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            This will be the heading of the question
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicQuestionContent">
          <Form.Control
            type="question content"
            placeholder="Question you want to ask tomorrow"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit" class="myButton">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default QuestionPage;
