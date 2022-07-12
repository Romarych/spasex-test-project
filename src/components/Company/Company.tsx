import { Box } from '@material-ui/core'
import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react'
import { getCompaniesSelector } from '../../redux/company-selector'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Company: FC = () => {
  const companies = useSelector(getCompaniesSelector)
  let params = useParams()
  let company = companies.find(c => c.name.replace(/\s+/g, '-').toLowerCase() === params.id)

  const [string, setString] = useState<string | null | undefined>(company && company.boxes)
  const [cargoBays, setCargoBays] = useState<ReactNode>(0)

  const numberOfRequired = (boxes: string | null | undefined) => {
    let arr = boxes && boxes.replace(/,\s*$/, "").split(",")
    let count = arr && eval(arr.join('+'))
    let bays = Math.ceil(count / 10)
    setCargoBays(bays)
  }

  useEffect(() => {
    numberOfRequired(company && company.boxes)
    setString(company && company.boxes)
  }, [company && company.boxes])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    numberOfRequired(e.target.value)
    setString(e.target.value)
  }

  return <Box style={{ margin: 15 }}>
    {company && <div>
      <h1>{company.name}</h1>
      <a href={`mailto:${company.email}`} target='_blanc' >{company.email}</a>
      <h3 >Number of required cargo bays {cargoBays}</h3>
      <h3>Cargo boxes</h3>
      <input
        value={string as string}
        onChange={onChange}
        type="text"
        style={{
          fontSize: 16,
          border: '3px solid #000',
          width: 300,
          padding: 5
        }}
      />
    </div>}
  </Box>
}