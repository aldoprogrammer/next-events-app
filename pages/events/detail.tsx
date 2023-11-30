import Button from "@/components/ui/Button";
import classes from '@/components/events/detail-item.module.css';
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

function Detail(props: {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  description: string;
}) {
  const { id, image, title, date, location, description } = props;
  const formattedDate = formatDate(date);
  const router = useRouter();

  const handleExploreEvent = () => {
    router.back();
  };

  return (
    <li key={id} className={classes.item}>
      <img src={"/" + image} alt="" className={classes.item} />
      <div>
        <div>
          <h2>Details: {title}</h2>
          
        </div>
        <div>
          <time>{formattedDate}</time>
        </div>
        <div>
          <address>{location}</address>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div>
          <Button 
            title="Back Button" 
            onClick={handleExploreEvent} 
            
          />
        </div>
      </div>
    </li>
  );
}

export default Detail;
