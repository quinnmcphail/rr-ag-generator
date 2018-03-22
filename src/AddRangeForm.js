import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlus, faBan, faEraser } from "@fortawesome/fontawesome-free-solid";

class AddRangeForm extends Component {
  constructor() {
    super();
    this.state = {
      gender: "m",
      beginningAge: "",
      rangeLength: "",
      iterations: "",
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
      beginningAge: "",
      rangeLength: "",
      iterations: "",
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
    const currentRange = { ...this.state };
    let currentAge = Number(currentRange.beginningAge);
    for (let i = 0; i < currentRange.iterations; i++) {
      let range = {
        start: currentAge,
        end:
          currentAge +
          (Number(currentRange.rangeLength) - 1 > 0
            ? Number(currentRange.rangeLength) - 1
            : Number(currentRange.rangeLength) === 0 ? 0 : 1),
        name: currentRange.name,
        abbr: currentRange.abbr
      };
      currentAge = range.end + 1;
      if (currentRange.gender === "b") {
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
        range.gender = currentRange.gender;
        range.name = range.name.replace(
          /!G/g,
          range.gender === "f" ? "F" : "M"
        );
        range.name = range.name.replace(
          /!g/g,
          range.gender === "f" ? "Female" : "Male"
        );
        range.name = range.name.replace(/!b/g, range.start);
        range.name = range.name.replace(/!e/g, range.end);
        range.abbr = range.abbr.replace(
          /!G/g,
          range.gender === "f" ? "F" : "M"
        );
        range.abbr = range.abbr.replace(
          /!g/g,
          range.gender === "f" ? "Female" : "Male"
        );
        range.abbr = range.abbr.replace(/!b/g, range.start);
        range.abbr = range.abbr.replace(/!e/g, range.end);
        ranges.push(range);
      }
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
          <label htmlFor="beginningAge">Beginning Age</label>
          <input
            className="form-control form-control-sm"
            name="beginningAge"
            type="number"
            value={this.state.beginningAge}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rangeLength">Age Group Size (years)</label>
          <input
            className="form-control form-control-sm"
            name="rangeLength"
            type="number"
            value={this.state.rangeLength}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="iterations">Number of Iterations</label>
          <input
            className="form-control form-control-sm"
            name="iterations"
            type="number"
            value={this.state.iterations}
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

export default AddRangeForm;
