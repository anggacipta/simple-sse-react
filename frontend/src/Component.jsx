import React, { useEffect, useState } from 'react'

const Component = () => {
  const [message, setMessage] = useState();

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/events')
    if (typeof(EventSource) !== 'undefined') {
        console.log('yayy');
    } else {
        console.log('noo');
    };

    eventSource.onmessage = event => {
        const eventData = JSON.parse(event.data);
        setMessage(eventData.message);
        console.log(eventData);
    }

    return () => eventSource.close();

  }, [])

  return (
    <div>{message}</div>
  )
}

export default Component