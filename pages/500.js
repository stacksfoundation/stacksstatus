import styles from "../styles/500.module.css";

export default function Custom500() {
  return (
    <div className={styles.container}>
      <h1>500 - Server-side error occurred</h1>
      <p>An error has occured communicating with the Stacks Status database.</p>
    </div>
  );
}
