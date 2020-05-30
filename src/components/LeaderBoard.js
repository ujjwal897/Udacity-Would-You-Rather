import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, CardImg,CardHeader} from 'reactstrap'
import { Redirect } from 'react-router-dom';

class LeaderBoard extends Component {
    render() {
        const {authedUser,usersDetails} = this.props;
        if(!authedUser) 
        {
            return <Redirect to="/login" />
        }
        return(
            <div className='cardAlign'>
                { usersDetails.slice(0, 3).map((user,indx) => (
                    <Card style={{boxShadow: "5px 5px #888888"}} key={indx} className="cardAlign">
                        {indx===0?<div className="ui yellow left corner label">1st</div>:null}
                        {indx===1?<div className="ui grey left corner label">2nd</div>:null}
                        {indx===2?<div className="ui brown left corner label">3rd</div>:null}
                        <Row>
                            <Col sm="3">
                                <CardImg style={{borderRadius:"50%",margin:"20px",marginLeft:"5px"}} src={user.avatarURL}></CardImg>
                            </Col>
                            <Col sm="1">
                                <div className="divider"></div>
                            </Col>
                            <Col sm="4">
                                <h4 className="bold" style={{marginTop:"10px",marginBottom:"15px"}}>{user.name}</h4>
                                <p>Answered Questions <span style={{float:"right"}}>{user.QAnswered}</span></p>
                                <hr/>
                                <p>Created Questions <span style={{float:"right"}}>{user.createQ}</span></p>
                            </Col>
                            <Col sm="1">
                                <div className="divider"></div>
                            </Col>
                            <Col sm="3">
                                <Card style={{margin:"20px"}}>
                                    <center>
                                        <CardHeader>Score</CardHeader>
                                        <div style={{margin:"20px"}} className="ui orange big circular label">{user.score}</div>
                                    </center>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
        )
    }
}

function mapStateToProps({authedUser,users}) {
    const usersDetails = Object.keys(users)
        .map((user) => {
            const userInfo = {
                name: users[user].name,
                avatarURL: users[user].avatarURL,
                QAnswered: Object.keys(users[user].answers).length,
                createQ: users[user].questions.length
            }
            userInfo.score = userInfo.QAnswered + userInfo.createQ
            return(userInfo)
        }).sort((a,b) => (b.score - a.score))

    return {
        authedUser,
        usersDetails
    }
}

export default connect (mapStateToProps)(LeaderBoard)