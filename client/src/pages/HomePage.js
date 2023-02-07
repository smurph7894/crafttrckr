import { useReactiveVar } from '@apollo/client';
import React from 'react'
import Home from '../components/Home'
import { userState } from '../GlobalState';
import log from '../helpers/logging';

const HomePage = () => {

    const user = useReactiveVar(userState);
    log(user);

    if(!user) {
        return null;
    }

    return (
        <>
            <Home />
        </>
    )
}

export default HomePage