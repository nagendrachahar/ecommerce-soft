import React, { Component } from 'react';

export default class StatusDrop extends Component {

    constructor(props) {

        super(props);
        this.state = {
            StatusList: [{statusValue: true, statusName: 'Active'}, {statusValue: false, statusName: 'DeActive'}],
            loading: false,
            focus: false,
            dropText: "",
            Status: this.props.Status,
            suggestionList: false,
            Message: 'wait....!'
        };

    }

    componentWillReceiveProps(nextProps){

        if(nextProps.Status !== this.props.Status){
             this.selectItem(nextProps.Status);
        }
       
    }

    selectItem = (Status) => {
        let filtrWith = Status;
        let states =  this.state.StatusList.filter(function(i) {
            return i.statusValue === filtrWith
        });

        if(states.length > 0){
            let {statusValue, statusName} = states[0];
            this.changeDrop(statusValue, statusName)
        }
        else{
            this.setState({
                dropText: "",
                focus: false
            })
        }
    }

    changeDrop = (statusValue, statusName) => {
        
        this.setState({
            Status: statusValue, 
            dropText: statusName, 
            focus: true, 
            suggestionList: false 
        })

        this.props.Func(this.props.Name, statusValue)
    }

    onDropBlur = () => { 
       const drop =  setInterval(() => { 
            this.setState({
                focus: !["", null, "0", 0].includes(this.props.Status), 
                suggestionList: false
            }); 
            clearInterval(drop); 
        }, 300) 
    } 

    render(){

        const renderStatelist = (List) => {
            return (
                <div className="form-control-wrapper"> 

                    <label htmlFor={this.props.Name} className={this.state.focus ? "form-control-focus" : "null"}>{this.props.Placeholder}</label>
                    <input type="text" 
                        autoComplete="off" 
                        id={this.props.Name} 
                        value={this.state.dropText} 
                        onFocus={() => this.setState({focus: true, suggestionList: true})} 
                        onBlur={this.onDropBlur} 
                        onChange={() => console.log("hello")} /> 
                    
                    
                    <ul className={this.state.suggestionList ? "custom-drop-list show" : "custom-drop-list"}> 
                        {List.map(S => 
                            <li key={S.statusName} onClick={this.changeDrop.bind(this, S.statusValue, S.statusName)}>{S.statusName}</li> 
                        )} 
                    </ul> 

                </div> 
            );
        }

        let StatusList = this.state.loading 
            ? <p><em>Loading...</em></p> 
            : renderStatelist(this.state.StatusList); 

        return (
            <div> 
                {StatusList} 
            </div> 
        );
    }
}

StatusDrop.defaultProps = {
    Status: false
}
