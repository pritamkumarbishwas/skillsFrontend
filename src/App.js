import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register.js";
import UsersList from "./pages/users/List.js";

//Users Card
import ProjectAdd from "./pages/projects/Add.js";
import ProjectEdit from "./pages/projects/Edit.js";
import ProjectList from "./pages/projects/List.js";

//Users Card
import TaskAdd from "./pages/tasks/Add.js";
import TaskEdit from "./pages/tasks/Edit.js";
import TaskList from "./pages/tasks/List.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<> Not Ready</>} />
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/users" element={<UsersList />} />
          {/* projects  Route */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/add" element={<ProjectAdd />} />
          <Route path="/projects/edit/:id" element={<ProjectEdit />} />

          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/add" element={<TaskAdd />} />
          <Route path="/tasks/edit/:id" element={<TaskEdit />} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
