import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/Actions/usersActions.js";

const UserList = () => {
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    { field: "sno", headerName: "S.No", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  const rows = usersData.map((user, index) => ({
    sno: index + 1,
    id: user._id,
    name: user.name,
    email: user.email,
  }));

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
        sortingMode="client"
        pagination
        paginationMode="client"
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Paper>
  );
};

export default UserList;
