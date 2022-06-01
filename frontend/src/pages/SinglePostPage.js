import React from 'react'
import { useGetOnePostQuery } from '../services/appApi'
import {useParams} from 'react-router-dom'
import { Container, Spinner, Row, Col } from "react-bootstrap"

function SinglePostPage() {
  const {id} = useParams()
  const {isLoading, data:article, isError} = useGetOnePostQuery(id)

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

  return (
    <Container>
      <Row>
        <Col md={8} style={{margin: "0 auto"}}>
          <img src={article.image} style={{width: '100%', maxHeight: '400px', objectFit: "cover"}}/>
          <h1>{article.title}</h1>
          <p>By {article.creator.email}</p>
          <div dangerouslySetInnerHTML={{__html: article.content}} />
        </Col>
      </Row>
    </Container>
  )
}

export default SinglePostPage