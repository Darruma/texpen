import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../css/editor.css'
class Settings extends Component
{
    state ={
        url:''
    }
    render()
    {
        var link = (this.state.url) ? 'texpen.herokuapp.com/' + this.state.url : ''
        var urlOutput = <p className='url-output'>{link}</p>
        var Clipboard = (this.state.url) ?  <CopyToClipboard text={link}>
        <button className='clipboard'>
            Click to copy to clipboard
        </button>
        </CopyToClipboard> : ''
        return(
        <div className='editor-settings editor-box title-input'>
            <p className='title'>Change Title</p> 
                <input onChange={(e)=>this.props.updateTitle(e.target.value)} 
                className='title-input-block'>
                </input>
            <button onClick={this.saveSettings} className='save'>Save</button>
            {Clipboard}
            {urlOutput}
        </div>)
    }
   
    saveSettings = (e) =>
    {
        var pageID = this.props.id
        if(pageID == undefined)
        {
            console.log('undefined fam')
            pageID = 'none'
        }
        fetch('api/editor/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                title: this.props.title,
                input: this.props.input,
                id:pageID
            })
        })
        .then(res => res.json()).then((res) =>
        {
            console.log(res)
            if(res.success)
            {
                this.setState({
                    url:res.url
                },() => console.log(this.state.url))
            }
        }

        );
    }
}
export default Settings