import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlus, faBan, faEraser } from "@fortawesome/fontawesome-free-solid";

class AddSingleForm extends Component {
  constructor() {
    super();
    this.state = {
      gender: "m",
      start: "",
      end: "",
      name: "",
      abbr: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.createRange = this.createRange.bind(this);
  }

  clearForm = e => {
    e.preventDefault();
    this.setState({
      gender: "m",
      start: "",
      end: "",
      name: "",
      abbr: ""
    });
  };

  deleteRanges = e => {
    e.preventDefault();
    this.props.deleteRanges();
  };

  createRange = e => {
    e.preventDefault();
    let ranges = [];
    const range = {...this.state};
    if (range.gender === "b") {
      let rangeM = { ...range };
      rangeM.gender = "m";
      rangeM.name = rangeM.name.replace(/!G/g, "M");
      rangeM.name = rangeM.name.replace(/!g/g, "Male");
      rangeM.name = rangeM.name.replace(/!b/g, rangeM.start);
      rangeM.name = rangeM.name.replace(/!e/g, rangeM.end);
      rangeM.abbr = rangeM.abbr.replace(/!G/g, "M");
      rangeM.abbr = rangeM.abbr.replace(/!g/g, "Male");
      rangeM.abbr = rangeM.abbr.replace(/!b/g, rangeM.start);
      rangeM.abbr = rangeM.abbr.replace(/!e/g, rangeM.end);
      ranges.push(rangeM);

      let rangeF = { ...range };
      rangeF.gender = "f";
      rangeF.name = rangeF.name.replace(/!G/g, "F");
      rangeF.name = rangeF.name.replace(/!g/g, "Female");
      rangeF.name = rangeF.name.replace(/!b/g, rangeF.start);
      rangeF.name = rangeF.name.replace(/!e/g, rangeF.end);
      rangeF.abbr = rangeF.abbr.replace(/!G/g, "F");
      rangeF.abbr = rangeF.abbr.replace(/!g/g, "Female");
      rangeF.abbr = rangeF.abbr.replace(/!b/g, rangeF.start);
      rangeF.abbr = rangeF.abbr.replace(/!e/g, rangeF.end);
      ranges.push(rangeF);
    } else {
      range.gender = range.gender;
      range.name = range.name.replace(/!G/g, range.gender === "f" ? "F" : "M");
      range.name = range.name.replace(
        /!g/g,
        range.gender === "f" ? "Female" : "Male"
      );
      range.name = range.name.replace(/!b/g, range.start);
      range.name = range.name.replace(/!e/g, range.end);
      range.abbr = range.abbr.replace(/!G/g, range.gender === "f" ? "F" : "M");
      range.abbr = range.abbr.replace(
        /!g/g,
        range.gender === "f" ? "Female" : "Male"
      );
      range.abbr = range.abbr.replace(/!b/g, range.start);
      range.abbr = range.abbr.replace(/!e/g, range.end);
      ranges.push(range);
    }
    this.props.addRange(ranges);
  };

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  render() {
    return (
      <form onSubmit={this.createRange}>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control form-control-sm"
            name="gender"
            value={this.state.gender}
            onChange={this.handleChange}
          >
            <option value="m">M</option>
            <option value="f">F</option>
            <option value="b">Both</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="start">Beginning Age</label>
          <input
            className="form-control form-control-sm"
            name="start"
            type="number"
            value={this.state.start}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">Ending Age</label>
          <input
            className="form-control form-control-sm"
            name="end"
            type="number"
            value={this.state.end}
            onChange={this.handleChange}
          />
        </div>
        <hr />
        <p className="lead">
          Note: Use !G for gender abbr., use !g for full gender name, use !b for
          beginning age in range, use !e for ending age in range.
        </p>
        <p className="lead">Example: "!G !b-!e" turns into "M 20-24"</p>
        <div className="form-group">
          <label htmlFor="name">Age Group Name</label>
          <input
            className="form-control form-control-sm"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="abbr">Age Group Abbreviation</label>
          <input
            className="form-control form-control-sm"
            name="abbr"
            type="text"
            value={this.state.abbr}
            onChange={this.handleChange}
          />
        </div>
        <div className="btn-group" role="group" aria-label="Form controls">
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.clearForm}
          >
            <FontAwesomeIcon icon={faEraser} /> Clear Form
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.deleteRanges}
          >
            <FontAwesomeIcon icon={faBan} /> Reset Age Groups
          </button>
        </div>
      </form>
    );
  }
}

export default AddSingleForm;
