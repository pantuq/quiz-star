import React, { memo, FC, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, message, Popover, Space, Tooltip, Typography } from 'antd'
import { QRCodeSVG } from 'qrcode.react'
import { useNavigate, useParams } from 'react-router-dom'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'

const { Title } = Typography

const StatHeader: FC = memo(function StatHeader() {
    const nav = useNavigate()
    const { title, isPublished } = useGetPageInfo()
    const { id } = useParams()

    // 拷贝链接
    const urlInputRef = useRef<InputRef>(null)
    function copy(){
        const elem = urlInputRef.current
        if(elem){
            elem.select()   //选中input的内容
            document.execCommand('copy')    // 拷贝选中内容
            message.success('复制成功')
        }
    }

    function getLinkAndQRCode(){
        if(!isPublished) return null
        
        // 定义url
        const url = `http://localhost:3000/question/${id}`
        // 定义二维码
        const QRCode = (
            <div style={{ textAlign: 'center' }}>
                <QRCodeSVG value={url} size={150} />
            </div>
        )
        return (
            <Space>
                <Input value={url} style={{ width: '300px'}} ref={urlInputRef}/>
                <Tooltip title="复制链接">
                    <Button icon={<CopyOutlined/>} onClick={copy}></Button>
                </Tooltip>
                <Popover content={QRCode}>
                    <Button icon={<QrcodeOutlined/>}></Button>
                </Popover>
            </Space>
        )
    }
    return (
      <div className={styles["header-wrapper"]}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Space>
              <Button
                type="link"
                icon={<LeftOutlined />}
                onClick={() => nav(-1)}
              >
                返回
              </Button>
              <Title>{title}</Title>
            </Space>
          </div>
          <div className={styles.main}>{getLinkAndQRCode()}</div>
          <div className={styles.right}>
            <Button type='primary' onClick={() => nav(`/question/edit/${id}`)}>编辑问卷</Button>
          </div>
        </div>
      </div>
    );
})



export default StatHeader