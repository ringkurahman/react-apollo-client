import React,{ useState } from 'react';
import { Card, CardGroup, Form, Button } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client'


const GET_USER_BY_ID = gql`
  query{
    user(id:"1"){
      id
      name
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

  const getAllUsers = useQuery(GET_ALL_USERS)
  const { data, loading, error } = useQuery(GET_USER_BY_ID)

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

  return (
    <div className="App">
      <>
        <h3>All Users</h3>
        <CardGroup>
          { allUsersHandler() }
        </CardGroup>
      </>
    </div>
  );
}

export default Home;
