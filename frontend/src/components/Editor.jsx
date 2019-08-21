import React, { Component } from 'react'
import Settings from './Settings'
import View from './View'
import 'katex/dist/katex.min.css';
import '../css/editor.css'
class Editor extends Component {

    render() {
        return (
            <div className='container'>

                <div className='editor-container'>
                    <Settings
                        title={this.props.title}
                        input={this.props.input}
                        updateTitle={this.props.handleTitleChange}
                        id={this.props.id} ></Settings>
                    <div className='input'>
                        <div className='tex-title'>{this.props.title}</div>
                        <textarea className=' editor-input' value={this.props.input} onChange={this.props.editorTextChange}>
                        </textarea>
                    </div>
                    <View title={this.props.title} coupled_view={true} data={this.props.data}></View>
                </div>
            </div>)
    }


}
export default Editor