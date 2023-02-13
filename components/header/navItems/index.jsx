import Link from "next/link";
import classes from "./navItems.module.css";

function NavItems({ path }) {
  return (
    <div>
      <Link href="/" className={path === "/" ? classes['link--active'] : classes.link}> Produs </Link>  
      <Link href="/produsId" className={path === "/produsId" ? classes['link--active'] : classes.link}> Cauta Id</Link>  
      <Link href="/reviews" className={path === "/reviews" ? classes['link--active'] : classes.link}> Reviews </Link>  
  </div>
  );
}

export default NavItems;