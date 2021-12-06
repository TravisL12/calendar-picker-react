import CalendarPicker from "./Calendar";

function App() {
  return (
    <div className="app">
      <CalendarPicker />
      <CalendarPicker startDate={new Date("1980-12-4")} />
      <CalendarPicker startDate={"2015-5-23"} />
    </div>
  );
}

export default App;
