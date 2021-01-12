import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMessage } from '../actions/index';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.messageBox.focus(); // permet de mettre le curseur dans l'input de form automatiquement grace a ref apres que le component soit monté.
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleValidation = () => {
    let value = this.state.value;
    let errors = {};
    let formIsValid = true;

    if (value === '') {
      formIsValid = false;
      errors["value"] = "Cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.handleValidation()) {
      this.props.createMessage(this.props.channelFromParams, this.props.currentUser, this.state.value);
      this.setState({ value: '' }); // Reset message input
    } else {
      alert("Message cannot be empty.");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="channel-editor">
        <input
          ref={(input) => { this.messageBox = input; }} // on utilise la fonction ref pour assigner l'element à this.messageBox
          type="text"
          className="form-control"
          autoComplete="off"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createMessage }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
