import React from "react";
import ReactDOM from "react-dom/client";

import ActivityFeed from "./pages/ActivityFeed/ActivityFeed.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArchivedCall from "./pages/ArchivedCall/ArchivedCall.jsx";
import Error from "./pages/Error/Error.jsx";
import Layout from "./components/Layout/Layout.jsx";
import CallDetail from "./pages/CallDetail/CallDetail.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ActivityFeed />} />
        <Route path="/archived-call" element={<ArchivedCall />} />
        <Route path="/call-detail/:id" element={<CallDetail />} />
        <Route path="/*" element={<Error />} />
      </Route>
    </Routes>
  );
};

const root = document.getElementById("app");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default App;
