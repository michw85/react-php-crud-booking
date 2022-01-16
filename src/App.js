import { Provider } from "./Context";
import Form from "./components/Form";
import RoomList from "./components/RoomList";
import { Actions } from "./Actions";
function App() {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="App">
        <h1>React JS + PHP CRUD Booking Application</h1>
        <div className="wrapper">
          <section className="left-side">
            <Form />
          </section>
          <section className="right-side">
            <RoomList />
          </section>
        </div>
      </div>
    </Provider>
  );
}

export default App;