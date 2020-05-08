import React, { Component } from "react";

import "./style.css";

import AdminLayout from "shared/admin-layout";

import { isUserLoggedIn } from "modules/users/services/auth.service";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { getCounts } from "./services/counts.service";

interface Prop {
  history: {
    push: (path: string) => void;
  };
}

// interface State {
//   articlesCount: number;
//   messageCount: number;
//   projectsCount: number;
// }

export default class AdminHome extends Component<Prop> {
  // state = {
  //   articlesCount: 0,
  //   messageCount: 0,
  //   projectsCount: 0,
  // };

  async componentDidMount() {
    // if (!isUserLoggedIn()) this.props.history.push("/login");

    // getCounts().then((response) => {
    //   let { articlesCount, projectsCount, messageCount } = response;
    //   this.setState({
    //     articlesCount,
    //     projectsCount,
    //     messageCount,
    //   });
    // });
  }

  render() {
    // let { articlesCount, projectsCount, messageCount } = this.state;
    return (
      <AdminLayout>
        <div className="admin-home d-flex justify-content-center align-items-center">
          <header className="admin-home__header">
            <h2>
              Welcome to Dashboard
            </h2>
          </header>
          {/* <main className="admin-home__main w-100 mt-5 text-center">
            <article className="card text-center p-4 mb-3 mx-2">
              <h3 className="count__header"> {articlesCount} </h3>
              <p>Articles</p>
            </article>
            <article className="card text-center p-4 mb-3 mx-2">
              <h3 className="count__header"> {messageCount} </h3>
              <p>Messages</p>
            </article>
            <article className="card text-center p-4 mb-3 mx-2">
              <h3 className="count__header"> {projectsCount} </h3>
              <p>Projects</p>
            </article>
          </main> */}
        </div>
      </AdminLayout>
    );
  }
}
