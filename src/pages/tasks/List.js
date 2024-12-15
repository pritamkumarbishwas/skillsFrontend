import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Paper,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, AddCircleRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../../redux/Actions/taskActions.js";

const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const taskData = useSelector((state) => state.task.tasks);

  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/tasks/edit/${rowData.id}`);
  };

  const handleDelete = (rowData) => {
    dispatch(deleteTask(rowData.id));
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const columns = [
    { field: "sno", headerName: "S.No", flex: 0.3 },
    { field: "taskTitle", headerName: "Title", flex: 1 },
    { field: "project", headerName: "Project", flex: 1 },
    { field: "assignedUser", headerName: "Assigned User", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "deadline", headerName: "Deadline", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="edit"
            sx={{ mx: 0.5 }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row)}
            color="secondary"
            aria-label="delete"
            sx={{ mx: 0.5 }}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  const filteredTasks = statusFilter
    ? taskData.filter((task) => task.status === statusFilter)
    : taskData;

  const rows = filteredTasks.map((task, index) => ({
    sno: index + 1,
    id: task._id,
    taskTitle: task.title,
    assignedUser: task.assignedUserId?.name || "N/A",
    project: task.projectId?.title || "N/A",
    status: task.status,
    deadline: task.deadline
      ? new Date(task.deadline).toLocaleDateString()
      : "N/A",
  }));

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Tasks
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Status Filter */}
          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="To-Do">To-Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button
            startIcon={<AddCircleRounded />}
            variant="contained"
            color="primary"
            onClick={() => navigate("/tasks/add")}
            style={{ marginBottom: "16px" }}
          >
            Add Task
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
        sortingMode="client"
        pagination
        checkboxSelection
        paginationMode="client"
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Paper>
  );
};

export default TaskList;
