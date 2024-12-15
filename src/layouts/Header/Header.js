import React, { useEffect, useState } from "react";
import "./header.css";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import * as Actions from "../../redux/Actions/dashboardActions";
import { logout } from "../../redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ isSidebarOpen }) => {
  const [userToggle, setUserToggle] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(Actions.setIsSidebarOpen(!isSidebarOpen));
  };

  const handleLogout = async () => {
    // Confirmation dialog for logout
    const result = await Swal.fire({
      title: `Are you sure you want to logout?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      try {
        dispatch(logout());
        setTimeout(() => {
          localStorage.clear();
          setData(null);
          navigate("/login");
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="bars">
          <FaBars onClick={toggle} />
        </div>

        <div className="header_icon_name">
          <h3 style={{ marginLeft: 10 }}>Users</h3>
        </div>

        <div>
          <FaSignOutAlt onClick={handleLogout} className="user_icon" />
        </div>
      </div>
    </header>
  );
};

// Map Redux state to props (for sidebar state)
const mapStateToProps = (state) => ({
  isSidebarOpen: state.dashboard.isSidebarOpen,
});

export default connect(mapStateToProps)(Header);
