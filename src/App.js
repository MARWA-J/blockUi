import React, { useState, useEffect, createContext } from "react";
import { Mesg, FailedMesg } from "./API/APIMessage";
import { LoadData } from "./API";
import logo from "./logo.svg";
import "./App.css";
import { useHistory } from "react-router";
import "react-progress-2/main.css";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import NewRecord from "./pages/Records/newRecord.js";
import Workers from "./pages/Workers";
import Admins from "./pages/Admins";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Statistic from "./pages/Statistic/index";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
function App(props) {
  const Admin = createContext();
  const [admins, setadmins] = useState([]);
  const [spaces, setspaces] = useState([]);
  const [userId, setuserId] = useState("");
  const history = useHistory();

  const getAdmins = () => {};
  const getSpace = () => {
    LoadData(
      "spaces",
      (err, data) => {
        setspaces(data.data);
        setuserId(data.user.id);
        if (err) {
          Mesg(err);
        }
      },
      (err) => {
        FailedMesg(err, "Something worng happend !");
      }
    );
  };
  useEffect(() => {
    // LoadData(
    //   "Admins",
    //   (err, data) => {
    //     setadmins(data.data);
    //   },
    //   (err) => {
    //     FailedMesg(err, "Something worng happend !");
    //   }
    // );
    //getSpace();
    if (
      localStorage.getItem("station_token") != undefined &&
      localStorage.getItem("station_token") != ""
    ) {
    } else {
      //history.push("/login");
      //.log(props.history);
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Dashboard {...props} admins={admins} />}
        />
        <Route
          path="/newrecord"
          render={(props) => (
            <NewRecord {...props} admins={admins} id={userId} />
          )}
          exact
        />
        <Route
          path="/profile"
          render={(props) => <Profile {...props} admins={admins} id={userId} />}
          exact
        />
        <Route path="/home" component={Home} exact />
        <Route
          path="/workers"
          render={(props) => <Workers {...props} id={userId} />}
          exact
        />{" "}
        <Route
          path="/statistics"
          render={(props) => <Statistic {...props} id={userId} />}
          exact
        />{" "}
        <Route
          path="/records"
          render={(props) => <Records {...props} id={userId} />}
          exact
        />
        <Route
          path="/admins"
          render={(props) => <Admins {...props} admins={admins} />}
          exact
        />
      </Switch>
    </div>
  );
}

export default App;
