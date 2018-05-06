import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignUp from './SignUp'

const Landing = () => {

  return (
    <div>
      <h1>Foodie Me</h1>
      <SignUp />
    </div>
  )
}

export default Landing