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
import {
  inputName,
  inputUsername,
  inputEmail,
  inputPassword,
  inputVerifyPassword,
  signup
} from '../actions/index'

class SignUp extends Component {

  state = {
    isPasswordSame: true,
    isPasswordAvailable: true
  }

  render() {

    const { name, username, email, password, verifypassword, inputName, inputUsername, inputEmail, inputPassword, inputVerifyPassword, signup, errorMessage } = this.props

    const userSignup = (e) => {

      e.preventDefault()
      const userObj = {
        name,
        username,
        email,
        password
      }

      if(password !== verifypassword) {
        this.setState({
          isPasswordSame: false
        })
      } else if (password === '' && verifypassword === '') {
        this.setState({
          isPasswordAvailable: false
        })
      } else {
        signup(userObj)
      }

    }

    const passwordError = this.state.isPasswordSame? '' : <p style={{color: "#FF0000"}}>Passwords do not match</p>
    const userNameError = errorMessage === 'Username already exists' || errorMessage === 'Both username and email already exist' ? <p style={{color: "#FF0000"}}>Username already exists</p>: ''
    const emailError = errorMessage === 'Email already exists' || errorMessage === 'Both username and email already exist'? <p style={{color: "#FF0000"}}>Email already exists</p>: ''
    const passwordAvailError = this.state.isPasswordAvailable? '' : <p style={{color: "#FF0000"}}>Please create a password</p>

    document.body.style.backgroundColor = "#ff9966";

    return(
      <div>
        <Container className="main-wrapper">
          <Row style={{ marginTop: '10vh', marginBottom: '10vh' }}>
            <Col
              lg={{ size: 6, offset: 3 }}
              style={{
                border: '1px solid #c9c5c2',
                padding: 35,
                boxShadow: '3px 3px 47px 0px rgba(0,0,0,0.5)',
                backgroundColor: 'white'
              }}
            >
              <Form onSubmit={userSignup}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name-field"
                    placeholder="name"
                    value={name}
                    onChange={e => inputName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username-field"
                    placeholder="username"
                    value={username}
                    onChange={e => inputUsername(e.target.value)}
                  />
                  {userNameError}
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email-field"
                    placeholder="email"
                    value={email}
                    onChange={e => inputEmail(e.target.value)}
                  />
                  {emailError}
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password-field"
                    placeholder="password"
                    value={password}
                    onChange={e => inputPassword(e.target.value)}
                  />
                  {passwordAvailError}
                </FormGroup>
                <FormGroup>
                  <Label for="verify_password">Verify Password</Label>
                  <Input
                    type="password"
                    name="verify-password"
                    id="verify_password"
                    placeholder="verify password"
                    value={verifypassword}
                    onChange={e => inputVerifyPassword(e.target.value)}   
                  />
                  {passwordError}
                </FormGroup>
                <Button className="signup-submit-btn" color="primary" type="submit">
                  Submit
                </Button>
                <Link to={'/'}>Back to login</Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.signup.name,
    username: state.signup.username,
    email: state.signup.email,
    password: state.signup.password,
    verifypassword: state.signup.verifypassword,
    errorMessage: state.checkUser.errorMessage
  }
  
}

const mapDispatchToProps = dispatch => bindActionCreators({
  inputName,
  inputUsername,
  inputEmail,
  inputPassword,
  inputVerifyPassword,
  signup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)