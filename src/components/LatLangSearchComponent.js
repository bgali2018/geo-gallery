import React from 'react';
import Gallery from "../containers/Gallery";
import {getImages} from "../services/getImages";
import DeafultLatLang from '../components/DeafultLatLang'
import * as constants from "../constants";

class LatLangSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitudeValue: '',
            longitudeValue: '',
            photoList: [],
            errorText: null,
            initialLayout: constants.latLangDefaultLayout
        }
    }

    handleLatitudeChange = (event) => {
        this.setState({
            latitudeValue: event.target.value,
            errorText: ''
        })
    };

    handleLongitudeChange = (event) => {
        this.setState({
            longitudeValue: event.target.value,
            errorText: ''
        })
    };

    prevButton = () => {
        this.setState({
            pageNumber: this.state.pageNumber - 1
        }, () => {
            this.getImageList()
        });
    };

    NextButton = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 1
        }, () => {
            this.getImageList()
        });
    };

    getImageList = () => {
        let data = {};
        data.latValue = this.state.latitudeValue;
        data.longValue = this.state.longitudeValue;
        data.pageNumber = this.state.pageNumber ? this.state.pageNumber : this.setState({pageNumber: 1});
        data.apiKey = process.env.REACT_APP_GEO_GALLERY_API_KEY;
        if (data.latValue.trim() === '' || data.longValue.trim() === '') {
            this.setState({
                errorText: 'Please enter values'
            })
        } else {
            const photoList = getImages(data);
            photoList.then(res => {
                this.setState({
                    photoList: res.data.photos ? res.data.photos.photo : [],
                    errorText: res.data.photos ? '' : res.data.message
                }, () => {
                    if (!this.state.photoList.length) {
                        this.setState({
                            errorText: this.state.errorText
                        })
                    }
                })
            })

        }
    }

    render() {
        const {errorText} = this.state;
        return (
            <div className="row">

                <div className="col-sm-12 col-md-4" style={{
                    backgroundColor: "#6c757d", padding: "30px",
                    borderRadius: "10px", maxHeight: "300px"
                }}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="Latitude">Latitude</label>
                            <input type="number" className="form-control" id=""
                                   value={this.state.latitudeValue} onChange={this.handleLatitudeChange}
                                   placeholder="Enter Latitude Value"/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="Longitude">Longitue</label>
                            <input type="number" className="form-control" id=""
                                   value={this.state.longitudeValue} onChange={this.handleLongitudeChange}
                                   placeholder="Enter Longitude Value"/>

                        </div>
                        {errorText && <label style={{color: "orange"}}>{errorText}</label>}

                    </form>
                    <button type="button" className="btn btn-success col-sm-12 col-md-12"
                            onClick={this.getImageList}>Get Images
                    </button>
                </div>


                {this.state.photoList.length > 0 &&
                <Gallery className="col-sm-12 col-md-10" list={this.state.photoList}/>}
                {this.state.photoList.length === 0 &&
                <DeafultLatLang className="col-sm-12 col-md-10" default={this.state.initialLayout}/>}

                {this.state.pageNumber && this.state.photoList.length > 0 ?
                    <div className="row" style={{margin: 'auto', paddingTop: '50px'}}>
                        {this.state.pageNumber !== 1 &&
                        <button type="button" className="btn btn-success" onClick={this.prevButton}
                                style={{padding: "10px", marginRight: "10px", width: "100px"}}> Prev</button>}
                        {this.state.photoList.length > 0 &&
                        <button type="button" className="btn btn-success" onClick={this.NextButton}
                                style={{width: "100px"}}> Next </button>}
                    </div> : ''}
            </div>

        )
    }
}

export default LatLangSearchComponent;


