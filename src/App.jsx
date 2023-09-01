import React,{ useState } from 'react' 
import './App.css'



function App() { 
  
  const [inputValue, setInputValue] = useState("")
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [doneList, setDoneList] = useState([])
  const [crntIndex, setCrntIndex] = useState(0);


//--------------------------------------ADDING TO LIST---------------------------//
  function handleClick(e){
      e.preventDefault(); 

      // if(edit){

         let filterEdit = list.filter((li, listIndex) => {
             return listIndex !== crntIndex
         })

      setList([...filterEdit, {item:inputValue, done:false}])
      setInputValue("")
      //    setEdit(false)
         
      // }else { 
      setList([...list, {item:inputValue, done:false}])
      setInputValue("")
      // }
 
  }
 

//---------------------------------EDITING LIST-------------------------------//
  function handleEdit(e,index, li){
     e.preventDefault()
     console.log(li.item)
    //  setInputValue(value)
     setEdit(true)
     setCrntIndex(index)
  }

  
//-------------------------------------DELETING FROM LIST-----------------------//
function handleDlt(e, index){
  e.preventDefault();
  const filter = list.filter((li, listIndex) => {
       return listIndex !== index
  })

  setList(filter)
}


//------------------------------------COMPLETE FROM LIST------------------------//

// function handleComplete(e, index){
//   e.preventDefault();
//   setIsDone((index === doneList[index]) ? true : false)
//     if(!isDone){ 
//       setDoneList([...doneList, index])
//       console.log("i am good")
//     }
//     else{
     
//       const filterCrossLine = list.filter((li, listIndex) => {
//           return listIndex !== index
//       })
// console.log(filterCrossLine)
// console.log("how are you")
//       setDoneList(filterCrossLine)
//     }

// } 




 console.log(list)

  return ( 
      <div className='container'>  
           <div>Make Your List.</div>
           <div className='form'> 
           <input type='text' value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}></input>
           <button onClick={e => handleClick(e)}>Add</button>
           </div>

           <div className='todos'>
            <ul>
              {
                 list.map((li, index) => {
                    return (
                      <li key={index}>{li.item}
                      <button onClick={(e) => handleEdit(e, index, li)}>Edit</button> 
                      <button onClick={e=>{handleDlt(e, index)}}>Delete</button>

                      </li>
                    )
                 })
              }
            </ul>
           </div>

           <div className='todo-list'>
            {/* <ul>

              {
               list &&   list.map((value, index) => {
                    return (
                      <li key={index}  
                      style={{textDecoration: index === doneList[index] ?  'line-through' : 'none'}}>{value}
                    <button onClick={(e) => handleEdit(e, value, index)}>Edit</button> 
                    <button onClick={e=>{handleDlt(e, index)}}>Delete</button>
                    <button onClick={(e) => {handleComplete(e, index)}}>{ (index === doneList[index]) ? "Undo": "Done"}</button>
                    </li> 
                    )
                  })
              }

            </ul> */}
           </div>
      </div>
  )
}

export default App
