// Customer page
import React, { useState, useEffect, createContext } from "react";
import CustomPage from "../shared/CustomPage";
import { WorkersColumns, UsersData } from "./Config";
import { WorkersData } from "../../fakeData";
import { DateName } from "../Dashboard";
import NotifyUser from "./NotifyUser";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Notify from "./Notify";
import { Mesg, FailedMesg, SuccessMesg } from "../../API/APIMessage";
import { LoadData, addData } from "../../API";
import Progress from "react-progress-2";
import { Drawer } from "antd";
import Moment from "react-moment";
import { fakeData } from "../api/fake"

import EditUser from "./Notify/EditUser";
export const UserContext = createContext();
function Workers(props) {
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [users, setusers] = useState([]);
  const [data, setdata] = useState(fakeData);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [birthday, setbirthday] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [image, setimage] = useState("");
  const [education, seteducation] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [Filterdata, setFilterdata] = useState([]);
  const onOpenModal = (open) => {
    setOpen(open);
  };
  const [Id, setId] = useState("");

  const [notifyUesr, setnotifyUser] = useState(false);
  const notify = (id, value) => {
    setnotifyUser(value);
    setId(id);
  };

  const handleInput = (e, key) => {
    let value = e.target.value;
    switch (key) {
      case "jobTitle":
        setjobTitle(value);
        break;
      case "name":
        setname(value);
        break;
      case "phone":
        setphone(value);
        break;
      case "email":
        setemail(value);
        break;
      case "gender":
        setgender(value);
        break;
      case "birthday":
        setbirthday(value);
        break;
      case "address":
        setaddress(value);
        break;

      case "education":
        seteducation(value);
        break;
      default:
        break;
    }
  };
  const [Url, setUrl] = useState("");
  const setFile = (file) => {
    console.log(file, "that what we got ");
    setUrl(file);
  };
  const handleSubmit = () => {
    let data = {
      name: name,
      phone: phone,
      // password: "",
      sex: gender,
      birthday: birthday,
      address: address,
      education: education,
      jobTitle: jobTitle,
      email: email,
      lang: "ar",
      image: Url,
    };
    for (var propName in data) {
      if (data[propName] === "" || data[propName] === undefined) {
        delete data[propName];
      }
    }
    console.log(data, Id, "test");
    // onOpenModal(false);

    onOpenModal(false);
    setLoading(true);
    // addData(
    //   `user/edit/${Id}`,
    //   data,
    //   (mesg, Data) => {
    //     if (mesg) {
    //       Mesg(mesg);
    //       setLoading(false);
    // console.log(mesg, "user update");
    // console.log(data, mesg);
    // } else {
    // console.log(data, mesg);
    setTimeout(() => {
      SuccessMesg("Customer Edited Successfully !");
      setLoading(false);
      edit(null, false, null);
      loadCustomers();
    }, 1200);
    //     }
    //   },
    //   (err) => {
    //     edit(null, false, null);
    //     setLoading(false);

    //     FailedMesg(err);
    //   }
    // );
  };
  const [info, setinfo] = useState();

  const [showEdit, setShowEdit] = useState("");
  const edit = (id, value, info) => {
    setShowEdit(value);
    //setname(user.name);

    setinfo(info);
    setId(id);
  };
  // const onOpenModalNotify = (value) => {
  //   setNotify(value);
  //   // setId(id);
  //   // console.log("notify user", value);
  // };
  const deactive = (id) => {
    let data = { id: id };
    // addData(
    //   "user/deactivate",
    //   data,
    //   (mesg, Data) => {
    setTimeout(() => {
      setLoading(false);

      SuccessMesg("Deactivate costumer done !");

      loadCustomers();
    }, 1200);
    //   },
    //   (err) => {
    //     FailedMesg(err);
    //   }
    // );
  };
  const [UsersData, setUsersData] = useState([]);
  const loadCustomers = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // LoadData(
      //   "users",
      //   (err, data) => {
      //     setLoading(false);
      //     if (err) {
      //       Mesg(err);
      //     } else {
      let Users = [];
      //   setUsersData(data.data.rows);
      WorkersData.map((user) => {
        Users.push({
          id: {
            id: user.id,
            onOpen: () => notify(user.id, true, user),
            deactive: () => deactive(user.id),
            edit: () => edit(user.id, true, user),
          },

          FullName: user.name,
          Email: user.email,
          // notify: {
          //   onOpen: () => onOpenModalNotify(user.id, true),
          // },
          PhoneNumber: user.phone,
          // Date: DateName(user.createdAt),
          Status: user.active ? ["Enabled"] : ["Disabled"],
        });
      });
      setdata(fakeData);
      console.log(Users, "in load costumer")
      setFilterdata(Users);
    }, 1200);

    //     }
    //   },
    //   (err) => {
    //     setLoading(false);
    //     // Progress.hide();
    //     FailedMesg(err, "Something worng happend !");
    //   }
    // );
  };
  useEffect(() => {
    loadCustomers();
    // if (localStorage.getItem("station_token")) {
    // } else {
    //   props.history.push("/login");
    // }
  }, []);
  const [searchText, setsearchText] = useState("");

  const HandleSearch = (e) => {
    let value = e.target.value;
    setsearchText(value);
    if (value) {
      setFilterdata(data);
    }
  };

  const Filter = () => {
    let newData = data.filter((item) =>
      item.FullName.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(data, searchText);

    setFilterdata(newData);
  };
  let darkMod = window.localStorage.getItem("mode") === "light" ? false : true;

  return (
    <div>
      {/* <button onClick={() => notify(55, true)}>open</button> */}
      {/* <Progress.Component thumbStyle={{ background: "var(--cyan)" }} /> */}
      <CustomPage
        pageTitle="workers"
        columns={WorkersColumns}
        data={Filterdata}
        HandleSearch={HandleSearch}
        filter={Filter}
        onOpenModal={onOpenModal}
        headcss={darkMod ? "head-dark users-head" : "head users-head"}
        Loading={Loading}
        Item="workers"
        onRow={() => props.history.push("/workerProfile")}
      >
        {data.map((value) => (
          <div
            className={
              darkMod ? "record-tab-dark userscss" : "record-tab userscss"
            }
          >
            <div className="flex-row">{value.FullName}</div>
            <div className="flex-row">{value.Email}</div>
            <div className="flex-row">{value.PhoneNumber}</div>
            <div className={darkMod ? `tag-dark green` : "tag green"}>
              {value.status}
            </div>

          </div>
        ))}
      </CustomPage>
      {open ? (
        <Notify Close={() => onOpenModal(false)} id={props.id} all={true} />
      ) : null}

      {notifyUesr ? (
        <NotifyUser
          Close={() => notify(null, false, null)}
          id={props.id}
          recevierId={Id}
          all={false}
          info={info}
          fun={() => notify(null, false, null)}
        />
      ) : null}
    </div>
  );
}

export default Workers;
