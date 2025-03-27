import React, { useEffect, useState } from 'react'

const Location = () => {
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)

        })
    })

  return (
    <h3> {lat} and {lon}</h3>
  )
}

export default Location;