import React from 'react';
import Nav from "../Nav";
import Side from "../Side"
import RouteApp from "./routes/index"
function Layouts(props) {
    return (
        <div className="cont" style={{ display: "flex", height: "100vh" }}>
            <Side props={props} />
            <div style={{ display: "flex", flexDirection: "column", flex: "auto", }}>
                <Nav />
                <RouteApp />
            </div>
        </div>
    );
}

export default Layouts;
