import React from 'react'

import { H1, H2, Grid, Description } from './styled'
import PointerExample from './examples/Pointer'
import ScaleExample from './examples/Scale'
import ArcExample from './examples/Arc'
import ArcPointerExample from './examples/Arc_Pointer'
import ScalePointerExample from './examples/Scale_Pointer'
import ValueExample from './examples/Value'
import ArcPointerValueExample from './examples/Arc_Pointer_Value'
import ScaleScale from './examples/Scale_Scale'
import PointerCustom from './examples/Pointer_custom'
import ScaleCustom from './examples/Scale_custom'

export default () => (
    <div>
        <H1>React Knob</H1>
        <H2>
            <span>Base Components</span>
        </H2>
        <Description>
            The base of all knobs is the <pre>Knob</pre> component which handles
            all of the user interaction and calculation of the knob value.{' '}
            <br /> The display part is splitted into the <pre>Pointer</pre>,{' '}
            <pre>Scale</pre>, <pre>Arc</pre> and <pre>Value</pre>. One or more{' '}
            of them can be <pre>children</pre> of a <pre>Knob</pre>.
        </Description>
        <Grid>
            <PointerExample />
            <ArcExample />
            <ScaleExample />
            <ValueExample />
        </Grid>
        <H2>
            <span>Combinations</span>
        </H2>
        <Description>
            You can combine all of the base components in a knob.
        </Description>
        <Grid>
            <ArcPointerExample />
            <ScalePointerExample />
            <ArcPointerValueExample />
            <ScaleScale />
        </Grid>
        <H2>
            <span>Custom Elements</span>
        </H2>
        <Description>
            The <pre>Knob</pre> component and the <pre>Pointer</pre> and{' '}
            <pre>Scale</pre> components can also render custom components. All
            direct children of the <pre>Knob</pre> get the following props
            passed: <pre>percentage</pre> <pre>size</pre>, <pre>value</pre>,
            <pre>angleOffset</pre>,<pre>angleRange</pre>,{' '}
            <pre>radius: size / 2</pre>,<pre>center: size / 2</pre>,{' '}
            <pre>steps</pre>. The children of <pre>Pointer</pre> get{' '}
            <pre>width</pre>, <pre>height</pre>, <pre>percentage</pre> passed.
        </Description>
        <Grid>
            <PointerCustom />
            <ScaleCustom />
        </Grid>
    </div>
)
