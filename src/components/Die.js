/** @format */

function Dice(props) {
  return (
    <div onClick={props.click} className={`Die ${props.isHeld === true ? "DieG" : " "}`}>
      {props.value}
    </div>
  )
}

export default Dice
