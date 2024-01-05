import { CORS_PROXY_URL, API_REQUEST_ORIGIN, BASE_URL } from "../constants";


function getMonthInWords(date) {
  const newDate = new Date(date);

    const monthsInWords = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const monthIndex = newDate.getMonth();
    return monthsInWords[monthIndex];
  }

function getTime(date) {
  const newDate = new Date(date)

  const formattedTime = newDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formattedTime;
}

function formatDuration(durationInSeconds) {
  const days = Math.floor(durationInSeconds / (24 * 60 * 60));
  const hours = Math.floor((durationInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60);
  const seconds = durationInSeconds % 60;

  const formattedDuration = [];

  if (days > 0) {
    formattedDuration.push(`${days}d`);
  }
  if (hours > 0) {
    formattedDuration.push(`${hours}hr`);
  }
  if (minutes > 0) {
    formattedDuration.push(`${minutes}min`);
  }
  if (seconds > 0 || formattedDuration.length === 0) {
    formattedDuration.push(`${seconds}sec`);
  }

  return formattedDuration.join(' ');
}

async function archiveCall(url, bodyData) {
  const proxyUrl = new URL(CORS_PROXY_URL)
  const apiUrlWithProxy = new URL(BASE_URL + url, proxyUrl)

  try {
    const response = await fetch(apiUrlWithProxy.href, {
      method: 'PATCH',
      headers: {
        'Origin': API_REQUEST_ORIGIN,
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyData)
  }
    );

    const data = await response.json()
  } catch (error) {
    console.log(error)
  }
}

async function handleArchiveAll(type="archive", data, setRefetch) {
// this same function is used to archive and unarchive all call
let bodyData;

if(type === "archive") {
  bodyData = {
    is_archived: true
  }

  try {
    // Use Promise.all to wait for all archiveCall functions to complete
    await Promise.all(
      data.map(async (item) => {
        await archiveCall(`activities/${item.id}`, bodyData);
      })
    );

    // After all archiveCall functions are completed, update the state
    setRefetch((prev) => !prev);
  } catch (error) {
    console.error("Error:", error);
  }
}

if(type === "unarchive") {
  bodyData = {
    is_archived: false
  }

  try {
    await Promise.all(
      data.map(async (item) => {
        await archiveCall(`activities/${item.id}`, bodyData);
      })
    );

    setRefetch((prev) => !prev);
  } catch (error) {
    console.error("Error:", error);
  }
}
}

  export {
    getMonthInWords,
    getTime,
    formatDuration,
    handleArchiveAll,
    archiveCall
  }