import React, { Component } from 'react'
import '../css/editor.css'
import 'katex/dist/katex.min.css';
class View extends Component
{
    render()
    {
        return(<div className='editor-box editor-view'>
        <div className='tex-title'>{this.props.title}</div>
        {
            this.props.data.map(element =>
                {
                    return element.value
                })
        }

        </div>)
    }
}
export default View