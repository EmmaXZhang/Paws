/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useCreateReviewMutation } from "../../slices/productsApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./ReviewForm.css";

const ReviewForm = ({ id, refetch }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { userData } = useSelector((state) => state.auth);
  const [createReview, { isLoading: LoadingReview }] = useCreateReviewMutation();

  async function submitReviewHandler(e) {
    e.preventDefault();
    try {
      await createReview({
        productId: id,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review added sucessfully");
      setRating(5);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <div className="reviewForm">
      <h2 className="mt-5 reviewHeading">Write Reviews</h2>
      {LoadingReview && <Loader />}

      {userData ? (
        <Form onSubmit={submitReviewHandler}>
          <Form.Group controlId="rating" className="my-2">
            <Form.Label>Rating</Form.Label>
            <Form.Control as="select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="comment" className="my-2">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              row="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
            <Button disabled={LoadingReview} type="submit" variant="outline-dark" className="mt-3 mb-5">
              Submit
            </Button>
          </Form.Group>
        </Form>
      ) : (
        <strong>
          Please <Link to="/login">Sign in </Link> to leave review.
        </strong>
      )}
    </div>
  );
};

export default ReviewForm;
