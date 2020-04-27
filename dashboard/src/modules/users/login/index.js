import React, { Component } from "react";

import login from "modules/users/services/login.service";

import "./style.css";

export default class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    success: null,
    error: null
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    let { email, password } = this.state;

    this.setState({
      isLoading: true
    });
    
    let response;
    try {
      response = await login({ email, password });

      this.setState({
        isLoading: false,
        success: response.data.success,
        error: null
      });

      setTimeout(() => {
        this.props.history.push("/admin");
      }, 2000);
    } catch (err) {
      this.setState({
        isLoading: false,
        success: null,
        error: err.response.data.message
      });
    }

  };

  render() {
    let { email, password, isLoading, success, error } = this.state;
    return (
      <section className="login-page">
        <div className="login-form-box">
          <h1 className="text-center h3 mb-5"> Login to the dashboard </h1>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.handleChange}
                placeholder="Enter email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {isLoading ? "Logging you in ..." : "LOGIN"}
            </button>

            {success ? (
              <p className="text-success text-center mt-4"> {success} </p>
            ) : error ? (
              <p className="text-danger text-center mt-4"> {error}, please try again. </p>
            ) : (
              ""
            )}
          </form>
        </div>
      </section>
    );
  }
}
