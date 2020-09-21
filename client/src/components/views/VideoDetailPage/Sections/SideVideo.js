import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import moment from 'moment'

function SideVideo() {

    const [sideVideos, setsideVideos] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getVideo')
            .then(response => {
                if (response.data.success) {
                    setsideVideos(response.data.videos)
                }
                else {
                    alert('비디오 가져오기를 실패 했습니다.')
                }
            })
    }, [])


    const renderSideCards = sideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return         <div div style={{display:'flex', marginBottom : "1rem", padding : '0 2rem'}}>
        <div style={{width: '40%', marginBottom : '1rem', marginRight:'1rem'}}>
            <a href={`/video/${video._id}`}>
                <img style={{width:'100%', height:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
            </a>
        </div>           

        <div style={{width:'50%'}}>
            <a href={`/video/${video._id}`}>
                <span style={{fontSize: '1rem', color:'black'}}>{video.title}</span><br />
                <span style={{color : 'gray'}}>{video.writer.name}</span><br/>
                <span style={{color : 'gray'}}>{video.views} views</span><br/>
                <span style={{color : 'gray'}}>{minutes} : {seconds}</span><br/>
            </a>
        </div> 
    </div> 
    })

    return (
        // 세로정렬 할 수 있도록 도와줌
        <React.Fragment>
            <div style={{marginTop : "3rem"}}>
            { renderSideCards }
            </div>
        </React.Fragment>
    )
}

export default SideVideo
