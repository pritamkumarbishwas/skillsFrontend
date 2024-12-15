import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./sideBar.css";
import { connect } from "react-redux";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/users",
    name: "Users",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/users",
        name: "List",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/projects/add",
        name: "Add Projects",
        icon: <BiAbacus />,
      },
      {
        path: "/projects",
        name: "List",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/tasks/add",
        name: "Add Tasks",
        icon: <BiAbacus />,
      },
      {
        path: "/tasks",
        name: "List",
        icon: <BiAbacus />,
      },
    ],
  },
];

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ isSidebarOpen }) => {
  const [hiddenSidebarWidth, setHiddenSidebarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHiddenSidebarWidth(window.innerWidth > 991 ? 45 : 0);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      animate={{
        width: isSidebarOpen ? "250px" : `${hiddenSidebarWidth}px`,
        transition: {
          duration: 0.5,
          type: "spring",
          damping: 10,
        },
      }}
      className="sidebar"
    >
      <div className="top_section">
        {isSidebarOpen ? <span>User</span> : <></>}
      </div>
      <section className="routes">
        {routes.map((route, index) => {
          if (route.subRoutes) {
            return (
              <SidebarMenu
                route={route}
                key={index}
                showAnimation={showAnimation}
                isSidebarOpen={isSidebarOpen}
              />
            );
          }

          return (
            <div key={index} className="side_Bar">
              <NavLink
                to={route.path}
                className="link"
                activeClassName="active"
                exact
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            </div>
          );
        })}
      </section>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  isSidebarOpen: state.dashboard.isSidebarOpen,
});

export default connect(mapStateToProps)(SideBar);
