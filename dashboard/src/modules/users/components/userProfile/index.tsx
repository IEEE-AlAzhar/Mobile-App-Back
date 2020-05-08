import React, { Component } from "react";

import AdminLayout from "shared/admin-layout";
import Loading from "shared/loading";

import { getSingleUser } from "modules/users/services/user.service";
import { User } from "globals/interfaces/user.interface";

import SweetAlert from "react-bootstrap-sweetalert";

import AchievementsList from "modules/achievements/components/section";
import FeedbacksList from "modules/feedbacks/components/section";

import { isUserLoggedIn } from "modules/users/services/auth.service";

import "./style.css";

interface Prop {
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      id: string;
    };
  };
}

interface State {
  user: User;
  errorAlert: string;
  isLoading: boolean;
  currentTab: string;
}

export default class UserProfile extends Component<Prop, State> {

  state = {
    user: {} as User,
    currentTab: "achievements",
    errorAlert: "",
    isLoading: false,
  };

  async componentDidMount() {
    // if (!isUserLoggedIn()) return this.props.history.push("/login");
    this.setState({ isLoading: true });
    try {
      let id = this.props.match.params.id;
      let user = await getSingleUser(id);

      this.setState({ user, isLoading: false });
    } catch {
      this.setState({ errorAlert: "User not found", isLoading: false });
      setTimeout(() => this.props.history.push("/users"), 1000);
    }
  }

  switchTabs = (tab: string): void => {
    this.setState({ currentTab: tab });
  };

  render() {
    let { errorAlert, isLoading, currentTab } = this.state;
    let {
      name,
      email,
      phone,
      image,
      achievements,
      feedbacks,
    } = this.state.user;

    let { id } = this.props.match.params;

    return (
      <AdminLayout>
        {isLoading ? (
          <div className="text-center mt-5">
            <Loading />
          </div>
        ) : (
          <>
            <header className="d-flex align-items-center container mt-5 profile__header">
              <img src={image} alt="" width="200" />
              <h2 className="mt-3"> {name} </h2>
              <p> {email} </p>
              <p> {phone} </p>
            </header>

            <section className="profile__data mt-5">
              <aside className="profile__controls">
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    className={`btn btn-lg ${
                      currentTab === "achievements" && "btn-active"
                    }`}
                    onClick={() => this.switchTabs("achievements")}
                  >
                    Achievements
                  </button>
                  <button
                    className={`btn btn-lg ${
                      currentTab === "feedbacks" && "btn-active"
                    }`}
                    onClick={() => this.switchTabs("feedbacks")}
                  >
                    Feedbacks
                  </button>
                </div>
              </aside>

              <main className="profile__content p-2">
                <div className="container">
                  {currentTab === "achievements" ? (
                    <section className="achievements-data">
                      <AchievementsList
                        userId={id}
                        achievements={achievements}
                      />
                    </section>
                  ) : (
                    <section className="feedbacks-data">
                      <FeedbacksList userId={id} feedbacks={feedbacks} />
                    </section>
                  )}
                </div>
              </main>
            </section>
          </>
        )}

        <SweetAlert
          show={!!errorAlert}
          warning
          title="An error occurred"
          timeout={2000}
          onConfirm={() => this.setState({ errorAlert: null })}
        >
          {errorAlert}
        </SweetAlert>
      </AdminLayout>
    );
  }
}
