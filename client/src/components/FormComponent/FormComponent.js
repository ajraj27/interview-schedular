import React ,{Component} from 'react';
import axios from "axios";
import Input from '../IndividualComponent/Input';

class FormComponent extends Component {
    constructor(){
        super();
        this.state={
            participants:[],
            email:null,
            startTime:null,
            endTime:null
        }
    }

    componentWillMount= async () => {
        const doc=await axios.get("/getParticipants");
        this.setState({participants:doc.data});
    }


    changeEmailHandler=(e) => {
        this.setState({email:e.target.value});
    }


    changeEndTimeHandler=(e) => {
        this.setState({endTime:e.target.value});
    }

    changeStartTimeHandler=(e) => {
        this.setState({startTime:e.target.value});
    }

    onSubmit=(e) => {
       e.preventDefault();
       
       const interviewData={
           email:this.state.email,
           startTime:this.state.startTime,
           endTime:this.state.endTime
       }

       axios({
           method:"post",
           url:"/saveData",
           data:interviewData
       });

    }

    render(){


        let allowed;
        if(this.state.email && this.state.startTime && this.state.endTime) allowed=1;
        else allowed = 0;

        const list=this.state.participants.map((participant) => {
            return  <li><b>Name</b>: {participant.name} &nbsp;&nbsp;&nbsp;&nbsp;  <b>Email</b>: {participant.email}</li>
        });

        return(
            <div className="row bg-danger">
                <div className="col-md-4 offset-md-4">
                    <div className="card m-3">
                        <h1 className="card-header text-center bg-primary text-white">INTERVIEW SCHEDULAR</h1>
                        <div class="card-body">
                            <h3>Patricipants</h3>
                            <ol>
                                {list}
                            </ol>

                            <h3>Schedule Interview</h3>
                            <Input
                            title="Email" 
                            name="email" 
                            type="email" 
                            controlFunc={this.changeEmailHandler} />

                            <Input
                            title="Start Time" 
                            name="startTime" 
                            type="time" 
                            controlFunc={this.changeStartTimeHandler} />

                            <Input
                            title="End Time" 
                            name="endTime" 
                            type="time" 
                            controlFunc={this.changeEndTimeHandler} />

                            {console.log(this.state.startTime)}

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="text-center">
                                    <button 
                                        disabled={allowed===0?true:false}
                                        className="btn btn-primary btn-lg" 
                                        type="submit">Submit</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
           
        );
    }
}

export default FormComponent;