import { useState } from 'react';
import './App.css'
import arrowIcon from "./assets/images/icon-arrow.svg";

function App() {
  // States
  const [inputErrorMessages, setInputErrorMessages] = useState<string[]>(["", "", ""]);
  const [days, setDays] = useState<string>("--")
  const [months, setMonths] = useState<string>("--")
  const [years, setYears] = useState<string>("--")

  // 
  const checkForInputs = (input: FormData) => {
    const inputDay: number = input.has("dayInput") ? parseInt(input.get("dayInput") as string) : 0;
    const inputMonth: number = input.has("monthInput") ? parseInt(input.get("monthInput") as string) : 0;
    const inputYear: number = input.has("yearInput") ? parseInt(input.get("yearInput") as string) : 0;

    let currentErrors = inputErrorMessages;
    // check if user input for day is valid
    if(inputDay < 31 && inputDay > 0 && isNaN(inputDay)) currentErrors[0] = "";
    
  }

  // 
  const calculateAge = (input : FormData) => {

    console.log(input);

    // Grab data from formData
    const inputDay: number = input.has("dayInput") ? parseInt(input.get("dayInput") as string) : 0;
    const inputMonth: number = input.has("monthInput") ? parseInt(input.get("monthInput") as string) : 0;
    const inputYear: number = input.has("yearInput") ? parseInt(input.get("yearInput") as string) : 0;
    // Compare data to current date and find difference
    const currentFullDate: Date = new Date();
    const currentDay: number = currentFullDate.getDate();
    const currentMonth: number = currentFullDate.getMonth();
    const currentYear: number = currentFullDate.getFullYear();
    //Calculate days
    const DAYS_PER_MONTH = 31;
    const MONTHS_PER_YEAR = 12;
    const totalDays: number = currentDay > inputDay ? currentDay - inputDay : (DAYS_PER_MONTH + currentDay) - inputDay;
    const totalMonths: number = currentDay >= inputDay ? MONTHS_PER_YEAR - (inputMonth - 1) : MONTHS_PER_YEAR - inputMonth;
    const totalYears: number = currentMonth > inputMonth ? currentYear - inputYear : (currentYear - 1) - inputYear;
    // Set states to the correct totals
    setDays(totalDays.toString());
    setMonths(totalMonths.toString());
    setYears(totalYears.toString());
  }

  return (
    <>
      <div className='wrapper'>
        <div className="calculatorBox">
          <form className="ageInputBox" id='ageInputForm' onSubmit={(e) => {e.preventDefault(); calculateAge(new FormData(e.currentTarget));}}>
            <div className="inputBox">
              <label htmlFor="dayInput">DAY</label>
              <input type="number" id='dayInput' name='dayInput' required min={1} max={31} />
              <span className='error'>Error</span>
            </div>
            <div className="inputBox">
              <label htmlFor="monthInput">MONTH</label>
              <input type="number" id='monthInput' name='monthInput'/>
            </div>
            <div className="inputBox">
              <label htmlFor="yearInput">YEAR</label>
              <input type="number" id='yearInput' name='yearInput'/>
            </div>
          </form>
          <div className="divider"></div>
          {/* Made the ageInputForm submit button outside due to how I layed out the styling. */}
          <button type="submit" form="ageInputForm" className="arrowButton">
            <img className= "arrowIcon" src={arrowIcon} alt=" A Downward Arrow inside a circle" />
          </button>
          {/* HTML for age results */}
          <div className="ageTextBox">
            <p>
              <span>{years !== "" ? years : "--"}</span> years
            </p>
            <p>
              <span>{months !== "" ? months : "--"}</span> months
            </p>
            <p>
              <span>{days !== "" ? days : "--"}</span> days
            </p>
          </div>
        </div>
      </div>

      {/* <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">Your Name Here</a>.
      </div> */}
    </>
  )
}

export default App
