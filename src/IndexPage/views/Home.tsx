import React, {useEffect} from 'react'
interface Props {}

export default function Home(props:Props): React.ReactElement{
  useEffect(() => {
    console.log(props)
  }, [])
  return (
    <div>
      123
    </div>
  )
}
