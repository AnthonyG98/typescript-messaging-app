import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state';
import { bindActionCreators } from "redux"
import axios from "axios";

export function Dashboard(){
    let url = 'http://localhost:3001';

    const dispatch = useDispatch();
    const {enterPassword, enterUsername, enterProfilePicture} = bindActionCreators(actionCreators, dispatch);
    const userInput = useSelector((state: State)=> state.user);
    const userPass = useSelector((state: State)=> state.pass);


    const getLoggedInUser = () =>{
        axios.get(`${url}/users/${userInput}`).then(response =>{
            console.log(response)
        })
    }
    useEffect(()=>{
        getLoggedInUser();
    }, [])
    return(
        <div className="dashboard-container">
            <h1>{userInput}</h1>
            <h1>{userPass}</h1>
            hey
        </div>
    )
}