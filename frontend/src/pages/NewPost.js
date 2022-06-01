import React, {useState} from 'react'
import {Container, Row, Col, Form, Button, Spinner} from 'react-bootstrap'
import {EditorState, convertToRaw} from 'draft-js'
import {useNavigate} from 'react-router-dom'
import {Editor} from 'react-draft-wysiwyg' 
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCreatePostMutation } from "../services/appApi"
import zdj from '../images/earth.jpg'
import './NewPost.css'

function NewPost() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [createPost, {isLoading, isSuccess}] = useCreatePostMutation()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [uploadingImg, setUploadingImg] = useState(false)
  const navigate = useNavigate()

  function handlePublish(e) {
    e.preventDefault()
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const content = draftToHtml(rawContentState)
    if(!title || !image || !content)
    {
      return alert('Title, content and image required')
    }
    //create post
    createPost({title, content, image: url})
    
  }
  function handleEditorChange(state) {
    setEditorState(state)
  }

  function uploadImage(e){
    e.preventDefault()
    if(!image) return
    setUrl("")
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset', 'unsigned_preset') //finish
    setUploadingImg(true)
    fetch(
      'https://api.cloudinary.com/v1_1/klaudia-forum/image/upload',
      {
        method: "post",
        body: data
      }
    ).then((res) => res.json())
    .then((data) => 
    {
      setUploadingImg(false)
      setUrl(data.url)
    }).catch(err => {
      setUploadingImg(false)
      console.log(err)
    })

  }

  function handleImageValidation(e) {
    const file = e.target.files[0]
    if(file.size > 1048576){
      setImage(null)
      return alert('File is too big, required 1mb or less')
    }
    else {
      setImage(file)
    }
  }

  if(isLoading)
  {
    return (
      <div className="py-4">
        <h1 className='text-center'>Creating your article.. </h1>
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
      <h1 className='text-center'>Article created with success</h1>
    </div>
    )
  }


  return (
    <Container>
      <Row>
        <Col md={7}>
        <Form onSubmit={handlePublish}>
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
        <div>
          {!url && <p className='alert alert-info'>Please upload an image before publishing your post</p>}
        </div>
        <div className='my-4'>
          <input type="file" onChange={handleImageValidation} accept="image/png,image/jpeg" />
          <Button onClick={uploadImage} disabled={uploadingImg || !image}>
            Upload
          </Button>
        </div>
        
        <Button variant="primary" type="submit" disabled={uploadingImg || !url}>
          Create post
        </Button>
      </Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center">
          {uploadingImg && (
            <div className='text-center'>
              <Spinner animation="border" role="status"/>
              <br/>
              <p className='py-2'>
                Uploading image
              </p>

            </div>
          )}
          <div>
            {!url && !uploadingImg && <img  src={zdj} style={{width: '100%', minHeight: '80vh', objectFit: "cover"}}/>}
          </div>
          {url && <img src={url} style={{width: '100%', minHeight: '80vh', objectFit: "cover"}}/>}
        </Col>
        
      </Row>
    </Container>
  )
}

export default NewPost