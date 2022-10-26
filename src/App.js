import React, { useEffect, useRef, useState } from 'react'
import "./App.css"

function generateNumber(max){
  return Math.floor(Math.random() * (max + 1))
}

function generateProblem(){
  return {
    num1: generateNumber(10),
    num2: generateNumber(10),
    operation: ['x','+','-'][generateNumber(2)]
  }
}

function App() {
  const [updateProblem, setUpdateProblem] = useState(generateProblem())
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [mistake, setMistake] = useState(0)
  const [showError, setShowError] = useState(false)
  const inputRef = useRef()
  const buttonRef = useRef()

  function resetGame(){
    setAnswer('')
    setMistake(0)
    setScore(0)
    setUpdateProblem(generateProblem())
    inputRef.current.focus()
  }

  useEffect(() => {
    if(score === 10 || mistake === 3){
      setTimeout(() => buttonRef.current.focus(), 350)
    }
  }, [score, mistake])

  function handleSubmit(e){
    e.preventDefault()
    let result
    
    if(updateProblem.operation === '+') result = updateProblem.num1 + updateProblem.num2
    if(updateProblem.operation === 'x') result = updateProblem.num1 * updateProblem.num2
    if(updateProblem.operation === '-') result = updateProblem.num1 - updateProblem.num2
    
    if(parseInt(answer, 10) === result){
      setAnswer('')
      setUpdateProblem(generateProblem())
      setScore(prev => prev + 1)
      inputRef.current.focus()
    }
    else{
      setAnswer('')
      setMistake(prev => prev + 1)
      setShowError(true)
      setTimeout(() => setShowError(false), 330)
    }
  }

  return (
    <div className="wrapper">

      <div className={`container ${ score === 10 || mistake === 3 ? 'show blured' : ''}` }>
        <h1>Guess the answer</h1>
        <h3 className={`problem ${showError ? ' animate-wrong' : ''}`}> {updateProblem.num1} {updateProblem.operation} {updateProblem.num2} </h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={answer} ref={inputRef} onChange={e => setAnswer(e.target.value)} />
          <button>Submit</button>
        </form>
        <p>your score is {score} and remaining mistakes is { 2 - mistake} </p>
        <ProgressBar score={score} />
      </div>

      <div className={'game-end ' } style={{ backdropFilter: score === 10 || mistake === 2 ? 'blur(3px)' : '' }}>
        <h2>Game</h2>
        <button ref={buttonRef} onClick={resetGame}>Restart</button>
      </div>
    </div>
  )
}

export default App


function ProgressBar({score}){
  return (
    <div className="progress-bar">
      <div className="boxes">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>

      <div className="inner-progress" style={{ transform: `scaleX(${score/10})`}}></div>
    </div>
  )
}