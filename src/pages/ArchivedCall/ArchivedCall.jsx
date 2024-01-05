import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import CallDetailCard from '../../components/CallDetailCard/CallDetailCard.jsx'
import { handleArchiveAll } from '../../utils/index.js'
import styles from "./styles.module.css"
import { RiInboxUnarchiveFill } from "react-icons/ri";
import Spinner from '../../components/Spinner/Spinner.jsx'


function ArchivedCall() {
  const [refetch, setRefetch] = useState()
  const { data, loading, setLoading } = useFetch("activities", refetch)

   // the api data contain some contain some call logs with to phone number - so filtering them out
  //  and also filtering the archived calls

   const updatedData = data.filter(item => item.to && item.is_archived === true)

   // sorting the array according to created_at 
 
   const sortedData = updatedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

   const handleArchive = () => {
    setLoading(true)
    handleArchiveAll("unarchive", sortedData, setRefetch)
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
      <RiInboxUnarchiveFill />
      Unarchive all calls
    </button>
    <div>
      {sortedData.length > 0 ? sortedData.map(item => (
        <CallDetailCard key={item.id} data={item} />
      )) : (
        <div>
          No call Logs
        </div>
      )}
    </div>
    </>
  )
}

export default ArchivedCall