/* istanbul ignore file */
import "./App.scss";
import Page from "./pages/Home/home";
import { DataProvider } from "./contexts/DataContext/datacontexts";

function App() {
  return (
    <DataProvider>
      <Page />
    </DataProvider>
  );
}

export default App;
