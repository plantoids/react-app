import React from "react";
import { Provider } from "react-redux";

import { store } from "src/redux";

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Provider store={store}>
        <p>I am the app :D</p>
      </Provider>
    </div>
  );
};

export default App;
