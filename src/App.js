import React, { Component } from "react";
import Logo from "./rr11logo.jpg";
import AddRangeForm from "./AddRangeForm";
import AddSingleForm from "./AddSingleForm";
import RangeList from "./RangeList";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faDownload
} from "@fortawesome/fontawesome-free-solid";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

class App extends Component {
  state = {
    ranges: []
  };

  addRange = range => {
    const ranges = [...this.state.ranges];
    range = [...range];
    range.map((e, i) => ranges.push(e));
    this.setState({ ranges }, () => this.sortRanges());
  };

  removeRange = key => {
    const ranges = [...this.state.ranges];
    ranges.splice(key, 1);
    this.setState({ ranges }, () => this.sortRanges());
  };

  deleteRanges = () => {
    this.setState({ ranges: [] });
  };

  downloadAgeGroups = () => {
    const ranges = [...this.state.ranges];
    let fileContent = "";
    ranges.map(
      range =>
        (fileContent += `${range.name};${range.abbr};${range.gender};${
          range.start
        };${range.end}\n`)
    );
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent)
    );
    element.setAttribute("download", `ageGroups-${Date.now()}.lvs`);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  sortRanges = () => {
    const ranges = [...this.state.ranges].sort((a, b) => {
      if (a.gender < b.gender) return -1;
      if (a.gender > b.gender) return 1;
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });
    this.setState({ ranges });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">
            <img
              id="rr11logo"
              src={Logo}
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Age Group Generator
          </a>
          <button
            type="button"
            className="btn btn-success d-none d-lg-block"
            onClick={this.downloadAgeGroups}
          >
            <FontAwesomeIcon icon={faDownload} /> Download .LVS File
          </button>
        </nav>
        <div className="container">
          <div className="row d-lg-none">
            <div className="col">
              <div className="alert alert-danger" role="alert">
                <FontAwesomeIcon icon={faExclamationTriangle} /> This
                application is designed for desktop environments only.
              </div>
            </div>
          </div>
          <Accordion className="accordion d-none d-lg-block">
            <AccordionItem>
              <AccordionItemTitle>
                <h4>Add Age Group Range</h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div className="row">
                  <div className="col">
                    <AddRangeForm
                      addRange={this.addRange}
                      deleteRanges={this.deleteRanges}
                    />
                  </div>
                </div>
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <h4>Add Single Age Group</h4>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div className="row">
                  <div className="col">
                    <AddSingleForm
                      addRange={this.addRange}
                      deleteRanges={this.deleteRanges}
                    />
                  </div>
                </div>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
          {this.state.ranges.length > 0 && (
            <div className="row d-none d-lg-block">
              <div className="col">
                <RangeList
                  ranges={this.state.ranges}
                  removeRange={this.removeRange}
                />
              </div>
            </div>
          )}
        </div>
        <footer className="text-muted">
          <div className="container">
            <hr />
            <p>Made by <a href="https://twitter.com/quinnmcphail">Quinn McPhail</a></p>
            <p>race|result 11 Logo &copy; race result AG</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
