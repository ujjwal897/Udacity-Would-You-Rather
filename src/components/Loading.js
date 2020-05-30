import React from 'react';
import {Spinner} from 'reactstrap'

const Loading = () => {
    return(
        <center>
            <div></div>
            <Spinner style={{ width: '6rem', height: '6rem', alignContent:"center" ,marginTop:"200px"}} type="grow" />
            <div><b>Loading..</b></div>
        </center>
    )
}

export default Loading;