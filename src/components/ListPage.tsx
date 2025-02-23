import { Pagination } from 'antd'
import React, { memo, FC, useState, useEffect } from 'react'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_DEFAULT, LIST_PAGE_SIZE_PARAM_KEY } from '../constants/index.tsx'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
    total: number
}

const ListPage: FC<PropsType> = memo(function ListPage(props: PropsType) {
    const { total } = props

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_DEFAULT)

    const [searchParams] = useSearchParams()

    // 从 url 参数中找到 page 和 pageSize， 并且同步到Pagination组件中
    useEffect(() => {
        setPage(Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 1)
        setPageSize(Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) || LIST_PAGE_SIZE_DEFAULT)
    },[searchParams])

    const nav = useNavigate()
    const { pathname } = useLocation()      // 获取当前路由
    function handlePageChange(page: number, pageSize: number){
        // 根据传入的page，和pageSize，改变url
        nav({
            pathname,
            search: `${LIST_PAGE_PARAM_KEY}=${page}&${LIST_PAGE_SIZE_PARAM_KEY}=${pageSize}`
        })
        
    }
    return (
        <Pagination current={page} pageSize={pageSize} total={total} onChange={handlePageChange}/>
    )
})



export default ListPage