import React from 'react'
import { useGetAllUserPostsQuery } from '../services/appApi'
import { Row, Container, Col, ListGroup, Spinner } from 'react-bootstrap'
import ArticlePreview from '../components/ArticlePreview'

function MyPosts() {
  const { data: userArticles, isLoading, isError } = useGetAllUserPostsQuery()
  if (isError) {
    return (
      <div>
        <h1 className="text-center">An error has occured</h1>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>

    )
  }
  if (userArticles.length === 0) {
    return (
      <div>
        <h1 className="text-center">You don't have posts yet</h1>
        <h3 className='text-center'>Create posts in My Post section to see them here!</h3>
      </div>
    )
  }


  return (
    <Container>
      <h1 className='text-center'>
        My Posts
      </h1>
      <Row>
        <Col md={9} className="d-flex justify-center flex-wrap gap-4">
          {userArticles.map((article, idx) => (<ArticlePreview key={idx} article={article} currentUserPost={true}/>))}
        </Col>
      </Row>

    </Container>
  )
}

export default MyPosts