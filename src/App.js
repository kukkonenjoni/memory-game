import React from 'react'
import RenderChamps from './components/RenderChamps';

class App extends React.Component {
  constructor() {
      super();
      this.state = {
        champions: "",
        curr_field: "",
        gamestate: true,
        count: 0,
        multiplier: 4,
        points: 0,
        highScore: 0
      }
      this.randomChamps = this.randomChamps.bind(this)
      this.updateField = this.updateField.bind(this)
  }
  populateChampion(data) {
    let empty = []
    for (let champion in data) {
      let champ = [data[champion].id, data[champion].image.full]
      empty.push(champ)
    }
    console.log(empty)
    this.setState({champions: empty})
  }
  componentDidMount() {
    fetch("http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json")
    .then(response => response.json()).then(data => data.data).then(data => this.populateChampion(data))
  }
  randomChamps() {
    let nums = []
    let empty = []
    for (let i = 1; i <= this.state.multiplier; i++) {
      let random = Math.floor(Math.random() * 145);
      if (nums.includes(random)) {
        i--
      } else {
        let new_arr = this.state.champions[random].slice(0,2)
        empty.push(new_arr)
        nums.push(random)
      }
    }
    this.setState({curr_field: empty})
  }
  updateField(e, index, all_champs) {
    let new_arr = all_champs.slice()
    if (new_arr[index][2] == true) {
      this.setState({gamestate: false})
      this.setState({points: 0})
    }
    else {
      new_arr[index][2] = true
      this.setState({curr_field: new_arr})
      this.setState(prevState => ({count: prevState.count +1}))
      this.setState(prevState=> ({points: prevState.points+1}))
    }
    if (this.state.count > this.state.multiplier - 2) {
      this.setState({curr_field: ""})
      this.setState({count: 0})
      this.setState(prevState => ({multiplier: prevState.multiplier + 1}))
      console.log(this.state.curr_field)
    }
    console.log(this.state.curr_field)
  }
  render() {
    let display;
    if (this.state.gamestate == false) {
      display = <h1>You Lost</h1>
    }
    else if (this.state.curr_field === "" && this.state.champions.length > 100) {
      this.randomChamps()
    }
    else if (this.state.champions.length > 140 && this.state.curr_field !== "") {
      display = <RenderChamps value={this.state.curr_field} btn={this.updateField}/>
    }
    else {
      display = <h1>Loading....</h1>
    }
    return(
      <div className="container">
        <div className="header">
          <h1>Memory Game</h1>
          <h1>Points: {this.state.points}</h1>
        </div>
        {display}
        <div className="header">
          <h1>How To Play</h1>
          <p>1. Click champion once</p>
          <p>2. After click, icons may or may not change position</p>
          <p>3. After clicking one champion click next one until all champions have been clicked </p>
          <p>4. After finishing round 1, more and different champions appear</p>
          <p>5. Play for aslong as you can</p>
        </div>
      </div>
    )
  }
}

export default App