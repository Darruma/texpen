import React, { Component } from 'react'
import '../css/editor.css'
import 'katex/dist/katex.min.css';
import parser from '../texParser';
import View from './View'
class Page extends Component {
    state = {
        page_data: [],
        page_title: ''
    }
    render() {
        return (<div className='page'>
            <View data={this.state.page_data} title={this.state.page_title}></View>
        </div>)
    }
    componentWillMount = () => {
        var id = this.props.match.params.id;
        fetch('/api/editor/' + id)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    this.setState({
                        page_title: res.title,
                        page_data: parser(res.input.split("\n"))
                    },() => console.log(this.state))
                }
                else {
                }
            })

    }
}
export default Page;