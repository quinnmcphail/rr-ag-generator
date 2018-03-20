import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/fontawesome-free-solid";

class Range extends Component {
  removeRange = e => {
    this.props.removeRange(this.props.index);
  };
  render() {
    return (
      <tr>
        <th scope="row">{this.props.range.name}</th>
        <td>{this.props.range.abbr}</td>
        <td>{this.props.range.gender}</td>
        <td>{this.props.range.start}</td>
        <td>{this.props.range.end}</td>
        <td>
          <FontAwesomeIcon icon={faTrashAlt} className="text-danger" onClick={this.removeRange} style={{cursor:'pointer'}}/>
        </td>
      </tr>
    );
  }
}

export default Range;
