import { useState } from 'react'
import DisplayCard from './components/Displaycard.jsx'
import Header from './components/HeaderScore.jsx'
import './App.css'

let scoreGlobal = 0
function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [nextLevel, setNextLevel] = useState(1)

  const changeScore = () =>{
    setScore(score+1);
    }

  const runEndScore = () => {
    if(score>bestScore){
      setBestScore(score)
    }
    scoreGlobal = score  
    setScore(0)
  }
  const upLevel = () =>setNextLevel(nextLevel+1)
  return (
    <>
      <Header props={score} prop2={bestScore} addLevel={nextLevel}/>
      <DisplayCard addScore={changeScore} endScore={runEndScore} lastScore={scoreGlobal} upLevel={upLevel}/>
    </>
  )
}

export default App
