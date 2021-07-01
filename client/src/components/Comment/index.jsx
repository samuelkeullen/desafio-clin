import React from 'react';
import Person from '@material-ui/icons/AccountCircle';

import "./styles.css";

const Comment = (props) => {

    function convertDate(date) {
        const new_date = new Date(date)
        return (
            new_date.toLocaleDateString() + " | " + new_date.toLocaleTimeString()
        )
    }
    return ( 

        <div key={props.key} data-key={props.data_key} id="comment">
            <div id="comment-content">
                <div id="comment-author">
                    <Person />
                    <p>Comentario Anônimo</p>
                </div>
                <div id="comment-text">
                    <p>{props.body}</p>
                </div>
                <div id="timestamp-block">
                    <p>{convertDate(props.date)}</p>
                </div>
            </div>
            
        </div>
    );
}

export default Comment;