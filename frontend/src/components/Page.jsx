import React, { Component } from 'react'
import '../css/editor.css'
import 'katex/dist/katex.min.css';
import View from './View'
class Page extends Component {
    state = {
        page_data: [],
        page_title: ''
    }
    render() {
        return (<div>
            <View data={this.state.page_data} title={this}></View>
        </div>)
    }
    componentWillMount = () => {
        var id = this.props.match.params.id;
        fetch('/api/editor/' + id)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    this.setState({
                        page_data: res.title,
                        page_input: res.input
                    })
                }
                else {
                }
            })

    }
}
export default Page;