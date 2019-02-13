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
                    <Settings title={this.props.title} input={this.props.input} updateTitle={this.props.handleTitleChange} id={this.props.match.params.id} ></Settings>
                    <div className='input'>
                        
                        <textarea className='editor-box editor-input' value={this.props.input} onChange={this.props.onTextChange}>
                        </textarea>
                    </div>
                    <View title={this.props.title} coupled_view={true} data={this.props.rendered}></View>
                </div>
            </div>)
    }


}
export default Editor