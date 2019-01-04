import React, { Component } from 'react'
import Settings from './Settings'
import View from './View'
import 'katex/dist/katex.min.css';
import '../css/editor.css'
import parser from '../texParser'
class Editor extends Component {
    state = {
        content: [],
        rendered: [],
        title: '',
        input: ''
    }
    render() {
        
        return (
            <div className='container'>

                <div className='editor-container'>
                    <Settings title={this.state.title} input={this.state.input} updateTitle={this.handleTitleChange} ></Settings>
                    <div className='input'>
                        <div className='line-numbers'>
                            {Array(45).fill(0).map((element, index) => {
                                return <div className='line-number'>{index + 1} </div>
                            }
                            )}
                        </div>
                        <textarea className='editor-box editor-input' value={this.state.input} onChange={this.onTextChange}>
                        </textarea>
                    </div>
                        <View title={this.state.title} coupled_view={true} data={this.state.rendered}></View>
                </div>
            </div>)
    }

    onTextChange = (e) => {
        e.preventDefault();
        this.setState({ input: e.target.value })
        this.setState({ content: e.target.value.split("\n") }, () => {
            this.setState({ rendered: parser(this.state.content) })
        });

    }
    handleTitleChange = (value) => {
        this.setState({ title: value });
    }
    handleSettingsModal = (e) => {
        e.preventDefault()
    }
    uploadContent = () => {
        fetch('api/editor/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                title: this.state.title,
                latex: this.state.content,
                input: this.state.input
            })
        });
    }
    componentDidMount() {
        var id = this.props.match.params.id;
        fetch('/api/editor/' + id)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    this.setState({
                        title: res.title,
                        input: res.input,
                        content: res.input.split("\n"),
                        rendered: parser(res.input.split("\n"))
                    })
                }
                else {
                }
            })
    }

}
export default Editor