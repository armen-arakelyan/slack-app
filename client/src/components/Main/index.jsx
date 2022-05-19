import "./style.css";
import Domains from "./Domains/Domains";
import MainSide from "./MainSide/MainSide";
import { loginedPerson } from "../../services";
import { useDispatch } from "react-redux";
import { getUserDataAction } from '../../redux/getUserData/getUserDataAction'
import { useEffect } from "react";

const Aside = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loginedPerson()
      .then((res) => {
        if (res.data) {
          dispatch(getUserDataAction(res.data));
        }
      })
      .catch((err) => console.log("err", err));
  }, [dispatch]);
  return (
    <aside className="aside">
      <Domains />
      <MainSide />
    </aside>
  );
};

export default Aside;
