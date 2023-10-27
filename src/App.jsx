import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [doneList, setDoneList] = useState([]);
  const [crntIndex, setCrntIndex] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const istOptions = { timeZone: "Asia/Kolkata" };


  //--------------------------------------ADDING TO LIST---------------------------//
  function handleClick(e) {
    e.preventDefault();

    if (edit) {
      let filterEdit = list.filter((li, listIndex) => {
        return listIndex !== crntIndex;
      });

      setList([...filterEdit, { item: inputValue, isDone: false }]);
      setInputValue("");
      setEdit(false);
    } else {
      setList([...list, { item: inputValue, isDone: false }]);
      setInputValue("");
    }
  }

  //---------------------------------EDITING LIST-------------------------------//
  function handleEdit(e, index, li) {
    e.preventDefault();
    console.log(li.item);
    setInputValue(li.item);
    setEdit(true);
    setCrntIndex(index);
  }

  //-------------------------------------DELETING FROM LIST-----------------------//
  function handleDlt(e, index) {
    e.preventDefault();
    const filter = list.filter((li, listIndex) => {
      return listIndex !== index;
    });

    setList(filter);
  }

  //------------------------------------COMPLETE FROM LIST------------------------//

  function handleComplete(e, index, li) {
    e.preventDefault();

    const filterCrossLine = list.filter((li, listIndex) => {
      return listIndex !== index;
    });

    if (li.isDone === true) {
      li.isDone = false;
      setList([li, ...filterCrossLine]);
    } else {
      li.isDone = true;
      console.log("i am good");
      setList([li, ...filterCrossLine]);
    }
  }

  //---------------------------- for devices battery check--------------------
  useEffect(() => {
    navigator.getBattery().then((battery) => {
      
      // Update the battery level
      setBatteryLevel(battery.level * 100);
      battery.addEventListener("levelchange", () => {
        setBatteryLevel(battery.level * 100);
      });
    });
  }, []);


  // -------------------------Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
 



  return (
    <div>
      <div className="toper">
        <div className="left"> 
          <p>{currentTime.toLocaleTimeString("en-IN", istOptions)}</p>
        </div>
        <div className="right">
          {" "}
          <span className="batterySpan">
            <span className="clr" style={{ width: batteryLevel * 0.25, backgroundColor: (batteryLevel <= 20) ? "yellow" : (batteryLevel <= 20) ? "red" : "white"}}></span>
            <Battery0BarIcon className="battery" sx={{ fontSize: 44 }} />{" "}
            {batteryLevel && batteryLevel}%{" "}
          </span>
        </div>
      </div>
      <h1>Stay on Top of Your Priorities:</h1>
      <div className="container">
        <h2>Make Your List.</h2>
        <div className="form">
          <input
            placeholder="Write Your to do..."
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></input>
          <button className="addBtn" onClick={(e) => handleClick(e)}>
            Add
          </button>
        </div>

        <div className="todos">
          <ul>
            {list.map((li, index) => {
              return (
                <li
                  key={index}
                  style={{
                    textDecoration: li.isDone ? "line-through" : "none",
                  }}
                >
                  {li.item}
                  <span>
                    <button
                      className="editBtn"
                      onClick={(e) => handleEdit(e, index, li)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={(e) => {
                        handleDlt(e, index);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                    <button
                      className="doneBtn"
                      onClick={(e) => {
                        handleComplete(e, index, li);
                      }}
                    >
                      {li.isDone ? "Undo" : "Done"}
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="todo-list">
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
    </div>
  );
}

export default App;
