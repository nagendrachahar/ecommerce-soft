import React, { Component } from 'react';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

export default class BrandDrop extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            BrandList: [],
            loading: true,
            Message: 'wait....!'
        };

        axios.get(`${process.env.PUBLIC_URL}/api/getBrandDrop`)
        .then(response => {
            this.setState({ BrandList: response.data.brand, loading: false });
        });

    }

    render(){

        const renderlist = (List) => {
            return (
             
                <TextField
                    id="outlined-select-currency" 
                    select 
                    label="Select" 
                    name="brandId" 
                    value={this.props.BrandId} 
                    onChange={this.props.func} 
                    helperText="Please select your currency" 
                    margin="normal" 
                    variant="outlined" 
                    >
                    {List.map(option => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.brandName}
                        </MenuItem>
                    ))}
                </TextField>
            );
        }

        let Brandlist = this.state.loading
            ? <p><em>Loading...</em></p>
            : renderlist(this.state.BrandList);

        return (
            <div>
                {Brandlist}
            </div>
        );
    }
}

BrandDrop.defaultProps = {
    BrandId: "0"
}
