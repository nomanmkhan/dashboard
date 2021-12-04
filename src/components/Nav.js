import React from 'react';

function Nav(props) {
    function handleLogout() {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/"
                );
        });
        window.location = "/login";
    }
    return (
        <div style={{ backgroundColor: "#001529"}}>
            <div style={{ display: "flex", padding: "10px", alignItems:"center", justifyContent:"space-between" }}>
                <h2 style={{color:"grey"}} >Logo</h2>
                <p style={{color:"grey"}}>Ignore me. I'm not important. I'm cool, though.</p>
                <button onClick={handleLogout}>logout</button>
            </div>

        </div>
    );
}

export default Nav;
