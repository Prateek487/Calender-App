import {useRef, useState} from 'react';

import classes from './MainPage.module.css';

let validDays = 31;
const month31 =  ['JANUARY','MARCH','MAY','JULY','AUGUST','OCTOBER','DECEMBER'];
const month30 = ['APRIL','JUNE','SEPTEMBER','NOVEMBER']
const allMonths = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
const MainPage = (props) => {
    const getMonthRef = useRef();
    const getDayRef = useRef();
    const getYearRef = useRef();

    const [isValidDay,setValidDay] = useState(true);
    const [isValidYear,setValidYear] = useState(true);

    const [dayValue,setDay] = useState("");
    const [yearValue,setYear] = useState("");


    const onChangeHandler = () => {
        let month = getMonthRef.current.value;
        if(month30.includes(month)){
            validDays = 30;
            console.log("month30");
        }
        else if(month31.includes(month)){
            validDays = 31;
            console.log("month31");
        }
        else{
            +getYearRef.current.value%4 === 0?validDays = 29:validDays = 28;   
            console.log("February");
        }
    }
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        let month = getMonthRef.current.value;
        let day = +getDayRef.current.value;
        let year = +getYearRef.current.value;

        if(day > validDays){
            setValidDay(false);
            console.log("Invalid Day");
            alert("Please Enter Valid Number of Days");
            setValidYear(true);
            return;
        }
        else if(year > 3000 || year < 1000){
            setValidYear(false);
            alert("Please Enter Valid Year");
            console.log("Invalid Year");
            setValidDay(true);
        }
        else{
            console.log("Valid Date");
            setValidDay(true);
            setValidYear(true);
            let TempDate = day+"-"+month+"-"+year;
            fetch('http://localhost:4000/getday',
                {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({
                    "Date" : TempDate
                })}
            ).then(res => {
                return res.json();
            }).then(data => {
                console.log(data.Name + ", " + data.Day + `(as in the ${data.Day}th day of the week)`);
                alert(data.Name + ", " + data.Day + `(as in the ${data.Day}th day of the week)`);
            }).catch(err => {
                console.log(err.message);
            });
            console.log(month + " " + day + " " + year);
            setYear("");
            setDay("");
        }
    }
    return(
        <div className = {classes.MainPage}>
        <form onSubmit={OnSubmitHandler}>
            <div className={classes.control}>
            <label>Select Month</label>
            <select name = "Month" ref = {getMonthRef} onChange = {onChangeHandler}>
                {allMonths.map(element => {
                    return(
                        <option key={element}>{element}</option>
                    )
                })}
            </select>
            </div >
            <div className={classes.control}>
            <label>Enter Day</label>
            <input ref={getDayRef} type="number" value = {dayValue} onChange={(e) => setDay(e.target.value)} required className = {isValidDay?classes.control:classes.Invalid}></input>
            </div>
            <div className={classes.control}>
            <label>Enter Year</label>
            <input type = "number" value = {yearValue} onChange={(e) => setYear(e.target.value)} required ref = {getYearRef} className = {isValidYear?classes.control:classes.Invalid}></input>
            </div>
            <div className= {classes.actions}>
            <button type = "submit"> Submit</button>
            </div>
        </form>
        </div>
    )
}

export default MainPage;