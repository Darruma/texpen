import React, { Component } from 'react'
import '../css/editor.css'
import 'katex/dist/katex.min.css';
class View extends Component {
    render() {
        return (<div className='editor-box editor-view'>
            <div className='tex-title'>{this.props.title}</div>
            {
                this.props.data.map(element => {
                    if (element.type == 'block') {
                        return element.value
                    }
                    else if (element.type == 'paragraph') {
                        if (element.values.length == 0) {
                            return <br></br>
                        }
                        else {
                            return (<div className='paragraph'>
                                {element.values.map((el) => {
                                    return el.value
                                })}
                            </div>)
                        }
                    }
                })
            }

        </div>)
    }
}
export default View