import React, { Component } from "react";
import Range from "./Range";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/fontawesome-free-solid";

class RangeList extends Component {
  render() {
    return (
      <table className="table desktop">
        <thead>
          <tr>
            <th scope="col">Age Group</th>
            <th scope="col">Abbreviation</th>
            <th scope="col">Gender</th>
            <th scope="col">From Age</th>
            <th scope="col">To Age</th>
            <th scope="col">
              <FontAwesomeIcon icon={faTrashAlt} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.ranges).map(key => (
            <Range
              key={key}
              index={key}
              range={this.props.ranges[key]}
              removeRange={this.props.removeRange}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default RangeList;
