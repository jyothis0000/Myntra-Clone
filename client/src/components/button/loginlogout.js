import React from 'react'
import Lowel from './LoginWelcome';
import Wel from './Welcome';

function profilewel(props) {

if(!localStorage.usertoken) {
    return(<div><Wel /></div>)
}
else{
    return(<div><Lowel /></div>)
}
}

export default profilewel