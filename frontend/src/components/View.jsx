import React, { Component } from 'react'
import '../css/editor.css'
import 'katex/dist/katex.min.css';
import EquationBlock from './EquationBlock'
import TeX from '@matejmazur/react-katex';

class View extends Component {
    render() {
        return (<div className='editor-box editor-view'>
            <div className='tex-title'>{this.props.title}</div>
            {
                this.props.data.map(element => {
                    if (element.type == 'block') {
                        return (<EquationBlock value={element.value}></EquationBlock>)
                    }
                    else if (element.type == 'image') {
                        return (<img className='image ' src={this.state.content[i + 1]}></img>)
                    }
                    else if (element.type == 'paragraph') {
                        if (element.values.length == 0) {
                            return <br></br>
                        }
                        else {
                            return (<div className='paragraph'>
                                {element.values.map((el) => {
                                    if (el.type == 'inline_equation') {
                                        return (<Tex>{el.value}</Tex>)
                                    }
                                    else if (el.type == 'inline_text') {
                                        return (<span className={el.css}>{el.value}</span>)
                                    }
                                })}
                            </div>)
                        }
                    }
                })
            }

        </div>)
    }
    componentDidMount = () => {
        if (this.props.lone_view == true) {
            console.log('lone')
        }
    }
}
export default View