import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Chat from './Chat';
import SideBarChat from './SideBarChat';
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="siderbar__header">

                <Avatar />

                <div className="siderbar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="sidebar__search">
                <div className="siderbar__searchContainer">
                    <SearchIcon/>
                    <input type="text" placeholder="Search"/>
                </div>
                
            </div>

            <div className="sidebar__chats">
                <SideBarChat/>
                <SideBarChat/>

                <SideBarChat/>

            </div>
        </div>
    )
}

export default Sidebar
