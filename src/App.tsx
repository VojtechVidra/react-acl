import React from "react";
import { Can } from "./components/Can";
import { AppPermissions } from "./lib/AppPermissions";
import { Todos } from "./pages/Todos";

function App() {
  return (
    <>
      <Can
        fallback={<>No required permissions</>}
        neededPermission={AppPermissions.todoPage}
      >
        <Todos />
      </Can>
    </>
  );
}

export default App;
