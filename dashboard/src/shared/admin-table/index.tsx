import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./style.css";

interface Prop {
  config: {
    tableHeaders: any[];
    className: string;
    actions: string[];
    filters?: ((filter: string) => void)[];
  };
  tableBody: any[];
  triggerEditEvent?: (item: any, submit: boolean, id?: string) => void;
  deleteRow: (id: string, isToBeSubmitted: boolean) => void;
}

export default class AdminTable extends Component<Prop> {
  renderTableHeaders = () => {
    let { tableHeaders } = this.props.config;

    return tableHeaders.map((header: any, index) => {
      if (typeof header === "object") {
        return (
          <th key={index} scope="col">
            {header.name.toUpperCase()}
          </th>
        );
      } else {
        return (
          <th key={index} scope="col">
            {header.toUpperCase()}
          </th>
        );
      }
    });
  };

  renderTableBody = () => {
    let { tableBody, config } = this.props;
    return tableBody.map((item, index) => (
      <tr key={index}>
        {this.props.config.tableHeaders.map((keyHeader: any) => {
          if (typeof keyHeader === "object") {
            return (
              <td key={keyHeader.name}>
                <Link
                  to={`${keyHeader.href}/${
                    keyHeader.params ? item[keyHeader.params] : ""
                  }`}
                >
                  {item[keyHeader.name]}
                </Link>
              </td>
            );
          } else {
            return <td key={keyHeader}> {item[keyHeader]} </td>;
          }
        })}
        <td>
          {config.actions.includes("edit") && this.renderEditBtn(item)}
          {config.actions.includes("delete") && this.renderDeleteBtn(item)}
        </td>
      </tr>
    ));
  };

  renderEditBtn = (item: any) => {
    let { triggerEditEvent } = this.props;

    return (
      <button
        className="btn btn-secondary mr-2"
        data-toggle="modal"
        data-target="#editModal"
        title="Edit Item"
        onClick={() => triggerEditEvent(item, false, item._id)}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  };

  renderDeleteBtn = (item: any) => {
    let { deleteRow } = this.props;

    return (
      <button
        className="btn btn-danger"
        onClick={() => deleteRow(item._id, false)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  };

  render() {
    let { className } = this.props.config;
    return (
      <>
        <table className={`${className} table`}>
          <thead>
            <tr>
              {this.renderTableHeaders()}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </>
    );
  }
}
