function parser(content)
{
    var equation_content = []
    for (var i = 0; i < content.length; i++) {

        if (content[i] == "\\block") {
            equation_content.push(
                {
                    type: 'block',
                    value:content[i+1]
                })
            i = i + 2
        }
        else if(content[i] == '\\image')
        {
            equation_content.push(
                {
                    type:'image',
                    value:content[i+1]
                }
            )
            i = i + 2
        }
        else {
            // Parse inline text here
            var paragraph = content[i];
            var paragraph_elements = {
                type:'paragraph',
                values:[]
            }
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
                        paragraph_elements.values.push(
                            {
                                type: 'inline_equation',
                                value: eq_text
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
                        var inline_classname = (content[i - 1] == "") ? 'inline-text' : ""
                        paragraph_elements.values.push(
                            {
                                type: 'inline_text',
                                css:inline_classname,
                                value: in_text
                            }
                        )
                    }
                }
            }
            equation_content.push(paragraph_elements)
        }
    }
   return equation_content
}

export default parser