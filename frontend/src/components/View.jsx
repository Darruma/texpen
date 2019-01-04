import React, { Component } from 'react'
import '../css/editor.css'
import 'katex/dist/katex.min.css';
import EquationBlock from './EquationBlock'
import TeX from '@matejmazur/react-katex';

class View extends Component {
    state = {
        data:[],
        title:''   
    }
    render() {
        var editor_view = (this.props.coupled_view) ? 'editor-view-coupled' : 'editor-view-page';
        return (<div className={editor_view}>
            <div className='tex-title'>{this.props.title}</div>
            {
                this.props.data.map(element => {
                    if (element.type == 'block') {
                        return (<EquationBlock value={element.value}></EquationBlock>)
                    }
                    else if (element.type == 'image') {
                        return (<img className='image ' src={element.value}></img>)
                    }
                    else if (element.type == 'paragraph') {
                        if (element.values.length == 0) {
                            return <br></br>
                        }
                        else {
                            return (<div className='paragraph'>
                                {element.values.map((el) => {
                                    if (el.type == 'inline_equation') {
                                        return (<TeX>{el.value}</TeX>)
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
   
}
export default View