import React , { Component } from 'react'
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
class EquationBlock extends Component
{
    render()
    {
        return (
        <TeX block>
        {this.props.value}
        </TeX>)
    }
}
export default EquationBlock