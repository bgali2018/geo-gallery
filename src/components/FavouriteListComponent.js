import React from 'react';
import Gallery from "../containers/Gallery";
import {connect} from "react-redux";
import DeafultLatLang from "./DeafultLatLang";
import * as constants from '../constants'

class FavouriteListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
            photoList: [],
            initialLayout: constants.favListDefaultLayout
        }
    }

    handlePrevButton = () => {
        this.setState({
            pageNumber: this.state.pageNumber - 1
        });
    };

    handleNextButton = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 1
        });
    };

    currentPageImageList = (favlist, pageNumber) => {
        return favlist.slice(pageNumber * 10, (pageNumber * 10) + 10)
    };

    render() {
        const { favlist } = this.props;
        const { pageNumber } = this.state;
        const displayList = this.currentPageImageList(favlist, pageNumber);
        const isNextButtonRequired = favlist.length / ((displayList.length) + (10 * pageNumber));
        return (
            favlist ? <div className="row">
                <div className="col-sm-12 col-md-4"></div>

                {displayList.length > 0 &&
                <Gallery className="col-sm-12 col-md-12" list={displayList} type={this.props.type}/>}

                {favlist.length === 0 &&
                <DeafultLatLang className="col-sm-12 col-md-10" default={this.state.initialLayout}/>}

                {displayList.length > 0 ? <div className="row" style={{margin: 'auto'}}>
                    {this.state.pageNumber !== 0 &&
                    <button type="button" className="btn btn-success" onClick={this.handlePrevButton}
                            style={{padding: "10px", marginRight: "10px"}}> Prev</button>}
                    {isNextButtonRequired > 1 &&
                    <button type="button" className="btn btn-success" onClick={this.handleNextButton}> Next </button>}
                </div> : ''}
            </div> : ''
        )
    }
}

const mapStateToProps = state => {
    return {
        favlist: state.favlist
    };
};

FavouriteListComponent = connect(
    mapStateToProps
)(FavouriteListComponent);
export default FavouriteListComponent;