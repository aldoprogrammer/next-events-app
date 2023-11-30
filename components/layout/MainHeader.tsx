import Link from "next/link";

import classes from "./main-header.module.css";
import Button from "../ui/Button";
import { useRouter } from 'next/navigation';


function MainHeader() {
  const router = useRouter()
  const handleButtonClick = () => {
    router.push('/events');
  };
  return (
    <header className={classes.header}>
      
      <div className={classes.logo}>
        <Link href="/">MeetupEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>     
        <Button 
          title="Browse All Events" 
          onClick={handleButtonClick}
        />
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
