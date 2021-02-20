import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector(state => state.auth.user);
    return (
        <>
            {user && Object.keys(user).length === 0
                ? <Redirect to={"/signin"} />
                : <Redirect to={"/home"} />
            }
        </>
    )
}

export default Home;