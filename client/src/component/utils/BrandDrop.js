import React, { Component } from 'react';
import axios from 'axios';

export default class BrandDrop extends Component {

    constructor(props) {

        super(props);
        this.state = {
            suggestionList: [],
            loading: true,
            focus: false,
            dropText: "",
            isSuggestList: false
        };

        this.mounted = true;

        axios.get(`${process.env.PUBLIC_URL}/api/getBrandDrop`)
        .then(response => {
            if(this.mounted) this.setState({ suggestionList: response.data.brand, loading: false });
        });

    }

    componentWillUnmount(){
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.Value !== this.props.Value){
            let filtrWith = nextProps.Value;
            let states =  this.state.suggestionList.filter(function(i) {
                return i._id === filtrWith
            });

            if(states.length > 0){
                let {_id, brandName} = states[0];
                this.changeDrop(_id, brandName)
            }
            else{
                this.setState({
                    dropText: "",
                    focus: false
                })
            }

        }
        
    }

    changeDrop = (id, Name) => {
        
        this.setState({
            dropText: Name, 
            focus: true, 
            isSuggestList: false 
        })

        this.props.Func(this.props.Name, id)
        
    }

    onDropBlur = () => { 
       const drop =  setInterval(()=>{ 
            this.setState({
                focus: !["", null, "0", 0].includes(this.props.Value), 
                isSuggestList: false
            }); 
            clearInterval(drop); 
        }, 300) 
    } 

    handleChange = (e) => {
        console.log("hello");
    }

    render(){

        const renderlist = (List) => {
            return (
                <div className="form-control-wrapper"> 

                    <label htmlFor={this.props.Name} className={this.state.focus ? "form-control-focus" : "null"}>{this.props.Placeholder}</label>
                    <input type="text" 
                        autoComplete="off" 
                        id={this.props.Name} 
                        value={this.state.dropText} 
                        onFocus={() => this.setState({focus: true, isSuggestList: true})} 
                        onBlur={this.onDropBlur} 
                        onChange={() => console.log("hello")} />
       
                    
                    <ul className={this.state.isSuggestList ? "custom-drop-list show" : "custom-drop-list"}> 
                        {List.map(S => 
                            <li key={S._id} onClick={this.changeDrop.bind(this, S._id, S.brandName)}>{S.brandName}</li> 
                        )} 
                    </ul> 

                </div> 
            );
        }

        let Drop = this.state.loading 
            ? <p><em>Loading...</em></p> 
            : renderlist(this.state.suggestionList); 

        return (
            <div> 
                {Drop} 
            </div> 
        );
    }
}

BrandDrop.defaultProps = {
    Value: "0"
}
