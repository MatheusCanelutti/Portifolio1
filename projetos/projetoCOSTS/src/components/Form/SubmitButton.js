import Styles from './SubmitButton.module.css';

function SubmitButton({ text }) {
  return (
    <div>
      <button className={Styles.btn} type="submit">
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;
