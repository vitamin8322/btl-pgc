import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useParams } from 'react-router-dom'
import Tab from '../components/Tab/Tab';

type Props = {}

const CreateOrUpdate = (props: Props) => {
  const { idEmployee } = useParams()
  
  return (
    <div>
      {/* {idEmployee ? <>Edit</> : <>Add</>}  */}
      <Tab />
    </div>
  )
}

export default CreateOrUpdate