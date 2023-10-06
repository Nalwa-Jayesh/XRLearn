import React from 'react'

const Card = (props) => {

    const { id, name, imageUrl} = props
  return (
    <div style={{backgroundColor : "aliceblue", borderRadius: "25px", textAlign: "center", padding: "1rem"}}>
        <h2>{name.toUpperCase()}</h2>
        <img src={imageUrl} height="150px"></img>
    </div>
  )
}

export default Card