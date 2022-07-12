/** @format */
import Dice from "./components/Die"
import { React, useEffect, useState } from "react"
import "./components/Dice.css"

function DiceGame() {
  const [populate, setPopulate] = useState(allNewDice())
  const [score, setScore] = useState(0)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    let LAnswer = populate.every(x => x.isHeld === true)

    let Nanswer = populate.every(x => x.value === populate[0].value)

    if (Nanswer && LAnswer) {
      console.log(`Game Over`)
      setTenzies(true)
    }
  }, [populate])

  function gameOver() {
    if (tenzies) {
      setPopulate(allNewDice())
      setScore(0)
      setTenzies(false)
    }
  }

  function allNewDice() {
    const array = []
    for (let i = 0; i < 10; i++) {
      array.push({ value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: i })
    }
    return array
  }

  function reroll() {
    scores()
    setPopulate(x =>
      x.map(x => {
        return x.isHeld === true ? x : { ...x, value: Math.floor(Math.random() * 6 + 1) }
      })
    )
    gameOver()
  }
  function scores() {
    setScore(x => x + 1)
  }
  function Uno(id) {
    setPopulate(oldDice =>
      oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  const diceElements = populate.map((x, i) => (
    <Dice key={i} value={x.value} isHeld={x.isHeld} click={() => Uno(x.id)} />
  ))

  return (
    <div className="DiceApp">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value
        between rolls.
      </p>
      <p className="score">Score: {score}</p>
      <p className="sss">(Lower the better)</p>
      <div className="SWrapper">{diceElements}</div>
      <button className="RollDice" onClick={reroll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  )
}

export default DiceGame
