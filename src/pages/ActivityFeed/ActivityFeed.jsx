import React, { useState } from 'react';
import CallDetailCard from '../../components/CallDetailCard/CallDetailCard.jsx';
import useFetch from '../../hooks/useFetch.js';
import { handleArchiveAll } from '../../utils/index.js';
import { RiInboxArchiveLine } from "react-icons/ri";
import styles from "./styles.module.css"
import Spinner from '../../components/Spinner/Spinner.jsx';

function ActivityFeed() {
  const [refetch, setRefetch] = useState(false)
  const { data, loading, setLoading} = useFetch("activities", refetch)

  // the api data contain some contain some call logs with to phone number - so filtering them out
  const updatedData = data.filter(item => item.to && item.is_archived === false)

  // sorting the array according to created_at 
  const sortedData = updatedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  const handleArchive = () => {
    setLoading(true)
    handleArchiveAll("archive", sortedData, setRefetch)
  }

  if(loading) {
    return (
    <div className="spinner-container">
        <Spinner />
      </div>
    )
  }
  return (
    <>
      <button disabled={loading} className={styles.btn} onClick={handleArchive}>
        <RiInboxArchiveLine size={18} />
        Archive all call
      </button>
        {/* archieve all calls */}
        {sortedData.length > 0 ? sortedData.map(item => (
          <CallDetailCard key={item.id} data={item} />

        )) : (
          <div>No call Logs</div>
        )}
    </>
  )
}

export default ActivityFeed