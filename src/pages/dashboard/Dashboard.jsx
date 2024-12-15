import React, { useEffect, useState } from "react";
import { useStyles } from "../dashboard/dashboardStyles";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../../redux/Actions/taskActions";
import { getProjects } from "../../redux/Actions/projectActions";

const Dashboard = ({ dispatch, tasks, projects }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [groupedTasks, setGroupedTasks] = useState({
    "To-Do": [],
    "In Progress": [],
    Completed: [],
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const grouped = {
        "To-Do": [],
        "In Progress": [],
        Completed: [],
      };

      tasks.forEach((task) => {
        if (grouped[task.status]) {
          grouped[task.status].push(task);
        }
      });

      setGroupedTasks(grouped);
    }
  }, [tasks]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterTasks = (task) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(lowerCaseSearchQuery) ||
      task.description.toLowerCase().includes(lowerCaseSearchQuery) ||
      task.status.toLowerCase().includes(lowerCaseSearchQuery)
    );
  };

  const getTotalCount = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  const getProjectCount = () => {
    return projects.length;
  };

  return (
    <div className={classes.dashboard_container}>
      <div className={classes.dashboard_inner_container}>
        <Grid container spacing={3}>
          {/* Total Project Cards */}
          <Grid item xs={12} sm={3}>
            <Card elevation={5} style={{ padding: 16, textAlign: "center" }}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Total Projects
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 700 }}>
                {getProjectCount()}
              </Typography>
            </Card>
          </Grid>

          {/* Total Tasks by Status */}
          <Grid item xs={12} sm={3}>
            <Card elevation={5} style={{ padding: 16, textAlign: "center" }}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                To-Do Tasks
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 700 }}>
                {getTotalCount("To-Do")}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card elevation={5} style={{ padding: 16, textAlign: "center" }}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                In Progress Tasks
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 700 }}>
                {getTotalCount("In Progress")}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card elevation={5} style={{ padding: 16, textAlign: "center" }}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Completed Tasks
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 700 }}>
                {getTotalCount("Completed")}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search Tasks"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Task Lists by Status */}
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          {Object.keys(groupedTasks).map((status) => (
            <Grid item xs={12} sm={4} key={status}>
              <Paper
                elevation={5}
                style={{
                  padding: 16,
                  background: status === "Completed" ? "#D1E7DD" : "#F8F9FA",
                  borderRadius: 8,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: 600, color: "#3f51b5" }}
                >
                  <ListIcon style={{ marginRight: 8 }} />
                  {status}
                </Typography>
                {groupedTasks[status].length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    No tasks in this status.
                  </Typography>
                ) : (
                  groupedTasks[status].filter(filterTasks).map((task) => (
                    <Card
                      key={task._id}
                      style={{
                        marginBottom: 16,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      <CardContent
                        style={{
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography variant="h6" style={{ fontWeight: 600 }}>
                            {task.title}
                          </Typography>
                          <IconButton
                            color="secondary"
                            onClick={() => navigate(`/tasks/edit/${task._id}`)}
                            style={{ padding: 0 }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          style={{ marginBottom: 8 }}
                        >
                          {task.description}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                          Due Date: {task.deadline}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  projects: state.project.projects,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
