function Door({isOpen, isCar, isSelected, click, order}) {
  return(
    <div className="door" onClick={() => click(order)}>
        {isOpen && (isCar && <Car /> || <Goat />) || <DoorImg />}
        {isSelected && "Selected"}
    </div>
  )
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    const doors = []
    for (let i = 0; i < this.props.numberOfDoors; i++) {
      doors.push({isCar: false, isOpen: false, isSelected: false})
    }
    this.state = {
      doors,
      isOneSelected: false
    }
    this.shuffle = this.shuffle.bind(this)
    this.openGoatDoor = this.openGoatDoor.bind(this)
    this.reveal = this.reveal.bind(this)
  }

  componentWillMount() {
    this.shuffle()
  }

  shuffle() {
    let doors = this.state.doors
    const newDoors = []
    for (let i = 0; i < this.props.numberOfDoors; i++) {
      newDoors.push({isCar: false, isOpen: false, isSelected: false})
    }
    const carDoor = parseInt(Math.random() * 10 * this.props.numberOfDoors) % (this.props.numberOfDoors)
    newDoors[carDoor].isCar = true
    this.setState({doors: newDoors, isOneSelected: false})
  }

  openGoatDoor(doorNumber) {
    let doors = this.state.doors
    doors[doorNumber].isSelected = true
    if (!doors[doorNumber].isCar) {
      doors.forEach((door, i) => !door.isCar && doorNumber != i ? door.isOpen = true : door.isOpen = false)
    } else {
      do { var random = parseInt(Math.random() * 10 * this.props.numberOfDoors) % (this.props.numberOfDoors) } while(random == doorNumber)
      doors.forEach((door, i) => !door.isCar && doorNumber != i && i != random ? door.isOpen = true : door.isOpen = false)
    }
    this.setState({doors, isOneSelected: true})
  }

  reveal(doorNumber) {
    let doors = this.state.doors
    doors[doorNumber].isOpen = true
    this.setState({doors})
  }

  render() {
    return(
      <div className="row">
        <div className="doors">
          {this.state.doors.map((door, i) => {
            const {isCar, isOpen, isSelected} = door
            return <Door
              key={i}
              order={i}
              isOpen={isOpen}
              click={!this.state.isOneSelected ? this.openGoatDoor : this.reveal}
              isCar={isCar}
              isSelected={isSelected}
              />
          })}
        </div>
        <span onClick={this.shuffle}>Reset</span>
      </div>
    )
  }
}

function Goat() {
  return(
    <img src="./goat.png" alt="Goat draw"/>  
  )
}

function DoorImg() {
  return(
    <img src="./door.png" alt="Door draw"/>  
  )
}

function Car() {
  return(
    <img src="./car.png" alt="Car draw"/>  
  )
}

ReactDOM.render(
  <Row numberOfDoors={3}/>,
  document.getElementById('root')
);