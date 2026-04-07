import styles from "./BackgroundDecor.module.css";

export default function BackgroundDecor() {
  return (
    <div className={`${styles.decorWrapper} container`} aria-hidden="true">
      <span className={styles.formula1}>{'SUMIF(C3:C12, ">70,000")'}</span>
      <span className={styles.formula2}>{"f(x) = MIN(E2:E5)"}</span>
      <span className={styles.formula3}>{"AVERAGE(B2+D2)"}</span>
      <span className={styles.formula4}>{"SUM(A1+B4)"}</span>
      <span className={styles.formula5}>{"=( A2*B2 )"}</span>
      <div className={`${styles.square20} ${styles.squareBottom}`}></div>
      <div className={`${styles.square20} ${styles.squareBottomRight}`}></div>
      <div className={`${styles.square10} ${styles.squareCenter}`}></div>
      <div className={`${styles.square10} ${styles.squareRight}`}></div>
      <div className={`${styles.square10} ${styles.squareTopRight}`}></div>
      <img
        src="/src/assets/icons/TableDecor.svg"
        className={styles.tableDecor}
      />
      <img src="/src/assets/images/decor-img.png" className={styles.decorImg} />
    </div>
  );
}
