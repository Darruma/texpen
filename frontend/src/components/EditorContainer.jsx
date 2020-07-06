import React, { Component } from 'react'
import parser from '../texParser'
import Editor from './Editor'
class EditorContainer extends Component {
    state = {
        content: [],
        rendered: [],
        title: 'Edit Me',
        input: '',
        
    }
    render() {
        return (<Editor
            data={this.state.rendered}
            input={this.state.input}
            editorTextChange={this.onTextChange}
            title={this.state.title}
            handleTitleChange={this.handleTitleChange}
        ></Editor>)
    }
    onTextChange = (e) => {
        e.preventDefault();
        this.setState({ input: e.target.value })
        this.setState({ content: e.target.value.split("\n") }, () => {
            this.setState({ rendered: parser(this.state.content) })
        });

    }
    
    handleTitleChange = (e) => {
        console.log(e)
        this.setState({ title: e.target.value });
    }
    handleSettingsModal = (e) => {
        e.preventDefault()
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        console.log("id " + id)
        if (id) {
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

}
export default EditorContainer
