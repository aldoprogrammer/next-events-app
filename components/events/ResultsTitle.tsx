import Button from "../ui/Button";
import classes from "./results-title.module.css";
import { useRouter } from 'next/router';
import { getMonthName } from '../layout/GetMonthName';

interface ResultsTitleProps {
  year: string;
  month: string;
}

export default function ResultsTitle({ year, month }: ResultsTitleProps) {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/events');
  };

  return (
    <div>
      <h2 className={classes.title}>Results for: {getMonthName(+month)} - {year} </h2>
      <Button
        title={"Show All Events"}
        onClick={handleButtonClick}
      />
    </div>
  );
}
