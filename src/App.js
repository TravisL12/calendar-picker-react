import CalendarPicker from "./Calendar";

function App() {
  return (
    <div className="app">
      <div style={{ height: "400px" }}>
        <CalendarPicker />
      </div>
      <div style={{ height: "400px" }}>
        <CalendarPicker startDate={new Date("1980-7-4")} />
      </div>
      <div style={{ height: "400px" }}>
        <CalendarPicker startDate={"2015-5-23"} />
      </div>
    </div>
  );
}

export default App;
