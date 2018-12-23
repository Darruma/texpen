import React, { Component } from 'react'
import EquationBlock from './EquationBlock'
import View from './View'
import 'katex/dist/katex.min.css';
import '../css/editor.css'
import TeX from '@matejmazur/react-katex';
class Editor extends Component {
    state = {
        title: [],
        content: [],
        rendered: [],
        title: 'Default',
        input: ''
    }
    render() {
        return (
            <div className='container'>

                <div className='editor-container'>
                    <div className='editor-settings editor-box'></div>
                    <textarea className='editor-box editor-input' value={this.state.input} onChange={this.onTextChange}>
                    </textarea>
                    <View title={this.state.title} data={this.state.rendered}></View>
                </div>
            </div>)
    }

    onTextChange = (e) => {
        e.preventDefault();
        this.setState({ input: e.target.value })
        this.setState({ content: e.target.value.split("\n") });
        this.parseTex()

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
                input:this.state.input
            })
        });
    }
    componentDidMount() {
        var id = this.props.match.params.id;
        // fetch('/api/editor/' + id)
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res)
        //         if (res.success) {
        //             this.setState({
        //                 title: res.title,
        //                 content: res.latex,
        //                 input:res.input
        //             }, () => {
        //                     this.parseTex()
        //                 })

        //         }
        //         else {
        //         }
        //     })
    }
    parseTex = () => {
        var equation_content = []
        for (var i = 0; i < this.state.content.length; i++) {

            if (this.state.content[i] == "\\block") {
                var blockEquationComponent = <EquationBlock value={this.state.content[i + 1]}></EquationBlock>
                equation_content.push(
                    {
                        type: 'block',
                        value: blockEquationComponent
                    })
                i = i + 2
            }
            else {
                // Parse inline text here
                var paragraph = this.state.content[i];

                for (var j = 0; j < paragraph.length; j++) {
                    var currentIndex = j
                    if (paragraph[currentIndex] == '$') {
                        currentIndex = currentIndex + 1
                        var eq_text = ''
                        while (paragraph[currentIndex] != '$' && currentIndex < paragraph.length) {

                            eq_text = eq_text + paragraph[currentIndex];
                            currentIndex += 1
                        }
                        if (eq_text) {
                            j = currentIndex
                            equation_content.push(
                                {
                                    type: 'inline_equation',
                                    value: <TeX>{eq_text}</TeX>
                                }
                            )
                        }
                    }
                    else {
                        var in_text = ''

                        while (paragraph[currentIndex] != '$' && currentIndex < paragraph.length) {
                            in_text = in_text + paragraph[currentIndex];
                            currentIndex += 1
                        }

                        if (in_text) {
                            j = currentIndex - 1
                            var inline_classname = (this.state.content[i - 1] == "") ? 'inline-text' : ""
                            console.log(inline_classname)
                            equation_content.push(
                                {
                                    type: 'inline_text',
                                    value: <span className={inline_classname}>{in_text}</span>
                                }
                            )
                        }
                    }
                }

            }
        }
        this.setState({ rendered: equation_content })
    }

}
export default Editor