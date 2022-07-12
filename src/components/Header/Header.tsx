import { Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { Buttons } from './Buttons/Buttons'
import { SearchQuery } from './SearchQuery/SearchQuery'
import { Title } from './Title/Title'

export const Header: FC = () => {
  return <header>
    <Grid container style={{ height: 60, background: '#607d9f' }}>
      <Grid container >
        <Title />
        <SearchQuery />
        <Buttons />
      </Grid>
    </Grid>
  </header>
}

