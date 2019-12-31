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
import ScaleStyled from './examples/Scale_styled'
import ScaleStyled2 from './examples/Scale_styled_2'
import ArcPointerStyled from './examples/Arc_Pointer_styled'
import Filter from './filter'

export default () => (
    <div>
        <Filter />
        <H1>React Knob</H1>
        <H2>
            <span>Base Components</span>
        </H2>
        <Description>
            The base of all knobs is the <pre>Knob</pre> component which handles
            all of the user interaction and calculation of the knob value. The
            user can interact via drag'n drop, mousewheel and keyboard. The
            knobs are accessible by the <pre>tab</pre> key.
            <br /> The display part is splitted into the <pre>
                Pointer
            </pre>, <pre>Scale</pre>, <pre>Arc</pre> and <pre>Value</pre>. One
            or more of them can be <pre>children</pre> of a <pre>Knob</pre>.
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
            The <pre>Pointer</pre> and <pre>Scale</pre> components can also
            render custom components.
        </Description>
        <Grid>
            <PointerCustom />
            <ScaleCustom />
        </Grid>
        <H2>
            <span>Styles</span>
        </H2>
        <Description>
            The components and the knob itself can be styled by addingthe{' '}
            <pre>className</pre> prop. The <pre>Scale</pre> can have an
            additional <pre>activeClassname</pre> prop to style the active tick
            differently. As all components are SVG you can also use filters in
            your styles.
        </Description>
        <Grid>
            <ArcPointerStyled />
            <ScaleStyled />
            <ScaleStyled2 />
        </Grid>
    </div>
)
