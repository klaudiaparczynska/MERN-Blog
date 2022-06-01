import React from "react";
import { Spinner } from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap' 
import { useGetAllPostsQuery } from "../services/appApi"
import { Row, Container, Col, ListGroup } from 'react-bootstrap'
import MainArticle from "../components/MainArticle";
import ArticlePreview from "../components/ArticlePreview";

function Home() {
    const { data: articles, isLoading, isError } = useGetAllPostsQuery()
    const sidebarArticles = articles?.slice(0, 4) || []
    if (isError) {
        return (
            <div>
                <h1 className="text-center">
                    An error has occured
                </h1>
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
            <div className="banner">
                <h1 className="banner__title">IT Blog</h1>
            </div>
            {articles.length > 0 && (
            <Row>
                <MainArticle article={articles[articles.length - 1]} />
                <Col md={9} className="blog-main d-flex pb-4 flex-wrap gap-4">
                    {articles.map((article, idx) => (
                    <ArticlePreview article={article} key={idx} />
                    ))}
                </Col>
                <Col md={3} className="blog-sidebar py-4">
                    <ListGroup variant="flush">
                        <h2>Latest Posts</h2>
                        {sidebarArticles.map((article, idx) => (
                            <LinkContainer to={`/articles/${article._id}`} key={idx}>
                                <ListGroup.Item>{article.title}</ListGroup.Item>
                            </LinkContainer> 
                        ))}
                    </ListGroup>
                </Col>

            </Row>
            )}
            {articles.length < 1 && (
                <h3>No posts</h3>
            )}
        </Container>
    )
}
export default Home;
