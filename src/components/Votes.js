import React, { Component } from 'react'
import {Card, CardHeader, Row, Col, CardImg, Button,Progress} from 'reactstrap'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/shared';
import { Redirect } from 'react-router-dom'
import Error from './Error'

class Votes extends Component {
    state = {
        result: null
    }

    handleChange = (e) => {
        //alert(e.target.value)
        this.setState({res:e.target.value})
    }

    handleSubmit = () => {
        const {dispatch,authedUser,id} = this.props
        const {result} = this.state

        if(result !== null) {
            dispatch(handleAddAnswer({
                authedUser,
                questionId: id,
                answer:result
            }))
        }
        else
        {
            alert("Please select one option")
        }
    }

    render() {
        const {error} = this.props
        //alert(this.props.location.id)
        if(error) {
            return (
                <div>
                    <Error />
                </div>
            )
        }

        const {authedUser,userName,userImg,question,ans} = this.props
    
        let Votes1 = question.optionOne.votes.length
        let Votes2 = question.optionTwo.votes.length
        let color1 = 'LightGray'
        let color2 = 'LightGray'
        let totalVotes = Votes1 + Votes2
        let getAns = false
        if(ans!==null){
            getAns = true
            if(ans==='optionOne') 
            { 
                color1='rgba(196, 245, 255, 0.5)'
            }
            if(ans==='optionTwo')
            { 
                color2='rgba(196, 245, 255, 0.5)'
            }
        }
       // alert(totalVotes)
        if(!authedUser) return <Redirect to="/login" />
        return(
        <div>
            <Card className="cardAlign">
                <CardHeader style={{marginBottom:"20px"}}><b>{userName} asks:</b></CardHeader>
                <Row>
                    <Col sm="3">
                        <CardImg style={{borderRadius:"50%",margin:"20px"}} src={userImg}></CardImg>
                    </Col>
                    <Col sm="1">
                    <div className="divider"></div>
                    </Col>
                    { !getAns ?
                    (<Col>
                        <b>Would you rather...</b>
                        <br/>
                        <input onClick={this.handleChange} style={{marginLeft:"50px",marginTop:"20px",marginRight:"20px"}} className="radioo" name="radioo" value="optionOne" type="radio"/>
                        {question.optionOne.text}
                        <br/>
                        <input onClick={this.handleChange} style={{marginLeft:"50px",marginTop:"10px",marginRight:"20px"}} className="radioo" name="radioo" value="optionTwo" type="radio"/>
                        {question.optionTwo.text}

                        <Button onClick={this.handleSubmit} style={{margin:"20px", width:"80%"}} color="primary" block>Submit</Button>
                    </Col>)

                    :(<Col>
                        <div style={{marginLeft:"20px"}}>
                            <h3><b>Results: </b></h3>
                            <p>Would you rather</p>
                            <Card style={{ backgroundColor:color1, boxShadow: "3px 3px #888888" }} className="smallCard">
                                {ans==="optionOne"?<div style={{position:"absolute",fontSize:"small",width:"45px",marginLeft:"325px",marginTop:"-45px"}} className="ui red big circular right label"><p>Your</p>Vote</div>:null}
                                <b style={{margin:"20px"}}>{question.optionOne.text}</b>
                                <center>
                                    <Progress color={Votes1>=Votes2?"success":"warning"} style={{width:"80%",height:"20px"}} value={Votes1} max={totalVotes}>{(Votes1*100/totalVotes).toFixed(2)}%</Progress>
                                    <b>{Votes1} Out Of {totalVotes}</b>
                                </center>
                            </Card>
                            <Card style={{backgroundColor:color2,boxShadow: "3px 3px #888888",marginTop:"30px",marginBottom:"20px"}} className="smallCard">
                            {ans==="optionTwo"?<div style={{position:"absolute",fontSize:"small",width:"45px",marginLeft:"325px",marginTop:"-45px"}} className="ui red big circular right label"><p>Your</p>Vote</div>:null}
                                <b style={{margin:"20px"}}>{question.optionTwo.text}</b>
                                <center>
                                    <Progress color={Votes2>=Votes1?"success":"warning"} style={{width:"80%",height:"20px"}} value={Votes2} max={totalVotes}>{(Votes2*100/totalVotes).toFixed(2)}%</Progress>
                                    <b>{Votes2} Out Of {totalVotes}</b>
                                </center>
                            </Card>
                        </div>

                    </Col>)}
                </Row>
            </Card>
        </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users},{match}) {
    const Qid=match.params.question_id
    if(questions[Qid] === undefined) {
        const error = true;
        return {
            error
        }
    }
    const userName = users[questions[Qid].author].name
    const question = questions[Qid]

    let ans=''
    if(question.optionOne.votes.includes(authedUser)) {
        ans = 'optionOne'
    } else if (question.optionTwo.votes.includes(authedUser)) {
        ans = 'optionTwo'
    } else {
        ans = null
    }
    const userImg = users[question.author].avatarURL
    const error = false
    return {
        id:Qid,
        question,
        ans,
        authedUser,
        userName,
        userImg,
        error
    }
}

export default connect(mapStateToProps)(Votes)