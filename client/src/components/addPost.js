import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client'


const ADD_POST = gql`
  mutation AddPost($data:PostInput!){
    addPost(data:$data){
      id
      title
      body
      author{
        name
      }
    }
  }
`


const Posts = () => {

  const [addPost, { data, error, loading, called }] = useMutation(ADD_POST, {
    ignoreResults: true,
    onCompleted: data => { console.log(data) },
    onError: error => { console.log(error) }
  })

  const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
            author: ''
        },
        onSubmit: (values) => {
            postSubmitHandler(values)
        }
  })
  
  const postSubmitHandler = (values) => {
    addPost({
      variables: {
            data:{ ...values }
          }
        })
    }
 
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>

        <Form.Group>
          <Form.Control
            type="string"
            name="title"
            placeholder="Enter Title"
            onChange={formik.handleChange}
            value={formik.values.title} />
        </Form.Group>

        <Form.Group>
        <Form.Control
            type="string"
            name="body"
            placeholder="Enter Body Text"
            onChange={formik.handleChange}
            value={formik.values.body} />
        </Form.Group>

        <Form.Group>
        <Form.Control
            type="string"
            name="author"
            placeholder="Enter Author"
            onChange={formik.handleChange}
            value={formik.values.author} />
        </Form.Group>

        <Button type="submit" variant="primary">Submit</Button>
      
      </Form>
    </div>
  );
}

export default Posts;
