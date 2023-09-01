import React,{ useState } from 'react' 
import './App.css'



function App() { 
  
  const [inputValue, setInputValue] = useState("")
  const [list, setList] = useState([])


  function handleClick(e){
      e.preventDefault();
      console.log(inputValue)
      setList([...list, inputValue])
      setInputValue("")
  }


  function handleDlt(e, index){
     e.preventDefault();
     console.log(index)
  }


  
 console.log(list)
  return ( 
      <div className='container'>  
           <div>Make Your List.</div>
           <div className='form'> 
           <input type='text' value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}></input>
           <button onClick={e => handleClick(e)}>Add</button>
           </div>
           <div className='todo-list'>
            <ul>

              {
               list &&   list.map((value, index) => {
                    return (<li key={index}>{value}<button >Edit</button> <button onClick={e=>{handleDlt(e, index)}}>Delete</button></li> )
                  })
              }

            </ul>
           </div>
      </div>
  )
}

export default App
