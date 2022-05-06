import React, { useState } from 'react'

function Music() {
    //const [playing, setPlaying] = useState(true);
    let audio = new Audio("/musicAndTheme.mp3")

    const start = () => {
        audio.play()
      }

      const pause = () => {
          audio.pause()
      }

  return (
    <div className='music'>
      <button onClick={start}>Music on</button> 
      <button onClick={pause}>Music Off</button>
    </div>
  )
}

export default Music