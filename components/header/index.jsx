import NavItems from "./navItems";
import classes from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <Link className={classes.nav__logo} href="/">Homepage</Link>
          <NavItems path={router.pathname} />
        </nav>
      </header>
    </>
  );
}

export default Header;