import { Box } from '@material-ui/core'
import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react'
import { getCompaniesSelector } from '../../redux/company-selector'
import { useParams } from 'react-router-dom'
import { companySlice } from '../../redux/company-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export const Company: FC = () => {
  const companies = useAppSelector(getCompaniesSelector)
  let { id } = useParams()

  let company = companies.find(c => c.name.replace(/\s+/g, '-').toLowerCase() === id)

  const [string, setString] = useState<string | null >()
  const [cargoBays, setCargoBays] = useState<ReactNode>(0)
  const dispatch = useAppDispatch()

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
    let value: any = e.target.value
    .split(",")
    .map(e => e.replace(/\./,"#").replace(/\./g,"")
    .replace(/#/,"."))
    .filter(v => v !== '01' && v !== '02' && v !== '00'
    && v !== '03' && v !== '04' && v !== '05' 
    && v !== '06' && v !== '07' && v !== '08' 
    && v !== '09' && v !== '.' && v !== ',')
    .join()
    .replace(/[^0-9\,.]/g, '')
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ /ig, ',')
    .replace(/\./g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ /ig, '.')
    // .replace(/[0]/g, " ")
    // .replace(/\s+/g, ' ')
    // .replace(/ /ig, '0')
    // .replace(/\.0+/, '.')

    numberOfRequired(value)
    setString(value)
    dispatch(companySlice.actions.updateBoxes({id: company?.id as string, boxes: value}))
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
        type='text'
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