import React, { Component } from "react";

import login from "modules/users/services/login.service";

import SweetAlert from "react-bootstrap-sweetalert";

import "./style.css";

interface State {
  user: {
    code: string;
  };
  isLoading: boolean;
  success: boolean;
  error: boolean;
}

interface Prop {
  history: {
    push: (path: string) => void;
  };
}

export default class LoginPage extends Component<Prop, State> {
  state = {
    user: {
      code: "",
    },
    isLoading: false,
    success: false,
    error: false,
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let { name, value } = e.currentTarget;

    let { user } = this.state;

    this.setState({
      user: {
        ...user,
        [name]: value,
      } as any,
    });
  };

  handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let { user } = this.state;

    this.setState({
      isLoading: true,
    });

    let response;
    try {
      response = await login(user);

      this.setState({
        isLoading: false,
        success: response.data.success,
        error: null,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);

      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    } catch (err) {
      this.setState({
        isLoading: false,
        success: null,
        error: err.response.data.message,
      });
    }
  };

  render() {
    let { isLoading, success, error } = this.state;
    return (
      <section className="login-page">
        <div className="login-form-box">
          <h1 className="text-center h3 mb-5"> Login to the dashboard </h1>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Code</label>
              <input
                type="text"
                className="form-control"
                name="code"
                onChange={this.handleChange}
                placeholder="Enter your code .."
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {isLoading ? "Logging you in ..." : "LOGIN"}
            </button>

            {success ? (
              <SweetAlert
                show={!!success}
                success
                title={success || " "}
                timeout={2000}
                onConfirm={() => this.setState({ success: null })}
              />
            ) : error ? (
              <SweetAlert
                show={!!error}
                warning
                title="An error occurred"
                timeout={2000}
                onConfirm={() => this.setState({ error: null })}
              >
                {error}
              </SweetAlert>
            ) : (
              ""
            )}
          </form>
        </div>
      </section>
    );
  }
}
