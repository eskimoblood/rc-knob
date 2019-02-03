import React from 'react'
import Example from '../Example'
import { Value } from 'rc-knob'

const example = `
<Knob 
  size={100}  
  angleOffset={220} 
  angleRange={280}
  min={0}
  max={100}
>
  <Value 
    marginBottom={10} 
    className="value"
  />
</Knob>

.value {
  font-family: 'Eczar', serif;
  fill: #fc5a96;
  font-size: 50px;
}

`

export default () => (
    <Example
        title="Value"
        example={example}
        knob={<Value marginBottom={35} className="value" />}
    />
)
