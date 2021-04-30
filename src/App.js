import Route from "../src/configs/router/MainRoute";
import './App.css'
import store from "./configs/redux/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
