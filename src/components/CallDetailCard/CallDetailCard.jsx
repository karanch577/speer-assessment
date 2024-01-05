import React from "react";
import styles from "./styles.module.css";
import { getMonthInWords, getTime } from "../../utils";
import { IoMdCall } from "react-icons/io";
import { Link } from "react-router-dom";

function CallDetailCard({ data }) {
  const currentMonth = getMonthInWords(data.created_at)
  const newDate = new Date(data.created_at)


  return (
    <>
    <h3 className={styles.heading}>{`${currentMonth}, ${newDate?.getUTCDate()} ${newDate?.getUTCFullYear()}`}</h3>
      <Link to={`/call-detail/${data.id}`} className={styles.card}>
        <div className={styles.left}>
          <IoMdCall />
          <h2 className={styles.bold}>{data?.to}</h2>
        </div>
        <div className="right">{getTime(data?.created_at)}</div>
      </Link>
    </>
  );
}

export default CallDetailCard;
