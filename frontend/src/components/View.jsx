import React, { Component } from 'react'
import '../css/editor.css'
import 'katex/dist/katex.min.css';

class View extends Component {
    state = {
        title: ''
    }
    render() {
        var editor_view = (this.props.coupled_view) ? 'editor-view-coupled' : 'editor-view-page';
        return (<div className={editor_view}>
            <div className='tex-title'>{this.props.title}</div>
            {this.props.data}

        </div>)
    }

}
export default View
