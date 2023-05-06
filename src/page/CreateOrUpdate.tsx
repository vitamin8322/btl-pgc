import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const CreateOrUpdate = (props: Props) => {
  const { idEmployee } = useParams()
  
  return (
    <div>
      {idEmployee ? <>Edit</> : <>Add</>} 
    </div>
  )
}

export default CreateOrUpdate