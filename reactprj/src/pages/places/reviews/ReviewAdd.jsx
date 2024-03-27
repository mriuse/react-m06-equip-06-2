import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../../userContext';
import { Col, Button } from 'react-bootstrap';
import { useSpeechSynthesis } from 'react-speech-kit';

const ReviewAdd = ({ place_id, handleReviewAdded }) => {
  const { authToken, setAuthToken } = useContext(UserContext);
  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const user = users.find((user) => user.name === authToken);

  const currentDate = new Date();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const { speak } = useSpeechSynthesis();

  const onSubmit = (data) => {
    let reviewList = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];

    let newReview = {
      id: uuidv4(),
      id_ref: place_id,
      review: data.review,
      created_at: currentDate,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    reviewList.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviewList));

    setValue('review', '');

    handleReviewAdded();
  };

  return (
    <Col className='mb-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column justify-content-between'>
        <label className='d-flex flex-column pb-3'>
          <textarea {...register('review', { required: 'Aquest camp és obligatori' })} 
          onDoubleClick={(event) => speak({ text: event.target.value })}/>
          {errors.review && <p className="text-danger">{errors.review.message}</p>}
        </label>
        <Button type='submit' variant='primary'>
          Afegir ressenya
        </Button>
      </form>
    </Col>
  );
};

export default ReviewAdd;
