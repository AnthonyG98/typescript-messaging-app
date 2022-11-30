import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state';
import { bindActionCreators } from "redux"
import axios from "axios";
import { Image } from "cloudinary-react";
import  { DashProps } from '../props/DashProps';


export function Dashboard(){
    let url = 'http://localhost:3001';

    const dispatch = useDispatch();
    const {enterPassword, enterUsername, enterProfilePicture} = bindActionCreators(actionCreators, dispatch);
    const userInput = useSelector((state: State)=> state.user);
    const userPass = useSelector((state: State)=> state.pass);

    interface UserSearchData {
        inputSearchUser: React.ChangeEvent<HTMLInputElement>;
        prevState: null;
    }
      
    // React state management
    const [ profilePicture, setProfilePicture ] = useState();
    const [username, setUsername] = useState();
    const [inputSearchUser, setInputSearchUser] = useState<string>('');

    const getLoggedInUser = () =>{
        axios.get(`${url}/users/${localStorage.getItem("username")}`).then(response =>{
            console.log(response);
            setProfilePicture(response.data.profile_picture);
            enterUsername(response.data.username);
        })
    }
    const searchUser = (  search: any ) => {
        axios.get(`${url}/users/${search}`).then(response =>{
            console.log(search)
        })
    }
    useEffect(()=>{
        getLoggedInUser();
    }, [])
    return(
        <div className="dashboard-container">
            <div className="dash-head-container">
                <div className="heading-container">
                    <h1 id="other">OTHER</h1>
                    <h1 id="side">SIDE</h1>
                </div>
                <div className="search-container">
                    <input type="text"
                    placeholder="Search for a user"
                    className="search-input"
                    onChange={(e)=>setInputSearchUser(e.target.value)}
                    />
                    <button className="search-btn" onClick={() => searchUser(inputSearchUser)}>SEARCH</button>
                    <Image
                    className="dashInputImg"
                    cloudName="delktfw1a"
                    publicId={profilePicture}
                    />
                </div>
            </div>
            <div className="dashboard-props">
                <>{<DashProps />}</>
            </div>
        </div>
    )
}