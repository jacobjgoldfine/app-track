import React, { Component } from "react";
import Board from "react-trello";

const data = require("./data.json");

const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (
  cardId,
  sourceLaneId,
  targetLaneId,
  cardDetails,
  position
) => {
  console.log("drag ended");
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
  console.log(`cardDetails : ${cardDetails}`);
  console.log("postion", position);
};

class App extends Component {
  state = { boardData: { lanes: [] } };

  setEventBus = (eventBus) => {
    this.setState({ eventBus });
  };

  async componentWillMount() {
    const response = await this.getBoard();
    this.setState({ boardData: response });
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  completeCard = () => {
    //adding card to the lane
    this.state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "APPLIED",
      card: {
        id: "Example1",
        jobTitle: "Senior Developer",
        companyName: "Tech Inc",
        salary: 120000,
        location: "Dallas, TX",
        date_submitted: "10/06/2021",
        user_id: 1,
      },
    });
    //removing card from the lane
    this.state.eventBus.publish({
      type: "REMOVE_CARD",
      laneId: "WISHLIST",
      cardId: "Example1",
    });
  };

  addCard = () => {
    this.state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "WISHLIST",
      card: {
        id: "Example4",
        jobTitle: "Senior Developer",
        companyName: "Tech Inc",
        salary: 120000,
        location: "Dallas, TX",
        date_submitted: "10/06/2021",
        user_id: 1,
      },
    });
  };

  shouldReceiveNewData = (nextData) => {
    // console.log("New card has been added");
    // console.log(nextData);
  };

  handleCardAdd = (card, laneId) => {
    // console.log(`New card added to lane ${laneId}`);
    // console.dir(card);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Kaban Board</h3>
        </div>
        <div className="App-intro">
          {/* <button onClick={this.completeCard} style={{ margin: 5 }}>
            Complete Buy Milk
          </button>
          <button onClick={this.addCard} style={{ margin: 5 }}>
            Add Blocked
          </button> */}
          <React.Fragment>
            <Board
              editable
              onCardAdd={this.handleCardAdd}
              data={this.state.boardData}
              draggable={false}
              onDataChange={this.shouldReceiveNewData}
              eventBusHandle={this.setEventBus}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default App;
