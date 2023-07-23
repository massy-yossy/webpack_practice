import * as React from 'react'

const Alert: React.FC<{message: string}> = (props) => {
  const { message } = props
  return (
    <div style={{backgroundColor: "green", color: "white", marginTop: "10px", padding: "1em"}}>
      {message}
    </div>
  )
}

export default Alert

