import React, { useState } from 'react';
import { Card, CardGroup, Form, Button } from 'react-bootstrap';
import { gql, useQuery, useLazyQuery, NetworkStatus } from '@apollo/client'


const GET_USER_BY_ID = gql`
  query GetUserById($id:ID!){
    user(id:$id){
      id
      name
      lastname
      email
    }
  }
`

const GET_ALL_USERS = gql`
  query{
    users{
      id
      name
      email
    }
  }
`

const Home = () => {

  const [userId, setUserId] = useState('')
  const getAllUsers = useQuery(GET_ALL_USERS)
  const [userGetLazy, userGetLazyResult] = useLazyQuery(GET_USER_BY_ID)
  // const { data, loading, error } = useQuery(GET_USER_BY_ID)

  if (getAllUsers.networkStatus === NetworkStatus.ready) {
    console.log('Done fetching')
  }

  const allUsersHandler = () => (
    getAllUsers.data ?
      getAllUsers.data.users.map((user, index) => (
        <Card key={index}>
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>{ user.email }</Card.Text>
          </Card.Body>
        </Card>
      ))
      : null
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    userGetLazy({
      variables: {
        id: userId
      }
    })
  }

  return (
    <div className="App">
      <>
        <h3>All Users</h3>
        <CardGroup>
          { allUsersHandler() }
        </CardGroup>
      </>
      <>
        <h3>Get user by Id</h3>
        <Form onSubmit={ handleSubmit }>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter User Id"
              onChange={(e) => setUserId(e.target.value)}
              value={ userId }
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        {
          userGetLazyResult.data ?
            <div className="mt-4">
              <div>Name: {userGetLazyResult.data.user.name}</div>
              <div>Last Name: {userGetLazyResult.data.user.lastname}</div>
              <div>Email: { userGetLazyResult.data.user.email }</div>
            </div>
            : null
        }
      </>
      <hr />
      <Button
        onClick={ () => getAllUsers.stopPolling() }
      >
        STOP POLLING
      </Button>
      <Button
        className="mx-3"
        onClick={ () => getAllUsers.startPolling(1000) }
      >
        START POLLING
      </Button>
      <Button
        onClick={ () => getAllUsers.refetch() }
      >
        REFETCH
      </Button>
    </div>
  );
}

export default Home;
