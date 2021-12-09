import CalendarPicker from "./Calendar";

function App() {
  return (
    <div className="app">
      <CalendarPicker>
        <div>Open</div>
      </CalendarPicker>
      <CalendarPicker
        startDate={"1980-12-4"}
        maxDate={"1981-3-25"}
        minDate={"1980-3-25"}
      />
    </div>
  );
}

export default App;
