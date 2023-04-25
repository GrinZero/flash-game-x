import AppRouter from "./router";
import AntdProvider from "./antdProvider";

import "./App.css";

function App() {
  return (
    <AntdProvider>
      <AppRouter />
    </AntdProvider>
  );
}

export default App;
