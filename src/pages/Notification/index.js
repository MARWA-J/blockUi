import React, { useState, useEffect } from "react";
import { Notifications } from "../../fakeData";
import styled from "styled-components";
import { BsDot } from "react-icons/bs";
import { LoadData } from "../../API";
import { Scrollbars } from "react-custom-scrollbars";
import TimeAgo from "react-simple-timeago";
import "./styles/index.css";
import ContentLoader from "react-content-loader";
import { Mesg, FailedMesg } from "../../API/APIMessage";
import { CustomButton } from "../shared/SharedComponents";

const Text = styled.span`
  display: inline-block;
  width: 100%;
  color: var(--darkGray);
  white-space: nowrap;

  overflow: hidden !important;
  text-overflow: ellipsis;
`;
function Index(props) {
  const [Loading, setLoading] = useState(false);
  const [notification, setnotification] = useState([]);
  const [users, setusers] = useState([]);

  useEffect(() => {
    setLoading(true);
    // LoadData(
    //   "users",
    //   (err, data) => {
    //     setLoading(false);

    // UsersData(, (users) => { });
    // setusers(data.data.rows);

    //     if (err) {
    //       Mesg(err);
    //     }
    //   },
    //   (err) => {
    //     setLoading(false);
    //     FailedMesg(err, "Something worng happend !");
    //     console.log(err, "failed");
    //   }
    // );
    // LoadData(
    //   "notification",
    //   (err, data) => {
    //     setLoading(false);
    setTimeout(() => {
      setLoading(false);

      setnotification(Notifications);
      //     console.log(data.data);
      //     if (err) {
      //       Mesg(err);
      //     }
      //   },
      //   (err) => {
      //     setLoading(false);
      //     FailedMesg(err, "Something worng happend !");
      //   }
      // );
    }, 1200);
  }, []);
  let darkMod = localStorage.getItem("mode") === "dark" ? true : false;
  let notifications = notification ? notification : [];
  return (
    <div className={localStorage.getItem("mode") === "dark" ? "isDark" : ""}>
      <div
        className={
          localStorage.getItem("mode") === "dark"
            ? "notific-holer-dark"
            : "notific-holer"
        }
      >
        {Loading
          ? [1, 2].map((i) => {
              return (
                <div
                  style={{
                    width: "420px",
                    height: "85px",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--lighterGray)",
                  }}
                >
                  <ContentLoader
                    speed={2}
                    width={400}
                    height={160}
                    viewBox="0 0 600 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...props}
                  >
                    <rect x="90" y="26" rx="3" ry="3" width="160" height="4" />

                    <rect x="580" y="26" rx="3" ry="3" width="25" height="4" />
                    <circle cx="565" cy="27" r="3" />
                    <circle cx="47" cy="30" r="27" />
                  </ContentLoader>
                </div>
              );
            })
          : notifications.map((item, i) => {
              return (
                <div
                  className={darkMod ? "NotifiItem-dark" : "NotifiItem"}
                  key={i}
                >
                  <img
                    className="NotifiImage"
                    src={require("../../public/images/6.png")}
                  />
                  <Text>
                    <span style={{ color: "var(--black)" }}>
                      {users
                        .filter((i) => i.id === item.userId)
                        .map((i) => i.name)
                        .toString()}
                    </span>
                    {item.action}
                  </Text>
                  <span
                    style={{
                      display: "flex",

                      justifyContent: "center",
                    }}
                  >
                    <BsDot
                      color="var(--cyan)"
                      size={30}
                      style={{ marginTop: "-5px" }}
                    />
                    <div style={{ textAlign: "center" }}>
                      {/* <TimeAgo date={item.createdAt} /> */}
                      {item.time}
                    </div>
                  </span>
                </div>
              );
            })}
      </div>

      <div
        style={{
          padding: "7px 0",
          textAlign: "center",
          display: "flex",
          height: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomButton main>See All Activity</CustomButton>
      </div>
      <div className="new-arrow"></div>
    </div>
  );
}

export default Index;
