import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row,  } from "antd"
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getVideo')
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.videos)
                }
                else {
                    alert('비디오 가져오기를 실패 했습니다.')
                }
            })
    }, [])
    // 인풋 부분이 비어있으면 한번만 실행, 아예 없으면 계속 실행 , 인풋 부분이란? 20줄에 [] 의미
    // dom 이 실행하기 전에 실행 = useEffect



    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col key={index} lg={6} md={8} xs={24}>
            <a href={`/video/${video._id}`}>
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className='duration'>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            </a>
            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description=""

            />
            <span>{video.writer.name}</span><br />
           <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("YYYY-MM-DD")}</span>
        </Col>
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Recommanded</Title>
            <hr />
            <Row gutter={[32, 16]}>
                { renderCards }    
            </Row>
        </div>
    )
}

export default LandingPage
