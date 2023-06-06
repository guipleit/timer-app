import { useState, useRef } from 'react';
import './styles/Timer.css';
import timerOver from './audio/timer-over.mp3'

export default function Timer() {
  const [timeInput, setTimeInput] = useState('');
  const [time, setTime] = useState('00:00:00'); 
  const [isStopped, setIsStopped] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const timerRef = useRef(null);

  const handleTimeInput = (event) => {
    if (event.target.value < 0) {
        setTimeInput(0);
        alert('Please enter a valid number');
        return;
    }

    if (event.target.value <= 0.1) {
        setTimeInput('');
        alert('Please enter a number greater or equal to 1.');
        return;
    }

    if (typeof event.target.value === 'string' && isNaN(event.target.value)) {
        setTimeInput('');
        alert('Please enter a number');
        return;
    }

    setTimeInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        startTimer(timeInput);
        event.target.blur();
        return;
    }
    };




  const startTimer = (inputTime) => {
    clearInterval(timerRef.current);
    setTimeInput('');

    let totalSeconds = remainingTime > 0 && isStopped ? remainingTime : inputTime * 60; 
    timerRef.current = setInterval(() => {
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor((totalSeconds % 3600) / 60);
      let remainingSeconds = totalSeconds % 60;

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

      setTime(`${hours}:${minutes}:${remainingSeconds}`);

      if (totalSeconds === 0) {
        new Audio(timerOver).play();
        clearInterval(timerRef.current);
        setIsStopped(true);
      } else {
        totalSeconds -= 1;
      }

      setRemainingTime(totalSeconds);
    }, 1000)

    setIsStopped(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime('00:00:00');
    setRemainingTime(0);
  }

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsStopped(true);
  }

  return (
  <div className='timer-app'>
    <div className='main-container'>
      <header className='header'>Timer App</header>
      <h5 className='timer-display'>{ time }</h5>
      <input 
        type='number' 
        className='timer-input' 
        placeholder={'Enter time in minutes'}
        value={ timeInput }
        onChange={ handleTimeInput }
        onKeyDown={ handleKeyPress }
      />
    </div>
    <div className="buttons-row-time">
      <button onClick={ () => startTimer(5) }>5 minutes</button>
      <button onClick={ () => startTimer(10) }>10 minutes</button>
      <button onClick={ () => startTimer(25) }>25 minutes</button>
    </div>
    <div className="buttons-row-btns"> 
      <button onClick={ stopTimer } className='stop-btn'>Stop</button>    
      <button onClick={ () => startTimer(timeInput) } className='start-btn'>Start</button>  
      <button onClick={ resetTimer } className='reset-btn'>Reset</button>
    </div>
    <footer className='footer'>
        <span>Desenvolvido por: </span><a href='https://github.com/guipleit'>Guilherme Leite</a>
    </footer>     
  </div>
);
}
