import React, { useEffect } from 'react'
import {Carousel} from 'antd';



export default function index() {
  return (
    <>
    <Carousel style={{width:"100%",height:"100%"}} className='login-signup-col-size' autoplay>
    <div>
      <div className='login-signup-col-size'>
            <img src="./track.png" alt="" style={{objectFit:'cover',width:"100%",
            // height:'470px'
            }}/>
      </div>
    </div>
    <div>
      <div className='login-signup-col-size'>
            <img src="./savings.png" alt="" style={{objectFit:'cover',width:"100%",
            // height:'470px'
            }}/>
      </div>
    </div>
    <div>
      <div className='login-signup-col-size'>
            <img src="./calculator.png" alt="" style={{objectFit:'cover',width:"100%",
            // height:'470px'
            }}/>
      </div>
    </div>
    
  </Carousel>
    </>
  )
}
