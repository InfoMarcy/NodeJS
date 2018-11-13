// imrc, cc cmd d to edit
import React, { Component } from "react";
class Counter extends Component {
  state = {
    count: 0,
    imageUrl: "https://picsum.photos/200/200/?random",
    tags: []
  };

  styles = {
    fontSize: 10,
    fomntWeight: "bold"
  };

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }


  // call from the button
  handleIncrement = () =>  {
    //console.log("Increment clicked", this);
    this.setState({ value : this.props.value} ); 
  }

    // call from the button
    handleDecrement = () =>  {
        //console.log("Increment clicked", this);
        this.setState({ value : this.state.count - 1} ); 
      }
  render() {
    return (
      <React.Fragment>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
         // onClick={ () => this.handleIncrement(product) } 

         onClick={ () => this.handleIncrement } 
          className="btn btn-secondary btn-sm m-2"
        >
          Increment
        </button>

        <button
          onClick={this.handleDecrement}
          className="btn btn-secondary btn-sm m-2"
        >
          Decrement
        </button>
        <br /> <br />
        <img className='img-thumbnail m-2' src={this.state.imageUrl} />
        <br /> <br />
        {this.state.tags.length === 0 && "Please create a new tag!"}
        {this.renderTags()}
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "zero" : count;
  }
}

export default Counter;
