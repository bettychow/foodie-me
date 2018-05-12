import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Alert,
  Input
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwtDecode from'jwt-decode'
import { inputLoginEmail, inputLoginPassword, checkLogin } from '../actions/index'

const Login = ({ email, password, isError, inputLoginEmail, inputLoginPassword, checkLogin, history }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault()
    checkLogin(email, password)
      .then(result => {

        const token = localStorage.getItem('authorization')

    //const decoded = jwtDecode(token)

    token && jwtDecode(token).loggedIn ? history.push(`/${jwtDecode(token).sub.username}`): null
      })
    
  }
  document.body.style.backgroundColor = "#ff9966";
  return(
    <div className="login">

    <div className="big-logo" >foodie<i className="fas fa-crown"></i>me</div>
      <Container className="main-wrapper">
    <Row style={{ marginTop: '15vh' }}>
      <Col
        lg={{ size: 6, offset: 3 }}
        style={{
          border: '1px solid #c9c5c2',
          padding: 35,
          boxShadow: '3px 3px 47px 0px rgba(0,0,0,0.5)',
          backgroundColor: 'white'
        }}
      >
        <Form className="login-form" onSubmit={e => handleSubmit(e)}>
          <FormGroup>
            <Label for="email-field">Email</Label>
            <Input
              type="email"
              name="email"
              id="email-field"
              placeholder="email"
              value={email}
              onChange={e => inputLoginEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password-field">Password</Label>
            <Input
              type="password"
              name="password"
              id="pass-field"
              placeholder="password"
              value={password}
              onChange={e => inputLoginPassword(e.target.value)}
            />
          </FormGroup>
          {isError ? (
            <Alert color="primary">
              Either your email or password is incorrect. Please try again.
            </Alert>
          ) :''}
          <Button className="mr-3" type="submit" color="primary">
            Submit
          </Button>
          {/* <a href="/signup">Not a member?</a> */}
          <Link to="/signup">Not a member?</Link>
        </Form>
      </Col>
    </Row>
    </Container>
  </div>
    

  )
}

const mapStateToProps = state => {
  console.log('ssssssss', state)
  return ({
  email: state.login.email,
  password: state.login.password,
  isError: state.login.isError
})
}

const mapDispatchToProps = dispatch => bindActionCreators({
  inputLoginEmail,
  inputLoginPassword,
  checkLogin
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)