import React, { Component } from 'react';
import axios from 'axios';

export default class CityDrop extends Component {

    constructor(props) {

        super(props);
        this.state = {
            CityList: [], 
            loading: false, 
            focus: false, 
            dropText: "", 
            cityId: this.props.CityId, 
            suggestionList: false, 
            Message: 'wait....!' 
        };

        this.fillCity = this.fillCity.bind(this);
        this.fillCity(this.props.StateId);
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.CityId !== this.props.CityId){
            this.selectItem(nextProps.CityId)
        }

        if (nextProps.StateId !== this.props.StateId) {
            //Perform some operation
            this.fillCity(nextProps.StateId);
        }
    }

    selectItem = (CityId) => {
        let filtrWith = CityId;
        let citys =  this.state.CityList.filter(function(i) {
            return i._id === filtrWith
        });

        if(citys.length > 0){
           let {_id, cityName} = citys[0];
           this.changeDrop(_id, cityName)
        }
        else{
           this.setState({
               dropText: "",
               focus: false
           })
       }
    }

    fillCity(id) {
        if(id === '' || id === null || id === '0'){
            console.log(id)
        }
        else{
            axios.get(`${process.env.PUBLIC_URL}/api/getCityByStateId/${id}`)
            .then(response => {
                this.setState({ CityList: response.data.city, loading: false });
                this.selectItem(this.props.CityId)
            });
        }
    }

    changeDrop = (id, Name) => {
        
        this.setState({
            cityId: id, 
            dropText: Name, 
            focus: true, 
            suggestionList: false 
        })

        this.props.Func('cityId', id); 
    }

    onDropBlur = () => { 
       const drop =  setInterval(() => { 
            this.setState({
                focus: !["", null, "0", 0].includes(this.props.CityId), 
                suggestionList: false
            }); 
            clearInterval(drop); 
        }, 300) 
    } 

    render(){

        const renderlist = (List) => {
            return (
                <div className="form-control-wrapper"> 

                    <label htmlFor="cityId" className={this.state.focus ? "form-control-focus" : "null"}>City</label>
                    <input type="text" 
                        autoComplete="none" 
                        id="cityId" 
                        value={this.state.dropText} 
                        onFocus={() => this.setState({focus: true, suggestionList: true})} 
                        onBlur={this.onDropBlur} 
                        onChange={() => console.log("hello")} /> 
                    
                    <ul className={this.state.suggestionList ? "custom-drop-list show" : "custom-drop-list"}> 
                        {List.map(S => 
                            <li key={S._id} onClick={this.changeDrop.bind(this, S._id, S.cityName)}>{S.cityName}</li> 
                        )} 
                    </ul> 

                </div> 
            );
        }

        let CityList = this.state.loading 
            ? <p><em>Loading...</em></p> 
            : renderlist(this.state.CityList); 

        return (
            <div> 
                {CityList} 
            </div> 
        );
    }
}

CityDrop.defaultProps = {
    StateId: "0",
    CityId: "0"
}
