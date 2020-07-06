import React from 'react'
import './css/editor.css'
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';


function parse_line(line) {
    let content = []
    let re = /\$(.*?)\$/g
	let matches = []	 
	let match
	while ((match = re.exec(line)) != null) {
		matches.push(match)
	}
    if(matches.length === 0) {
        return [<div>{line}</div>]
    }
    let i = 0
    let currentIndex = 0
    while ( i < matches.length ) {
        let m = matches[i]
        let slice = line.slice(currentIndex,m.index) 
        currentIndex = m.index + m[0].length
        if(slice !== "") {
            content.push(<div style={{ display: 'inline-block',paddingLeft: "4px",paddingRight:"4px" }}>{slice}</div>)
        }
        content.push(<TeX math={m[1]}/>)
        i = i + 1
    }
    content.push(<div style={{ display: 'inline-block',paddingLeft: "4px",paddingRight:"4px" }}>{line.slice(currentIndex)}</div>)
    
    return content
}

export default function parser(content)
{
    let output = []
    for(let i = 0; i < content.length; i++) {
        let line = content[i]
		if (line.replace(/\s/g, '') === "#block") {
            output.push(<TeX math={content[i+1]} block/>)
            i = i + 1
            continue
        }
		else if (line.replace(/\s/g,'') === "#image") {
            output.push(<img className="image" src={content[i+1]} alt={"block_image"}/>)
            i = i + 1
            continue
        }
        else if (line === "") {
            output.push(<div style={{"paddingTop" : "10px"}}></div>)
         }
        
        else {
            let inline_elements = parse_line(line)
            console.log(inline_elements)
            output = [...output,...inline_elements] 
         }
    }
   return output
}

