import React from "react";

class DeafultLatLang extends React.Component {

    render() {
        return (
            <div className="col-sm-12 col-md-8"
                 style={{padding: "0 15px 15px 15px", borderRadius: "15px"}}>
                <div style={{position: "relative", top: "10%", textAlign: "center"}}
                     dangerouslySetInnerHTML={{__html: this.props.default}}>
                </div>
            </div>
        );
    }
}

export default DeafultLatLang;
