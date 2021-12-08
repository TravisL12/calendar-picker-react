import CalendarPicker from "./Calendar";

function App() {
  return (
    <div className="app">
      <div style={{ height: "400px" }}>
        <CalendarPicker>
          <button>Open</button>
        </CalendarPicker>
      </div>
      <div style={{ height: "400px" }}>
        <CalendarPicker startDate={new Date("1980-7-4")}>
          <button>Open</button>
        </CalendarPicker>
      </div>
      <div style={{ height: "400px" }}>
        <CalendarPicker startDate={"2015-5-23"}>
          <button>Open</button>
        </CalendarPicker>
      </div>
    </div>
  );
}

export default App;
