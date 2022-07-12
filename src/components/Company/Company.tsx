import { Box } from '@material-ui/core'
import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react'
import { getCompaniesSelector } from '../../redux/company-selector'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actions } from '../../redux/company-reducer'
import { useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'

export const Company: FC = () => {
  const companies = useSelector(getCompaniesSelector)
  let { id } = useParams()
  let company = companies.find(c => c.name.replace(/\s+/g, '-').toLowerCase() === id)

  const [string, setString] = useState<string | null>('')
  const [cargoBays, setCargoBays] = useState<ReactNode>(0)
  const dispathc = useDispatch<Dispatch<AnyAction>>()

  const numberOfRequired = (boxes: string | null) => {
    let arr = boxes?.replace(/^,|,$/g,'').split(",")
    let count = arr && eval(arr.join('+'))
    let bays = Math.ceil(count / 10)
    setCargoBays(bays)
  }

  useEffect(() => {
    numberOfRequired(company?.boxes as string)
    setString(company?.boxes as string)
  }, [company?.boxes])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    .replace(/[^0-9\.\,]/g, '')
    .replace(/,/g, " ")
    .replace(/\s+/g, ' ')
    .replace(/ /ig, ',')
    .replace(/\./g, " ")
    .replace(/\s+/g, ' ')
    .replace(/ /ig, '.')

    numberOfRequired(value)
    setString(value)
    dispathc(actions.updateBoxes(company?.id as string, value))
  }

  return <>
    {company && <Box style={{ margin: 15 }}>
      <h1>{company.name}</h1>
      <a href={`mailto:${company.email}`} target='_blanc' >{company.email}</a>
      <h3 >Number of required cargo bays {cargoBays || 0}</h3>
      <h3>Cargo boxes</h3>
      <input
        value={string || ''}
        onChange={onChange}
        type="text"
        name=''
        style={{
          fontSize: 16,
          border: '3px solid #000',
          width: 300,
          padding: 5
        }}
      />
    </Box>}
  </>
}