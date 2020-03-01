import React from 'react';
import LatLangSearchComponent from '../components/LatLangSearchComponent';
import PresetListComponent from '../components/PresetListComponent';
import FavouriteListComponent from '../components/FavouriteListComponent';
import HeaderComponent from "../components/HeaderComponent";
import '../assets/custom.css';
import * as constants from '../constants';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: constants.latLangSearchType
        }
    };

    selectLatLangSearchType = () => {
        this.setState({
            selectedOption: constants.latLangSearchType
        });
    };

    selectPresetSearchType = () => {
        this.setState({
            selectedOption: constants.presetSearchType
        });
    };

    selectFavouriteImages = () => {
        this.setState({
            selectedOption: constants.favSearchType
        });
    };

    render() {

        return (
            <div className="container-fluid">
                <HeaderComponent/>
                <div className="row">
                    <div className="btn-group col-12 col-md-12" role="group">
                        <button type="button"
                                className="btn btn-secondary"
                                id="1"
                                onClick={this.selectLatLangSearchType}>
                            <span>Search Images by coordinates</span>
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                id="2"
                                onClick={this.selectPresetSearchType}>
                            <span>Search Images for predefined locations</span>
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                id="3"
                                onClick={this.selectFavouriteImages}>
                            <span>Your Favourite Images</span>
                        </button>
                    </div>
                </div>
                <div style={{padding: "30px 15px"}}>
                    {this.state.selectedOption === constants.presetSearchType &&
                    <PresetListComponent pageNumber={this.state.pageNumber} type="preset"/>}

                    {this.state.selectedOption === constants.latLangSearchType &&
                    <LatLangSearchComponent pageNumber={this.state.pageNumber} type="latlang"/>}

                    {this.state.selectedOption === constants.favSearchType && <FavouriteListComponent
                        pageNumber={this.state.pageNumber} type="fav"
                    />}

                </div>
            </div>
        )
    }
}

export default HomeComponent;



