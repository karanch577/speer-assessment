import React, {useState} from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { archiveCall, formatDuration, getMonthInWords } from "../../utils";
import styles from "./styles.module.css";
import Spinner from "../../components/Spinner/Spinner.jsx";

function CallDetails() {
  const { id } = useParams();
  const [refetch, setRefetch] = useState(false)
  const { data, loading, setLoading } = useFetch(`activities/${id}`, refetch);

  const currentMonth = getMonthInWords(data?.created_at);
  const newDate = new Date(data?.created_at);

  // NOTE: in the data - if the call_type is "missed", then also we are getting value in duration field
  // ideally it should be zero
  // If the call_type is missed, I am not displaying the duration

  let callStatus;

  if (data?.direction === "inbound" && data?.call_type === "missed") {
    callStatus = "Missed call";
  }

  if (data?.direction === "outbound" && data?.call_type === "missed") {
    callStatus = "Outgoing call";
  }

  if (data?.direction === "inbound" && data?.call_type !== "missed") {
    callStatus = "Incoming call";
  }

  if (data?.call_type !== "missed") {
    callStatus = `${callStatus}, ${formatDuration(data?.duration)}`;
  }

  const handleArchive = async () => {
    setLoading(true)
    let bodyData;
    if(data?.is_archived === true) {
      bodyData = {
        is_archived : false
      }
    } else {
      bodyData = {
        is_archived : true
      }
    }
    try {
      await archiveCall(`activities/${data?.id}`, bodyData)
    } catch (error) {
      console.log(error)
    } finally {
      setRefetch(prev => !prev)
    }

  }

  if(loading) {
    return(
      <div className="spinner-container">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <h2 className={styles.heading}>Call Details</h2>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.item}>
            <p>Call Date</p>
            <p>{`${currentMonth}, ${newDate?.getUTCDate()} ${newDate?.getUTCFullYear()}`}</p>
          </div>
          <div className={styles.item}>
            <p>To</p>
            <p>{data?.to}</p>
          </div>
          <div className={styles.item}>
            <p>Call Status</p>
            <p>{callStatus}</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.item}>
            <p>From</p>
            <p>{data?.from}</p>
          </div>
          <div className={styles.item}>
            <p>Via</p>
            <p>{data?.via}</p>
          </div>
          <div className={styles.item}>
            <p>Call Type</p>
            <p>{data?.call_type}</p>
          </div>
        </div>
      </div>
      <div className={styles["btn-container"]}>
        <button disabled={loading} onClick={handleArchive} className={styles.btn}>{data?.is_archived === false ? "Archive" : "Unarchive"} this call</button>
      </div>
    </>
  );
}

export default CallDetails;
