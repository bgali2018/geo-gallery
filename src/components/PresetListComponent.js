import React from 'react';
import Gallery from '../containers/Gallery';
import {getImages} from "../services/getImages";
import {presetData} from "../services/getPresetList";
import DeafultLatLang from "./DeafultLatLang";
import * as constants from "../constants";


class PresetListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presetAddressList: presetData,
            latitudeValue: '',
            longitudeValue: '',
            photoList: [],
            pageNumber: 0,
            initialLayout: constants.presetListDefaultLayout
        }
        this.getImagesFromSelectedLocation = this.getImagesFromSelectedLocation.bind(this);
    }

    handlePreviousButton = () => {
        this.setState({
            pageNumber: this.state.pageNumber - 1
        }, () => {
            this.getImageList()
        });
    };

    handleNextButton = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 1
        }, () => {
            this.getImageList()
        });
    };

    getImageList = () => {
        let data = {};
        data.apiKey = process.env.REACT_APP_GEO_GALLERY_API_KEY;
        data.latValue = this.state.latitudeValue;
        data.longValue = this.state.longitudeValue;
        data.pageNumber = this.state.pageNumber ? this.state.pageNumber : this.setState({pageNumber: 1});
        const photoList = getImages(data);
        photoList.then(res => {
            this.setState({
                photoList: res.data.photos.photo
            })
        })

    };

    getImagesFromSelectedLocation = (e) => {
        let selectedAddress = this.state.presetAddressList[e.currentTarget.dataset.id - 1];
        this.setState({
            latitudeValue: selectedAddress.latVal,
            longitudeValue: selectedAddress.longVal
        }, () => {
            this.getImageList();
        })

    };

    render() {
        const {presetAddressList} = this.state;
        return (<div className="row">
                <div className="col-sm-12 col-md-4" style={{
                    backgroundColor: "#6c757d", padding: "30px",
                    borderRadius: "10px", maxHeight: "300px"
                }}>
                    <ul style={{listStyle: "none", backgroundColor: "#6c757d", padding: 0}}>
                        {presetAddressList.map((address) => {
                            return <li className="col-sm-12 " key={address.id} onClick={this.getImagesFromSelectedLocation}
                                       data-id={address.id} style={{padding: "1px"}}>
                                <button style={{padding: "10px", width: "100%"}}>{address.name}</button>
                            </li>
                        })}
                    </ul>
                </div>
                {this.state.photoList.length > 0 &&
                <Gallery className="col-sm-12 col-md-8" list={this.state.photoList}/>}

                {this.state.photoList.length === 0 &&
                <DeafultLatLang className="col-sm-12 col-md-10" default={this.state.initialLayout}/>}

                {this.state.pageNumber && this.state.photoList.length > 0 ?
                    <div className="row" style={{margin: 'auto', paddingTop: '50px'}}>
                        {this.state.pageNumber !== 1 &&
                        <button type="button" className="btn btn-success " onClick={this.handlePreviousButton}
                                style={{padding: "10px", marginRight: "10px", width: "100px"}}> Prev</button>}
                        {this.state.photoList.length > 0 &&
                        <button type="button" className="btn btn-success" onClick={this.handleNextButton}
                                style={{width: "100px"}}> Next </button>}
                    </div> : ''}
            </div>

        )
    }
}

export default PresetListComponent;