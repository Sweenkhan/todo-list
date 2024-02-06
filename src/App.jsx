import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "../App.css";

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
    console.log(list);
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

  //----------------------------export data ----------------------
  // function createHeaders(keys) {
  //   const result = [];

  //   for (let key of keys) {
  //     result.push({
  //       id: key,
  //       name: key,
  //       done: key,
  //     });
  //   }

  //   return result;
  // }


  async function exportData() {
    // const headers = createHeaders(["id", "name", "done"]);
     const headers =  ["id", "name", "done"] ;


    const doc = new jsPDF();

    const tableData = list.map((row, index) => ({
      ...row,
      id: (index + 1).toString(),
      name: row.item.toString(),
      done: row.isDone.toString(),
    }));

    doc.table(1, 1, tableData, headers, { autoSize: true });

    doc.save("todoData.pdf");
  }


//------------------------------------CLEAR ALL TODOS-----------------

 

  return (
    <div>
      <div className="toper">
        <div className="left">
          <p>{currentTime.toLocaleTimeString("en-IN", istOptions)}</p>
        </div>
        <div className="right">
          {" "}
          <span className="batterySpan">
            <span
              className="clr"
              style={{
                width: batteryLevel * 0.25,
                backgroundColor:
                  batteryLevel <= 20
                    ? "yellow"
                    : batteryLevel <= 20
                    ? "red"
                    : "white",
              }}
            ></span>
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
                  key={index}>
                  <span 
                  className="content"
                  style={{
                    textDecoration: li.isDone ? "line-through" : "none",

                  }}>
                  {li.item}
                  </span>
                  <span className="listBtn">
                    <button
                      className="editBtn"
                      onClick={(e) => handleEdit(e, index, li)}
                    >
                      <EditIcon sx={{ fontSize: 22 }}/>
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={(e) => {
                        handleDlt(e, index);
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 22 }}/>
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
        <div className="btns">
       {(list.length > 1) && <button className="exportBtn"
          onClick={() => {
            exportData();
          }}
        >
          Export
        </button>}
        {(list.length > 1)&&  <button onClick={(e) => {setList([])}}>Clear</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
