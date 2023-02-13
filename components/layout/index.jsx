import Header from "../header";
import ToastsComponent from "../../utils/toasts";
import classes from "./layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={classes.main}>{ children }</main>
      <ToastsComponent />
    </>
  );
}

export default Layout;