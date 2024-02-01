import { useEffect, useState } from 'react';
import './App.css'
import arrowIcon from "./assets/images/icon-arrow.svg";

function App() {
  // States
  const [dayInputError, setDayInputError] = useState<boolean>(false);
  const [monthInputError,setMonthInputError] = useState<boolean>(false);
  const [yearInputError, setYearInputError] = useState<boolean>(false);
  const [days, setDays] = useState<string>("--");
  const [months, setMonths] = useState<string>("--");
  const [years, setYears] = useState<string>("--");
  const [yearsCounter, setYearsCounter] = useState<number>(0);
  const [monthsCounter, setMonthsCounter] = useState<number>(0);
  const [daysCounter, setDaysCounter] = useState<number>(0);

  useEffect(() => {
    if(yearsCounter >= parseInt(years) || years == "--") return;

    const counter = setTimeout(() => {
      setYearsCounter((prev) => prev + 1);
    }, 100);

    return (() => {
      clearTimeout(counter);
    })

  }, [yearsCounter])

  useEffect(() => {
    if(monthsCounter >= parseInt(months) || months == "--") return;

    const counter = setTimeout(() => {
      setMonthsCounter((prev) => prev + 1);
    }, 100);

    return (() => {
      clearTimeout(counter);
    })

  }, [monthsCounter])

  useEffect(() => {
    if(daysCounter >= parseInt(days) || days == "--") return;

    const counter = setTimeout(() => {
      setDaysCounter((prev) => prev + 1);
    }, 100);

    return (() => {
      clearTimeout(counter);
    })

  }, [daysCounter])

  // 
  const checkForInputs = (input: FormData) => {

    // DAY INPUT VALIDITY \\
    // Setup
    const dayRegex : RegExp = /\b[0-9]{1,2}\b/g;
    const dayInput: string = input.has("dayInput") ? input.get("dayInput") as string : "";
    let errorFlag = false; 
    // 
    if(!dayRegex.test(dayInput) || parseInt(dayInput) <= 0 || parseInt(dayInput) > 31) {
      setDayInputError(true);
      errorFlag = true;
    }
    else {
      setDayInputError(false);
    }

    // MONTH INPUT VALIDITY \\
    // Setup
    const monthRegex : RegExp = /\b[0-9]{1,2}\b/g;
    const monthInput: string = input.has("monthInput") ? input.get("monthInput") as string : "";
    if(!monthRegex.test(monthInput) || parseInt(monthInput) <= 0 || parseInt(monthInput) > 12) {
      setMonthInputError(true);
      errorFlag = true;
    }
    else {
      setMonthInputError(false);
    }

    // YEAR INPUT VALIDITY \\
    // Setup
    const yearRegex : RegExp = /\b[0-9]{4}\b/g;
    const yearInput: string = input.has("yearInput") ? input.get("yearInput") as string : "";
    const currentYear : number = (new Date()).getFullYear();
    if(!yearRegex.test(yearInput) || parseInt(yearInput) <= 0 || parseInt(yearInput) > currentYear) {
      setYearInputError(true);
      errorFlag = true;
    }
    else {
      setYearInputError(false);
    }

    // If input is valid we calculate age
    if(errorFlag)
    {
      setDays("--");
      setMonths("--");
      setYears("--");
    }
    else
    {
      calculateAge(input);
    }
  }

  // 
  const calculateAge = (input : FormData) => {
    // Grab data from formData
    const inputDay: number = input.has("dayInput") ? parseInt(input.get("dayInput") as string) : 0;
    const inputMonth: number = input.has("monthInput") ? parseInt(input.get("monthInput") as string) : 0;
    const inputYear: number = input.has("yearInput") ? parseInt(input.get("yearInput") as string) : 0;
    // Compare data to current date and find difference
    const currentFullDate: Date = new Date();
    const currentDay: number = currentFullDate.getDate();
    const currentMonth: number = currentFullDate.getMonth();
    const currentYear: number = currentFullDate.getFullYear();
    // Calculate days
    const DAYS_PER_MONTH = 31;
    const MONTHS_PER_YEAR = 12;
    const totalDays: number = currentDay > inputDay ? currentDay - inputDay : (DAYS_PER_MONTH + currentDay) - inputDay;
    const totalMonths: number = currentDay >= inputDay ? MONTHS_PER_YEAR - (inputMonth - 1) : MONTHS_PER_YEAR - inputMonth;
    const totalYears: number = currentMonth > inputMonth ? currentYear - inputYear : (currentYear - 1) - inputYear;
    // Set states to the correct totals
    setDays(totalDays.toString());
    setMonths(totalMonths.toString());
    setYears(totalYears.toString());
    // Start the counters for increment animations
    setYearsCounter(1);
    setMonthsCounter(1);
    setDaysCounter(1);
  }

  return (
    <>
      <div className='wrapper'>
        <div className="calculatorBox">
          <form className="ageInputBox" id='ageInputForm' noValidate onSubmit={(e) => {e.preventDefault(); checkForInputs(new FormData(e.currentTarget));}}>
            <div className="inputBox">
              {dayInputError === true ?
                <>
                  <label htmlFor="dayInput" className="error">DAY</label>
                  <input type="number" id='dayInput' name='dayInput' className="error"/>
                  <span className='errorMessage'>Must be a valid day</span> 
                </> 
                :
                <>
                  <label htmlFor="dayInput">DAY</label>
                  <input type="number" id='dayInput' name='dayInput' placeholder='DD'/>
                </> 
              }
            </div>
            <div className="inputBox">
              {monthInputError === true ?
                <>
                  <label htmlFor="monthInput" className="error">MONTH</label>
                  <input type="number" id='monthInput' name='monthInput' className='error' />
                  <span className='errorMessage'>Must be a valid month</span>
                </> 
                :
                <>
                  <label htmlFor="monthInput">MONTH</label>
                  <input type="number" id='monthInput' name='monthInput'placeholder='MM'/>
                </> 
              }
            </div>
            <div className="inputBox">
              {yearInputError === true ?
                <>
                  <label htmlFor="yearInput" className='error'>YEAR</label>
                  <input type="number" id='yearInput' name='yearInput'className='error' />
                  <span className='errorMessage'>Must be in the past</span>
                </> 
                :
                <>
                  <label htmlFor="yearInput">YEAR</label>
                  <input type="number" id='yearInput' name='yearInput' placeholder='YYYY'/>
                </> 
              }
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
              <span>{yearsCounter === 0 ? "--" : yearsCounter}</span> years
            </p>
            <p>
              <span>{monthsCounter === 0 ? "--" : monthsCounter}</span> months
            </p>
            <p>
              <span>{daysCounter === 0 ? "--" : daysCounter}</span> days
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
