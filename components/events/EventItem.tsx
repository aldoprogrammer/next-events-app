import Button from "../ui/Button";
import classes from "./event-item.module.css";
import { useRouter } from 'next/router';


function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString(undefined, options);
}

function EventItem(props: {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
}) {
  const { id, image, title, date, location } = props;
  const formattedDate = formatDate(date);
  const router = useRouter();

  const handleExploreEvent = () => {
    router.push(`/events/${id}`);
  };

  return (
    <li key={id} className={classes.item}>
      <img src={"/" + image} alt="" className={classes.item} />
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <time>{formattedDate}</time>
        </div>
        <div>
          <address>{location}</address>
        </div>
        <div>
        <Button 
          title="Explore Event" 
          onClick={handleExploreEvent} 
        />
      </div>
      </div>
      
    </li>
  );
}

export default EventItem;
