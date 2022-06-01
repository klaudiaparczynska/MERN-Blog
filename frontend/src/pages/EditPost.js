import React, {useState} from 'react'
import {Container, Row, Col, Form, Button, Spinner} from 'react-bootstrap'
import {EditorState, ContentState, convertFromHTML, convertToRaw} from 'draft-js'
import {useNavigate, useParams} from 'react-router-dom'
import {Editor} from 'react-draft-wysiwyg' 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useUpdatePostMutation } from "../services/appApi"
import './NewPost.css'
import { useSelector } from 'react-redux'
import draftToHtml from 'draftjs-to-html'

function EditPost() {
  const {id} = useParams()
  const posts = useSelector((state) => state.posts)
  const postToEdit = posts.find((post) => post._id == id)
  const [updateArticle, {isLoading, isSuccess}] = useUpdatePostMutation()


  const [title, setTitle] = useState(postToEdit.title)
  const [url] = useState(postToEdit.image)
  const contentDataState = ContentState.createFromBlockArray(convertFromHTML(postToEdit.content))
  const editorDataState = EditorState.createWithContent(contentDataState)
  const [editorState, setEditorState] = useState(editorDataState)
  const navigate = useNavigate()

  function handleUpdate(e) {
    e.preventDefault()
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const content = draftToHtml(rawContentState)
    if(!title || !content) return alert('Title and content required')
    updateArticle({id, title, content})

  }
  function handleEditorChange(state) {
    setEditorState(state)
  }

  


  if(isLoading)
  {
    return (
      <div className="py-4">
        <h1 className='text-center'>Updating your post.. </h1>
      </div>
    )
  }
  if(isSuccess)
  {
    setTimeout(() => {
      navigate("/")
    }, 1500)
    return (
    <div className='py-4'>
      <h1 className='text-center'>Post updated with success</h1>
    </div>
    )
  }


  return (
    <Container>
      <Row>
        <Col md={7}>
        <Form>
          <h2 className='text-center'>Edit Post</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Your title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </Form.Group>
        <Editor
          stripPastedSyles={true}
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName='wrapper mb-4'
          editorClassName='editor'
          toolbarClassName='toolbar'
        />;
        <Form.Select>
          <option>Select category</option>
          <option value="Programme">Phones</option>
          <option value="Code">Blockchain</option>
          <option value="Network">Computer</option>
          <option value="New Discoveries">Computer</option>
          <option value="Others">Others</option>
        </Form.Select>
      
        
        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Update Post
        </Button>
      </Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center">
          <img src={url} style={{width: '100%', minHeight: '80vh', objectFit: "cover"}}/>
        </Col>
        
      </Row>
    </Container>
  )
}

export default EditPost