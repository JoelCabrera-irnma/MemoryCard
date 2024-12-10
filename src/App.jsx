import { useState } from 'react'
import DisplayCard from './components/Displaycard.jsx'
import Header from './components/HeaderScore.jsx'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  const changeScore = () =>{setScore(score+1);}
  const runEndScore = () => {
    if(score>bestScore){
      setBestScore(score)
    }
    setScore(0)
  }
  
  return (
    <>
      <Header props={score} prop2={bestScore}/>
      <DisplayCard params={changeScore} endScore={runEndScore} />
    </>
  )
}

export default App
