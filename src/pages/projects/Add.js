import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/Actions/projectActions.js";
import List from "@mui/icons-material/List";

const AddProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectOwner: "",
    creationDate: "",
  });

  const {
    success,
    error: projectError,
    loading: projectLoading,
  } = useSelector((state) => state.project);

  useEffect(() => {
    if (success) {
      navigate("/projects");
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
      errors.title = "Title is required.";
    }
    if (!form.description) {
      errors.description = "Description is required.";
    }
    if (!form.projectOwner) {
      errors.projectOwner = "Project Owner is required.";
    }
    if (!form.creationDate) {
      errors.creationDate = "Creation Date is required.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(createProject(form));
    }
  };

  const handleReset = () => {
    setForm({
      title: "",
      description: "",
      projectOwner: "",
      creationDate: "",
    });
    setError({});
  };

  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Edit Project</Typography>
            <Button
              onClick={() => navigate("/projects")}
              startIcon={<List />}
              variant="contained"
            >
              Display Projects
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Title *"
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
            label="Project Owner *"
            name="projectOwner"
            value={form.projectOwner}
            onChange={handleChange}
            error={!!error.projectOwner}
            helperText={error.projectOwner}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Creation Date *"
            name="creationDate"
            type="date"
            value={form.creationDate}
            onChange={handleChange}
            error={!!error.creationDate}
            helperText={error.creationDate}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              startIcon={
                projectLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
              disabled={projectLoading}
            >
              {projectLoading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleReset} variant="contained" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>

        {projectError && (
          <Grid item xs={12}>
            <Typography color="error">{projectError}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default AddProject;