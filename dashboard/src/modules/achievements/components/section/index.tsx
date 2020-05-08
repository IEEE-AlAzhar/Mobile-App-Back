import React, { Component } from "react";

import AdminTable from "shared/admin-table";
import Loading from "shared/loading";
import AchievementForm from "../form";

import {
  updateAchievement,
  deleteAchievement,
  addAchievement,
} from "modules/achievements/services/achievements.service";
import { Achievement } from "globals/interfaces/achievement.interface";

import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Prop {
  userId: string;
  achievements: Achievement[]
}

interface State {
  achievements: Achievement[];
  achievementToBeEdited?: Achievement | null;
  successAlert: string;
  errorAlert: string;
  isLoading: boolean;
  isCreateModalOpened: boolean;
  isSubmitting: boolean;
  idOfItemToBeDeleted: string;
}

export default class AchievementsList extends Component<Prop, State> {
  tableConfig = {
    tableHeaders: ["title"],
    className: "table-striped",
    actions: ["edit", "delete"],
  };

  state = {
    achievements: this.props.achievements,
    successAlert: "",
    errorAlert: "",
    achievementToBeEdited: {} as Achievement,
    isLoading: false,
    isCreateModalOpened: false,
    isSubmitting: false,
    idOfItemToBeDeleted: "",
  };

  createAchievement = (achievement: Achievement) => {
    let { achievements } = this.state;

    this.setState({
      isSubmitting: true,
    });

    return addAchievement(achievement, this.props.userId)
      .then((response) => {
        achievements.unshift(response as never);

        this.setState({
          achievements,
          successAlert: "Achievement added successfully",
          errorAlert: "",
          isCreateModalOpened: false,
          isSubmitting: false,
        });
      })
      .catch((err) => {
        this.setState({
          errorAlert: "An error occurred",
          successAlert: "",
          isSubmitting: false,
        });
      });
  };

  editAchievement = (
    achievement: Achievement,
    submit: boolean,
    id = this.state.achievementToBeEdited._id
  ) => {
    if (submit) {
      this.setState({
        isSubmitting: true,
      });
      return updateAchievement(id, achievement, this.props.userId).then((response) => {
        this.updateStateWithNewAchievement(response);
        this.setState({
          isSubmitting: false,
          achievementToBeEdited: {} as Achievement,
        });
      });
    } else {
      this.setState({
        isSubmitting: false,
        achievementToBeEdited: achievement,
      });
    }
  };

  updateStateWithNewAchievement = (achievement: Achievement) => {
    let { achievements } = this.state;
    let objectToUpdateIndex: number = achievements.findIndex(
      (item: Achievement) => item._id === achievement._id
    );

    achievements.splice(objectToUpdateIndex, 1, achievement as never);

    this.setState({ achievements });
  };

  removeAchievement = (id: string, submit?: boolean) => {
    let { achievements } = this.state;

    if (submit) {
      deleteAchievement(id, this.props.userId).then(() => {
        this.setState({
          achievements: achievements.filter(
            (item: Achievement) => item._id !== id
          ),
        });
      });
    } else {
      this.setState({
        idOfItemToBeDeleted: id,
      });
    }
  };

  render() {
    let {
      achievements,
      successAlert,
      errorAlert,
      achievementToBeEdited,
      idOfItemToBeDeleted,
      isLoading,
      isCreateModalOpened,
      isSubmitting,
    } = this.state;

    return (
      <>
        <header className="d-flex justify-content-between container mt-5">
          <h3> Achievements </h3>
          <button
            className="btn btn-success"
            onClick={() => this.setState({ isCreateModalOpened: true })}
          >
            <FontAwesomeIcon icon={faPlus} /> Create New Achievement
          </button>
        </header>
        {isLoading ? (
          <div className="text-center mt-5">
            <Loading />
          </div>
        ) : achievements && achievements.length > 0 ? (
          <div className="container mt-5">
            <AdminTable
              config={this.tableConfig}
              triggerEditEvent={this.editAchievement}
              deleteRow={this.removeAchievement}
              tableBody={achievements as any}
            />
          </div>
        ) : (
          <div className="text-center my-5">
            <p>No Achievements yet</p>
          </div>
        )}

        {Object.keys(achievementToBeEdited).length > 1 && (
          <AchievementForm
            isModalOpened={Object.keys(achievementToBeEdited).length > 1}
            itemToBeEdited={achievementToBeEdited}
            onSubmit={this.editAchievement}
            isSubmitting={isSubmitting}
            closeModal={() =>
              this.setState({ achievementToBeEdited: {} as Achievement })
            }
          />
        )}

        <AchievementForm
          isModalOpened={isCreateModalOpened}
          isSubmitting={isSubmitting}
          onSubmit={this.createAchievement}
          closeModal={() => this.setState({ isCreateModalOpened: false })}
        />

        <SweetAlert
          show={!!successAlert}
          success
          title={successAlert || " "}
          timeout={2000}
          onConfirm={() => this.setState({ successAlert: null })}
        />

        <SweetAlert
          show={!!errorAlert}
          warning
          title="An error occurred"
          timeout={2000}
          onConfirm={() => this.setState({ errorAlert: null })}
        >
          {errorAlert}
        </SweetAlert>

        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={() => {
            this.removeAchievement(idOfItemToBeDeleted, true);
            this.setState({ idOfItemToBeDeleted: "" });
          }}
          onCancel={() => this.setState({ idOfItemToBeDeleted: "" })}
          focusCancelBtn
          show={!!idOfItemToBeDeleted}
        >
          You will not be able to recover this item !
        </SweetAlert>
      </>
    );
  }
}
