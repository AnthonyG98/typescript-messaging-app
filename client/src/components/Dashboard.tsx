import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state';
import { bindActionCreators } from "redux"
import axios from "axios";
import { Image } from "cloudinary-react";
import  { DashProps } from '../props/DashProps';
import { SearchProps } from "../props/SearchProps";

export function Dashboard(){
    let url = 'http://localhost:3001';

    const dispatch = useDispatch();
    const {enterUsername, enterSearchUser, enterChatId, enterMessage} = bindActionCreators(actionCreators, dispatch);
    const userInput = useSelector((state: State)=> state.user);
    const userPass = useSelector((state: State)=> state.pass);
    const userSearch = useSelector((state: State) => state.search);
    const userChat = useSelector((state: State) => state.chat);
    const userMessage = useSelector((state: State) => state.message);

    // interface UserSearchData {
    //     inputSearchUser: React.ChangeEvent<HTMLInputElement>;
    //     prevState: null;
    // }
      
    // React state management
    const [ profilePicture, setProfilePicture ] = useState();
    const [searchForUser, setSearchForUser] = useState<any>([]);
    const [receiverId, setReceiverId] = useState<number>();
    const [inputSearchUser, setInputSearchUser] = useState<string>('');

    const getLoggedInUser = () =>{
        axios.get(`${url}/users/${localStorage.getItem("username")}`).then(response =>{
            setProfilePicture(response.data.profile_picture);
            enterUsername(response.data.username);
        })
    }
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    function generateString(length: number) {
        const dashPropsContainer: HTMLElement | null  = document.getElementById("props-container");
          let result = "";
          const charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          enterChatId(result);
          dashPropsContainer.style.display= "none"
    }
    const searchUser = (  search: string ) => {
        let arrAllData = [];
        axios.get(`${url}/users/${search}`).then(response =>{
            arrAllData = [response.data]
            console.log(arrAllData);
            setReceiverId(response.data.id);
            setSearchForUser(
                arrAllData.map((searchData: any) =>{
                    return(
                        <SearchProps 
                        searchImg={searchData.profile_picture}
                        searchUsername={searchData.username}
                        messageBtn={() => generateString(8)}
                        />
                    )
                })
            )
        })
    }
    const sendMessage = () =>{
        const toEmptyInput: string | HTMLElement | null = document.getElementById("msg-input")
        const messageData = {
            receiver_id: receiverId,
            username: localStorage.getItem("username"),
            message: userMessage,
            chatId: userChat,
            userId: localStorage.getItem("id")
        }
        axios.post(`${url}/message`, messageData).then(response =>{
            console.log(response);
        })
        return toEmptyInput.value = "";
    }
    const getMyInbox = () =>{
        axios.get(`${url}/message/inbox/${localStorage.getItem("id")}`).then(response =>{
            //map and find out if this is sender return sender profile picture
            response.data.map((allInbox: any) =>{
                return(
                //     <DashProps 
                //     messageUsername={localStorage.getItem("id") === allInbox.receiver_id ?
                //     localStorage.getItem("username") : "hey"
                // }
                //     />
                axios.get(`${url}/users/${allInbox.username}`).then(response =>{
                    console.log(response.data)
                })
                )
            })
        })
    }
    useEffect(()=>{
        getLoggedInUser();
        getMyInbox();
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
                    onChange={(e)=>enterSearchUser(e.target.value)}
                    />
                    <button className="search-btn" onClick={() => searchUser(userSearch)}>SEARCH</button>
                    <Image
                    className="dashInputImg"
                    cloudName="delktfw1a"
                    publicId={profilePicture}
                    />
                </div>
            </div>
            <div className="dashboard-props">
                <>{<DashProps />}</>
                {searchForUser}
            </div>
            <div className="msg-container">
                <input type="text" className="input-msg" id="msg-input" onChange={(e)=>enterMessage(e.target.value)}/>
                <div className="plane-container" onClick={sendMessage}>
                    <i class="fas fa-paper-plane"></i>     
                </div>       
            </div>
        </div>
    )
}