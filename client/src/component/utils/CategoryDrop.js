import React, { Component } from 'react';
import {categoryCall} from '../../Services/master'

export default class CatgoryDrop extends Component {

    constructor(props) {

        super(props);
        this.state = {
            CategoryList: [],
            loading: true,
            focus: false,
            dropText: "",
            categoryId: this.props.CategoryId,
            suggestionList: false,
            Message: 'wait....!'
        };

        this.mounted = true;

        this.fillDropdown(0);
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.CategoryId !== this.props.CategoryId){
             this.selectItem(nextProps.CategoryId);
        }
        
        if(nextProps.ParentId !== this.props.ParentId){
            this.fillDropdown(nextProps.ParentId);
        }
        
    }

    selectItem = (CategoryId) => {
        let filtrWith = CategoryId;
        let states =  this.state.CategoryList.filter(function(i) {
            return i._id === filtrWith
        });

        if(states.length > 0){
            let {_id, categoryName} = states[0];
            this.changeDrop(_id, categoryName)
        }
        else{
            this.setState({
                dropText: "",
                focus: false
            })
        }
    }

    fillDropdown = (id) => {
        categoryCall.getCategoryDrop(id)
        .then(response => {

            if(this.mounted){
                this.setState({ CategoryList: response.data.category, loading: false });
                this.selectItem(this.props.CategoryId);
            }
            
        });
    }

    changeDrop = (id, Name) => {
        
        this.setState({
            categoryId: id, 
            dropText: Name, 
            focus: true, 
            suggestionList: false 
        })

        this.props.Func(this.props.Name, id)
    }

    onDropBlur = () => { 
       const drop =  setInterval(() => { 
            this.setState({
                focus: !["", null, "0", 0].includes(this.props.CategoryId), 
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
                            <li key={S._id} onClick={this.changeDrop.bind(this, S._id, S.categoryName)}>{S.categoryName}</li> 
                        )} 
                    </ul> 

                </div> 
            );
        }

        let CategoryList = this.state.loading 
            ? <p><em>Loading...</em></p> 
            : renderStatelist(this.state.CategoryList); 

        return (
            <div> 
                {CategoryList} 
            </div> 
        );
    }
}

CatgoryDrop.defaultProps = {
    CategoryId: "0",
    ParentId: "0"
}
