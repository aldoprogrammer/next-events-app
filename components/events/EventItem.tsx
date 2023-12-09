import ArrowRightIcon from "../icons/ArrowRightIcon";
import Button from "../ui/Button";
import classes from "./event-item.module.css";
import { formatHumanReadableDate } from "@/components/utils/dateReadable";

function EventItem(props: {
  _id: string;
  image: string;
  title: string;
  date: string;
  location: string;
}) {
  const { _id, image, title, date, location } = props;

  
  const humanReadableDate = formatHumanReadableDate(date);  

  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${_id}`;

  return (
    <li key={_id} className={classes.item}>
      <img src={"/" + image} alt="" className={classes.item} />
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
        <time>{humanReadableDate}</time>
        </div>
        <div>
          <address>{location}</address>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={exploreLink}>
          <span>
            Explore Event <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </li>
  );
}

export default EventItem;
