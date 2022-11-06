import { Navbar } from "./components/Navbar";
import { DefaultSection } from "./modules/game/components/sections";
import { Provider } from "react-redux";
import { store } from "./modules/game/store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <DefaultSection />
    </Provider>
  );
}

export default App;
