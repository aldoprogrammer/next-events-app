import classes from "./button-style.module.css";


interface ButtonProps {
  title: string;
  onClick: () => void;
  customClass?: string;
}

function Button({ title, onClick }: ButtonProps) {
  return (
    <div className={classes.centerButton}>
      <button className={classes.button} role="button" 
      onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

export default Button;
