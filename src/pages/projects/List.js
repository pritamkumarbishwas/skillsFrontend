import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, IconButton, Paper, Box, Typography } from "@mui/material";
import { Edit, Delete, AddCircleRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  deleteProject,
} from "../../redux/Actions/projectActions.js";

const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectData = useSelector((state) => state.project.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    navigate(`/projects/edit/${rowData._id}`);
  };

  const handleDelete = (rowData) => {
    dispatch(deleteProject(rowData._id));
  };

  const columns = [
    { field: "id", headerName: "S.No", flex: 0.3 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "projectOwner", headerName: "Owner", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "creationDate", headerName: "Creation Date", flex: 1 },
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

  const rows = projectData.map((project, index) => ({
    id: index + 1,
    ...project,
  }));

  return (
    <>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Projects
          </Typography>
          <Button
            startIcon={<AddCircleRounded />}
            variant="contained"
            color="primary"
            onClick={() => navigate("/projects/add")}
            style={{ marginBottom: "16px" }}
          >
            Add Project
          </Button>
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
    </>
  );
};

export default ProjectList;
