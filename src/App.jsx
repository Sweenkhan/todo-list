import React,{ useState } from 'react' 
import './App.css'



function App() { 
  
  const [inputValue, setInputValue] = useState("")
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false)


  function handleClick(e){
      e.preventDefault(); 

      setList([...list, inputValue])
      setInputValue("")
  }


  function handleDlt(e, index){
     e.preventDefault();
     const filter = list.filter((li, listIndex) => {
          return listIndex !== index
     })

     setList(filter)
  }




  function handleEdit(){

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
                    return (
                      <li key={index}>{value}
                    <button onClick={(e) => handleEdit(e, index)}>Edit</button> 
                    <button onClick={e=>{handleDlt(e, index)}}>Delete</button>
                    </li> 
                    )
                  })
              }

            </ul>
           </div>
      </div>
  )
}

export default App
