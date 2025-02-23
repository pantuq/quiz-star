import React, { memo, FC, useState, useEffect, useRef } from 'react'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard.tsx'
import styles from './Common.module.scss'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch.tsx'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question.ts'
import { LIST_PAGE_SIZE_DEFAULT } from '../../constants/index.tsx'

const List: FC = memo(function List() {
  useTitle('问卷-我的问卷')

  const {Title} = Typography

  const [searchParams] = useSearchParams()

  const [started, setStarted] = useState(false)   //标记是否已经开始加载 （以防 防抖 有延迟）
  const [list, setList] = useState([])    // 1.1List 内部的数据，不在url参数中体现
  const [page, setPage] = useState(1)   // 1.2全部的列表数据，上划加载更多，累加
  const [total, setTotal] = useState(0)   //1.3
  const haveMore = total > list.length    // 1.4是否还有更多数据
  const keyword = searchParams.get("keyword") || ""

  // keyword变化 开始搜索时，重置信息，重新渲染
  useEffect(() => {
    setStarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  },[keyword])

  // 4.1真正去加载数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result){
        const {list: listData, total} = result
        setList(list.concat(listData))    //累加
        setTotal(total)
        setPage(page + 1)
      }
    }
  );

  // 3.1尝试去加载函数 - 防抖
  const footerRef = useRef<HTMLDivElement>(null)    //通过判断是否划到底部来决定是否触发函数
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = footerRef.current
      if(elem == null) return
      const domRect = elem.getBoundingClientRect()
      if(domRect == null) return
      const { bottom } = domRect
      if(bottom <= document.body.clientHeight){
        load()    // 真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  );

  // 2.1当页面开始渲染，或者url参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  },[searchParams])

  // 2.2页面上划，加载更多 依旧是需要依赖搜索关键词？？？为什么
  useEffect(() => {
    if (haveMore) {
      window.addEventListener('scroll',tryLoadMore)
      // 一滚动就触发了很多次，所以需要用到防抖
    }

    return () => {
      window.removeEventListener('scroll',tryLoadMore)
      // 注意需要解绑对原生dom的监听
    }
  },[searchParams,haveMore])

  // 5.1LoadMore Elem
  const LoadMoreContentElem = () => {
    if(!started || loading) return <Spin />
    if(total === 0) return <Empty description="暂无数据"/>
    if(!haveMore) return <span>没有更多了</span>
    return <span>上划加载更多</span>
  }

    return (
      <>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>我的问卷</Title>
          </div>
          <div className={styles.right}>
            <ListSearch />
          </div>
        </div>
        <div className={styles.content}>
          {(list.length > 0) &&
            list.map((ques: any) => {
              const { _id } = ques;
              return <QuestionCard key={_id} {...ques} />;
            })}
        </div>
        <div className={styles.footer}>
          <div ref={footerRef}>
            <LoadMoreContentElem/>
          </div>
        </div>
      </>
    );
})



export default List