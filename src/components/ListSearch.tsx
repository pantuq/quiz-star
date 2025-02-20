import { Input } from 'antd'
import React, { memo, FC, useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constants/index.tsx'

const ListSearch: FC = memo(function ListSearch() {
    const nav = useNavigate()
    const { pathname } = useLocation()

    const [value,setValue] = useState<string>()
    function handleChange(event){
        setValue(event.target.value)
    }

    function handleSearch(value: string){
        // 跳转页面，增加url参数
        nav({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }

    // 获取url参数，并设置到input value
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const curValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        setValue(curValue)
    },[searchParams])

    const { Search } = Input 

    return (
      <Search
        size='large'
        placeholder="输入关键字"
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{width: '260px'}}
      />
    );
})



export default ListSearch