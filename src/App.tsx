import './App.css'
import arrowIcon from "./assets/images/icon-arrow.svg";

function App() {
  const years : number = 30;
  const months : number = 10;
  const days : number = 26;

  return (
    <>
      <div className='wrapper'>
        <div className="calculatorBox">
          <div className="ageInputBox">
            <div className="inputBox">
              <label htmlFor="dayInput">DAY</label>
              <input type="number" id='dayInput' name='dayInput' />
            </div>
            <div className="inputBox">
              <label htmlFor="monthInput">MONTH</label>
              <input type="number" id='monthInput' name='monthInput' />
            </div>
            <div className="inputBox">
              <label htmlFor="yearInput">YEAR</label>
              <input type="number" id='yearInput' name='yearInput' />
            </div>
          </div>
          <div className="divider"></div>
          <img className= "arrowIcon" src={arrowIcon} alt=" A Downward Arrow inside a circle" />
          <div className="ageTextBox">
            <p>
              <span>{years}</span> years
            </p>
            <p>
              <span>{months}</span> months
            </p>
            <p>
              <span>{days}</span> days
            </p>
          </div>
        </div>
      </div>
      {/* Day
      DD

      Month
      MM

      Year
      YYYY

      -- years
      -- months
      -- days
      
      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">Your Name Here</a>.
      </div> */}
    </>
  )
}

export default App
