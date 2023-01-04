import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
import { bindActionCreators } from "redux";
import axios from "axios";
import { Image } from "cloudinary-react";
import { DashProps } from "../props/DashProps";
import { SearchProps } from "../props/SearchProps";
import { ChatProps } from "../props/ChatProps";
import { Settings } from "./Settings";
export function Dashboard() {
  let url = "https://other-side.herokuapp.com";

  const dispatch = useDispatch();
  const { enterUsername, enterSearchUser, enterChatId, enterMessage } =
    bindActionCreators(actionCreators, dispatch);
  const userInput = useSelector((state: State) => state.user);
  const userPass = useSelector((state: State) => state.pass);
  const userSearch = useSelector((state: State) => state.search);
  const userChat = useSelector((state: State) => state.chat);
  const userMessage = useSelector((state: State) => state.message);

  // interface UserSearchData {
  //     inputSearchUser: React.ChangeEvent<HTMLInputElement>;
  //     prevState: null;
  // }

  // React state management
  const [profilePicture, setProfilePicture] = useState();
  const [myId, setMyId] = useState<number | null>();
  const [searchForUser, setSearchForUser] = useState<any>([]);
  const [messageUser, setMessageUser] = useState<any>([]);
  const [chat, setChat] = useState<any>([]);
  const [receiverId, setReceiverId] = useState<number | null>();
  const [receiverImg, setReceiverImg] = useState<string>();
  const [inputSearchUser, setInputSearchUser] = useState<string>("");

  const getLoggedInUser = () => {
    axios
      .get(`${url}/users/${localStorage.getItem("username")}`)
      .then((response) => {
        setProfilePicture(response.data.profile_picture);
        setMyId(response.data.id);
        enterUsername(response.data.username);
        console.log(response.data);
        getMyInbox();
      });
  };
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length: number) {
    const dashPropsContainer: HTMLElement | null =
      document.getElementById("props-container");
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    enterChatId(result);
    dashPropsContainer.style.display = "none";
  }
  const searchUser = (search: string) => {
    let arrAllData = [];
    axios.get(`${url}/users/${search}`).then((response) => {
      arrAllData = [response.data];
      setReceiverId(response.data.id);
      setReceiverImg(response.data.profile_picture);
      setSearchForUser(
        arrAllData.map((searchData: any) => {
          return (
            <SearchProps
              searchImg={searchData.profile_picture}
              searchUsername={searchData.username}
              messageBtn={() => generateString(8)}
            />
          );
        })
      );
    });
  };
  const sendMessage = () => {
    const toEmptyInput: string | HTMLElement | null =
      document.getElementById("msg-input");
    const messageData = {
      receiver_id: receiverId,
      username: localStorage.getItem("username"),
      message: userMessage,
      chatId: userChat,
      userId: myId,
      receiver_profile_picture: receiverImg,
      sender_profile_picture: profilePicture,
    };
    axios.post(`${url}/message`, messageData).then((response) => {
      console.log(response);
    });
    return (toEmptyInput.value = "");
  };
  const openChat = (chat: string) => {
    axios.get(`${url}/message/chat/${chat}`).then((response) => {
      console.log(response.data);
      response.data.map((allData: any) => {
        return (
          setReceiverId(null),
          enterChatId(allData.chatId),
          setReceiverImg(allData.receiver_profile_picture),
          setMyId(null),
          console.log(allData.message)
        );
      });
      setChat(
        response.data.map((allChat: any) => {
          return (
            <ChatProps
              chatImg={allChat.sender_profile_picture}
              chatMessage={allChat.message}
            />
          );
        })
      );
    });
  };
  const getMyInbox = () => {
    axios
      .get(`${url}/users/${localStorage.getItem("username")}`)
      .then((response) => {
        let myLoginId = response.data.id;
        axios
          .get(`${url}/message/inbox/${localStorage.getItem("id")}`)
          .then((response) => {
            //map and find out if this is sender return sender profile picture
            // console.log(response.data)
            setMessageUser(
              response.data.map((allInbox: any) => {
                return (
                  <DashProps
                    messageUsername={allInbox.message}
                    messageImg={
                      allInbox.UserId === myLoginId
                        ? allInbox.receiver_profile_picture
                        : allInbox.sender_profile_picture
                    }
                    openChatById={() => openChat(allInbox.chatId)}
                  />
                );
              })
            );
          });
      });
  };
  //*note: to get only a single instance of chat on left hand side make all other msgs null ^^^^^^^

  const openSettings = () => {
    const settingsContainer: HTMLElement | null =
      document.getElementById("settings");
    settingsContainer.style.animation = "move-left 1s ease";
    settingsContainer.style.animationFillMode = "forwards";
  };
  useEffect(() => {
    getLoggedInUser();
  }, []);
  return (
    <div className="dashboard-container">
      <div className="dash-head-container">
        <div className="heading-container">
          <h1 id="other">OTHER</h1>
          <h1 id="side">SIDE</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a user"
            className="search-input"
            onChange={(e) => enterSearchUser(e.target.value)}
          />
          <button className="search-btn" onClick={() => searchUser(userSearch)}>
            SEARCH
          </button>
          <Image
            className="dashInputImg"
            cloudName="delktfw1a"
            publicId={profilePicture}
            onClick={() => openSettings()}
          />
        </div>
      </div>
      <div className="dashboard-props">
        <>{messageUser}</>
        {searchForUser}
      </div>
      <div className="msg-container">
        <div className="mob-msg-background"></div>
        <div className="chat-container">{chat}</div>
        <div className="input-msg-container">
          <input
            type="text"
            className="input-msg"
            id="msg-input"
            onChange={(e) => enterMessage(e.target.value)}
          />
          <div className="plane-container" onClick={sendMessage}>
            <i class="fas fa-paper-plane"></i>
          </div>
        </div>
      </div>
      <Settings />
    </div>
  );
}
