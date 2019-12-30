# rc-knobs

Renders a react knob component that can be widely customised.

## Installation
```
npm install rc-knob
yarn add rc-knob
```

## Examples
https://eskimoblood.github.io/rc-knob/

## Usage
The main idea is to split the user interaction and value calculation from the actual rendering of typical knob elements like pointer, scale or value. 
So all logic is done in the [`Knob`](#Knob) component which is the root component. 
All visual UI is done in one of this components: [`Arc`](#Arc), [`Pointer`](#Pointer), [`Scale`](#Scale) and [`Value`](#Value).
All UI elements are rendered as SVG.   
All the UI component don't to anything beside rendering and are useless on their own as they need a bunch of props that they get from the parent [`Knob`](#Knob) component to render the current value of the knob. 
A simple knob with a pointer and value would look like this: 

```
import React from 'react'
import { Knob, Pointer, Value } from 'rc-knob'

export default ()=> (
    <Knob>
        <Value />
        <Pointer width={1} height={2}/>
    </Knob>
)
```

## API

### Knob

The Knob component is root component that handles all the user interactions. 
I does not render any visual UI elements but an `<div><svg></svg></div>`.
All children will be added to the `<svg>` element.
It handles the user interaction by mouse, mouse wheel and keyboard arrow keys.
It is accessible by keyboard using `tab`.

#### Props

##### angleOffset
Offset of the start angle in degree of the knob. 
The default is `0` which will be the top of the circle.

##### angleRange
Angle of the range in degree. 
By default its 360.

##### ariaLabelledBy
Will be added as `aria-labelledby` to the knob main element.

##### ariaValueText
Will be added as `aria-valuetext` to the knob main element.

##### children
Can be any of [`Arc`](#Arc), [`Pointer`](#Pointer), [`Scale`](#Scale) and [`Value`](#Value). 
Also multiple components of the same type can be added.
Beside that, any SVG element including `filter` can be rendered.

##### className
Will be added to the knob main element.

##### max
Max value of the knob.

##### min
Min value of the knob.

##### onChange
Callback that will pass the value when user interact with the knob.

##### size
Width and height of the knob in `px`

##### snap
Indicates if the knob should snap to a step. 
Has only an effect if `steps` is set.
Is `false` be default.

##### steps
Number of steps the knob can snap to.
It's also used to calculate the single steps for the `Scale` component. 

##### value
Value of the knob

### Arc
Renders an arc that indicates the current knob value.

#### Props

##### arcWidth
Width of the arc.
The arc will expand to the centre.

##### background
Color of the arc over the whole range of the knob.
If `background` is not set, the background arc will not rendered.

##### color
Color of the arc that indicates the value of the knob.

##### radius
Outer radius of the arc.
Will be the knob `size` by default

### Pointer
Pointer of the knob.
Can be either be a SVG `rect` or `circle` depending on the passed `type` prop or any SVG element that is passed as a children.

#### Props

##### children
Can be any SVG element or a component that will render a SVG element. 
If you pass a component the percentage of the current value will be passed as a prop.  
The element will be rendered as pointer.
Note, that you have to pass `width` and `height` as props to make calculate the correct position.

##### className
Will be added to the `rect`, `circle` or the children.

##### color
`color` prop passed to the `rect`, `circle` element if type is selected.

##### height
Height of the `rect` or the custom element. 
Will be ignored for circle.
Will be the same as `width` if not set.

##### radius
Outer radius of the circle the pointer sits on.

##### type
Can be `rect` or `circle`. 
Will render the according SVG element.
`width` and|or `height` props needs to be set.

##### width
Width of the `rect` or the custom element. 
Radius when type is set to `circle`.

### Scale
Renders a radial scale.
The number of ticks is set by the `step` prop of the parent [`Knob`](#Knob) component.
The single scale tick can be a SVG `rect` or `circle`. 
Additionally a render function can be passed as a prop, that will render each tick.
This is useful if the scale ticks should have different colors, or different tick length for every 10th tick for example.


#### Props

##### type
Can be `rect` or `circle`, default is `rect`. 
Will render the according SVG element.
`tickWidth` and|or `tickHeight` props needs to be set.

##### radius
Outer radius where the ticks ends.

##### tickWidth
Width of a single tick.
Used as radius if type is `circle`.

##### tickHeight
Height of a single tick.
Is ignored when type is `circle`.

##### color
Will be passed as color prop to the render SVG element of a tick or to the custom render function.

##### activeColor
`color` for the tick that indicates the same value as the current knob value.

##### className
Will be passed as prop to the render SVG element of a tick or to the custom render function.


##### activeClassName
`className` for the tick that indicates the same value as the current knob value.

##### fn
Function that can be used to have the full control over how a tick is rendered.
The function needs to return a SVG element.
The function will get the following props passed:
`active`,
`activeClassName`,
`activeColor`,
`angleOffset`,
`center`,
`className`,
`color`,
`stepSize`,
`tickHeight`,
`translateX`,
`translateY`,
`tickWidth`.
Most of them are just passed down from the [`Pointer`](#Pointer) or the [`Knob`](#Knob). 
Additionally are 
`center` the half of the [`size`](#size) of the [`Knob`](#Knob) ,
`stepSize` the size of the angle of one step in degree,
`translateX`, `translateY` that are needed to put the tick on the correct position using the transform prop e.g: ``transform={`translate(${translateX} ${translateY})`}``
and `i` which is the index of the current tick.

### Value
Render the current value as SVG text element.

#### Props

##### decimalPlace
Number of decimal places the value should rendered with.
Is `0` by default.

##### className
`className` that is passed to the SVG `text` component.

##### marginBottom
Useful to adjust the horizontal position of the text inside of the [`Knob`](#Knob).

