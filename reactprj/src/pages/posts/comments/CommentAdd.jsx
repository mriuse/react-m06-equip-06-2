import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { UserContext } from '../../../userContext';
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';

const CommentAdd = ({post_id, onCommentAdded}) => {
  const { authToken } = useContext(UserContext);
  const currentDate = new Date();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  const onSubmit = (data) => {
    //Recull l'item posts i el transforma des d'un json a un array
    let commentsGuardats = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [];

    //Creem el nou objecte comment i el guardem a localstorage
    let newComment = {
      id: uuidv4(),
      id_post: post_id,
      comment: data.comment,
      created_at: currentDate,
      user: {
        name: authToken,
        email: '',
      },
    };
    commentsGuardats.push(newComment);
    localStorage.setItem('comments', JSON.stringify(commentsGuardats));

    //Refresca la caixa del component
    setValue('comment', '');

    //Refresca el component pare
    onCommentAdded();
  }

  return (
    <div className='col-12'>
      <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-row justify-content-between flex-md-column flex-wrap '>
        {/* Comentari */}
        <label className='d-flex flex-column col-7 col-md-12 pb-3'>
          <input type="text" {...register('comment', { required: 'Aquest camp és obligatori' })} />
          {errors.comment && <p className="text-danger">{errors.comment.message}</p>}
        </label>

        <Button type="submit" variant='outline-primary'> Afegir comentari </Button>
      </form>
    </div>
  );
};

export default CommentAdd;