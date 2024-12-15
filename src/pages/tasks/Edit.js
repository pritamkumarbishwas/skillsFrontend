import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, updateTask } from "../../redux/Actions/taskActions.js";
import { getProjects } from "../../redux/Actions/projectActions.js";
import { fetchUsers } from "../../redux/Actions/usersActions.js";
import List from "@mui/icons-material/List";

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the task ID from the URL

  const [error, setError] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    deadline: "",
    assignedUserId: "",
    projectId: "",
  });

  const {
    task,
    success,
    error: taskError,
    loading: taskLoading,
  } = useSelector((state) => state.task);
  const { projects } = useSelector((state) => state.project);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(fetchUsers());
    if (id) {
      dispatch(getTaskById(id)); // Fetch the task details by ID
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        deadline: task.deadline.split("T")[0], // Formatting date to 'YYYY-MM-DD'
        assignedUserId: task.assignedUserId,
        projectId: task.projectId,
      });
    }
  }, [task]);

  useEffect(() => {
    if (success) {
      navigate("/tasks");
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!form.title) {
      errors.title = "Task Title is required.";
    }
    if (!form.description) {
      errors.description = "Description is required.";
    }
    if (!form.status) {
      errors.status = "Status is required.";
    }
    if (!form.deadline) {
      errors.deadline = "Deadline is required.";
    }
    if (!form.assignedUserId) {
      errors.assignedUserId = "Assigned User is required.";
    }
    if (!form.projectId) {
      errors.projectId = "Project is required.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const taskData = {
        title: form.title,
        description: form.description,
        status: form.status,
        deadline: form.deadline,
        assignedUserId: form.assignedUserId,
        projectId: form.projectId,
      };
      dispatch(updateTask(id, taskData));
    }
  };

  const handleReset = () => {
    setForm({
      title: "",
      description: "",
      status: "",
      deadline: "",
      assignedUserId: "",
      projectId: "",
    });
    setError({});
  };

  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Edit Task</Typography>
            <Button
              onClick={() => navigate("/tasks")}
              startIcon={<List />}
              variant="contained"
            >
              Display Task
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Task Title *"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!error.title}
            helperText={error.title}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Description *"
            name="description"
            value={form.description}
            onChange={handleChange}
            error={!!error.description}
            helperText={error.description}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Status *"
            name="status"
            value={form.status}
            onChange={handleChange}
            error={!!error.status}
            helperText={error.status}
            select
          >
            {["To-Do", "In Progress", "Completed"].map((statusOption) => (
              <MenuItem key={statusOption} value={statusOption}>
                {statusOption}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Due Date *"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            error={!!error.deadline}
            helperText={error.deadline}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Assigned User *"
            name="assignedUserId"
            value={form.assignedUserId}
            onChange={handleChange}
            error={!!error.assignedUserId}
            helperText={error.assignedUserId}
            select
          >
            {users && users.length > 0 ? (
              users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No users available</MenuItem>
            )}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Project *"
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
            error={!!error.projectId}
            helperText={error.projectId}
            select
          >
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.title}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No projects available</MenuItem>
            )}
          </TextField>
        </Grid>

        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              startIcon={
                taskLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
              disabled={taskLoading}
            >
              {taskLoading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleReset} variant="contained" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>

        {taskError && (
          <Grid item xs={12}>
            <Typography color="error">{taskError}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default EditTask;
