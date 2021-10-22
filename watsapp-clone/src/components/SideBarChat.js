import React from 'react'
import { Avatar } from '@material-ui/core'

function SideBarChat() {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>last chat wil show up here</p>
            </div>
        </div>
    )
}

export default SideBarChat
