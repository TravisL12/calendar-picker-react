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
        <CalendarPicker startDate={"1980-7-4"} />
      </div>
    </div>
  );
}

export default App;
