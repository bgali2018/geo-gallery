import React from 'react';
import {connect} from 'react-redux';

class Gallery extends React.Component {

    isPhotoExistsInList = (favlist,photoAdd) => {
         return favlist.filter(photo => {
            return photo.id === photoAdd.id
        })
    };

    addToFavList = (photoAdd) => {
        const {favlist} = this.props;

       let isPhotoExistsInFavList = this.isPhotoExistsInList(favlist,photoAdd);
       if(!isPhotoExistsInFavList.length){
           this.props.dispatchAddFavList([photoAdd]);
       }
    };

    render() {
        let imageProps = {
            width: "200px",
            height: "200px",
            padding: "10px"
        };

        return (
            this.props.list ? <div className = "col-12  col-sm-12 col-md-8 col-lg-8 col-xl-8"
                                   style={{padding: "0 15px 15px 15px",borderRadius : "15px"}}>
                <div className = "row">
                {this.props.list.map(photo => {
                        const {farm} = photo;
                        const {server} = photo;
                        const {secret} = photo;
                        const {id } = photo;
                        const src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_t.jpg`
                    return  <div  key = {id} className = "col-12 col-sm-4 col-sm-4 col-md-4 col-lg-3 col-xl-2" >
                        <img  className = "col-12" style = {imageProps }   src =   {src} alt =''/>
                        <div className = "col-12" style = {{padding :"10px", width:"200px"} }>
                            { this.props.type !== 'fav' &&
                            <button type="button"
                                    className="btn btn-success col-sm-12 col-md-12"
                                    onClick={() => this.addToFavList(photo)}>
                                Add to Favourites</button>}
                        </div>
                        </div>
                            })}

                </div></div> :''

        )
    }

}
const mapDispatchToProps = dispatch => {
    return {
        dispatchAddFavList: (payload) => dispatch({
            type: 'ADD_TO_FAV_LIST',
            payload: payload
        })
    };
};

const mapStateToProps = state => {
    return {
        favlist : state.favlist
    };
};

Gallery = connect(
    mapStateToProps,
    mapDispatchToProps
)(Gallery);

export default Gallery;
