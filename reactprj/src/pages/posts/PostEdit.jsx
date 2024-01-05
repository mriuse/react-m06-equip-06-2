import React from 'react'

const PostEdit = () => {
    const { id } = useParams();
    return (
      <>
        <div className="section-dark">
          <Container className="d-flex justify-content-center align-items-center">
            <Row>
              <Col className="d-flex flex-column align-items-center">
                <h1 className='mb-0'>Post</h1>
                <p className='mb-5'>Post id: {id} </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
}

export default PostEdit
