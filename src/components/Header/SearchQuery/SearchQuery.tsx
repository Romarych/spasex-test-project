import React, { ChangeEvent, FC, useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { companySlice } from '../../../redux/company-reducer'
import { useAppDispatch } from '../../../redux/hooks'

export const SearchQuery: FC = () => {
    const dispatch = useAppDispatch()
    const [string, setString] = useState<string>('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(companySlice.actions.setSearchQuery(e.target.value))
        setString(e.target.value)
    }

    return <Grid item xs={6} >
        <Box
            style={{
                margin: '10px 15px',
                float: 'left',
                width: '90%',
                position: 'relative',
                borderRadius: 30,
                background: '#fff'
            }}
        >
            <Search
                style={{
                    fill: '#607d9f !important',
                    position: 'absolute',
                    left: 10, top: 7
                }} />
            <input
                onChange={onChange}
                value={string}
                type="text"
                placeholder="Search"
                style={{
                    fontSize: 16,
                    boxSizing: 'border-box',
                    width: '100%',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    color: '#000',
                    textAlign: 'left',
                    padding: '10px 10px 10px 40px',
                    border: 'none'
                }}
            />
        </Box>
    </Grid>
}

