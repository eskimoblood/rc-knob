'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var clamp = function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
};
var caclulatePercentage = function caclulatePercentage(_ref) {
  var startX = _ref.startX,
      startY = _ref.startY,
      pageX = _ref.pageX,
      pageY = _ref.pageY,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange;
  var x = startX - pageX;
  var y = startY - pageY;
  var degree = Math.atan2(-y, -x) * 180 / Math.PI + 90 - angleOffset;
  var angle = degree < 0 ? degree + 360 : degree % 360;

  if (angle <= angleRange) {
    return clamp(0, 1, angle / angleRange);
  } else {
    return +(angle - angleRange < (360 - angleRange) / 2);
  }
};
var findClosest = function findClosest(values, value) {
  var result, lastDelta;
  values.some(function (item) {
    var delta = Math.abs(value - item);

    if (delta >= lastDelta) {
      return true;
    }

    result = item;
    lastDelta = delta;
  });
  return result;
};
var getValueFromPercentage = function getValueFromPercentage(_ref2) {
  var min = _ref2.min,
      max = _ref2.max,
      percentage = _ref2.percentage;
  return min + (max - min) * percentage;
};
var getPercentageFromValue = function getPercentageFromValue(_ref3) {
  var min = _ref3.min,
      max = _ref3.max,
      value = _ref3.value;
  return (value - min) / (max - min);
};
var getStartXY = function getStartXY(_ref4) {
  var container = _ref4.container,
      size = _ref4.size;
  return {
    startX: Math.floor(container.current.offsetLeft) + size / 2,
    startY: Math.floor(container.current.offsetTop) + size / 2
  };
};

var DIRECTIONS = {
  37: -1,
  38: 1,
  39: 1,
  40: -1
};
var onMouseMoveStart = function onMouseMoveStart(dispatch) {
  return function (e) {
    return dispatch(_objectSpread({}, e, {
      type: 'START'
    }));
  };
};
var onKeyDown = function onKeyDown(dispatch) {
  return function (e) {
    var direction = DIRECTIONS[e.keyCode];

    if (!direction) {
      return;
    } else {
      e.preventDefault();
      dispatch({
        type: 'STEPS',
        direction: direction
      });
    }
  };
};
var onScroll = function onScroll(dispatch) {
  return function (e) {
    var direction = e.deltaX < 0 || e.deltaY > 0 ? 1 : e.deltaX > 0 || e.deltaY < 0 ? -1 : 0;
    e.preventDefault();
    dispatch({
      type: 'STEPS',
      direction: direction
    });
  };
};

var addEventToBody = function addEventToBody(name, fn) {
  return document.body.addEventListener(name, fn);
};

var removeEventFromBody = function removeEventFromBody(name, fn) {
  return document.body.removeEventListener(name, fn);
};

var handleEventListener = function handleEventListener(_ref) {
  var dispatch = _ref.dispatch,
      isActive = _ref.isActive;
  return function () {
    var onMove = function onMove(_ref2) {
      var pageX = _ref2.pageX,
          pageY = _ref2.pageY;
      return dispatch({
        pageX: pageX,
        pageY: pageY,
        type: 'MOVE'
      });
    };

    var onStop = function onStop() {
      return dispatch({
        type: 'STOP'
      });
    };

    if (isActive) {
      addEventToBody('mousemove', onMove);
      addEventToBody('mouseup', onStop);
      return function () {
        removeEventFromBody('mousemove', onMove);
        removeEventFromBody('mouseup', onStop);
      };
    }
  };
};

var onStart = function onStart(state) {
  return _objectSpread({}, state, {
    isActive: true
  }, getStartXY(state));
};

var onMove = function onMove(_ref) {
  var state = _ref.state,
      action = _ref.action,
      onChange = _ref.onChange;
  var percentage = caclulatePercentage(_objectSpread({}, state, action));
  var value = getValueFromPercentage(_objectSpread({}, state, {
    percentage: percentage
  }));
  onChange(value);
  return _objectSpread({}, state, {
    percentage: percentage,
    value: value
  });
};

var onChangeByStep = function onChangeByStep(_ref2) {
  var state = _ref2.state,
      action = _ref2.action,
      onChange = _ref2.onChange;
  var value = clamp(state.min, state.max, state.value + 1 * action.direction);
  onChange(value);
  return _objectSpread({}, state, {
    value: value,
    percentage: getPercentageFromValue(_objectSpread({}, state, {
      value: value
    }))
  });
};

var reducer = function reducer(onChange) {
  return function (state, action) {
    switch (action.type) {
      case 'START':
        return onStart(state);

      case 'MOVE':
        return onMove({
          state: state,
          action: action,
          onChange: onChange
        });

      case 'STEPS':
        return onChangeByStep({
          state: state,
          action: action,
          onChange: onChange
        });

      default:
        return _objectSpread({}, state, {
          isActive: false,
          value: state.value
        });
    }
  };
};

var useUpdate = (function (_ref3) {
  var min = _ref3.min,
      max = _ref3.max,
      initialValue = _ref3.initialValue,
      _ref3$angleOffset = _ref3.angleOffset,
      angleOffset = _ref3$angleOffset === void 0 ? 0 : _ref3$angleOffset,
      _ref3$angleRange = _ref3.angleRange,
      angleRange = _ref3$angleRange === void 0 ? 360 : _ref3$angleRange,
      size = _ref3.size,
      steps = _ref3.steps,
      snap = _ref3.snap,
      onChange = _ref3.onChange;
  var svg = React.useRef();
  var container = React.useRef();

  var _useReducer = React.useReducer(reducer(onChange), {
    isActive: false,
    min: min,
    max: max,
    angleOffset: angleOffset,
    angleRange: angleRange,
    percentage: initialValue ? (initialValue - min) / (max - min) : 0,
    value: initialValue || 0,
    svg: svg,
    container: container,
    size: size
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      percentage = _useReducer2$.percentage,
      value = _useReducer2$.value,
      angle = _useReducer2$.angle,
      isActive = _useReducer2$.isActive,
      dispatch = _useReducer2[1];

  React.useEffect(handleEventListener({
    dispatch: dispatch,
    isActive: isActive
  }), [isActive]);
  return {
    svg: svg,
    container: container,
    percentage: steps ? findClosest(steps, percentage) : percentage,
    value: value,
    angle: angle,
    onStart: onMouseMoveStart(dispatch),
    onKeyDown: onKeyDown(dispatch),
    onScroll: onScroll(dispatch)
  };
});

var pointOnCircle = function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
};

var degTorad = function degTorad(deg) {
  return Math.PI * deg / 180;
};

var calcPath = function calcPath(_ref) {
  var percentage = _ref.percentage,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      arcWidth = _ref.arcWidth,
      outerRadius = _ref.radius,
      center = _ref.center;
  var angle = angleRange * percentage;
  var startAngle = angleOffset - 90;
  var innerRadius = outerRadius - arcWidth;
  var startAngleDegree = degTorad(startAngle);
  var endAngleDegree = degTorad(startAngle + angle);
  var largeArcFlag = angle < 180 ? 0 : 1;
  var p1 = pointOnCircle(center, outerRadius, endAngleDegree);
  var p2 = pointOnCircle(center, outerRadius, startAngleDegree);
  var p3 = pointOnCircle(center, innerRadius, startAngleDegree);
  var p4 = pointOnCircle(center, innerRadius, endAngleDegree);
  return "M".concat(p1.x, ",").concat(p1.y, " A").concat(outerRadius, ",").concat(outerRadius, " 0 ").concat(largeArcFlag, " 0 ").concat(p2.x, ",").concat(p2.y, "L").concat(p3.x, ",").concat(p3.y, " A").concat(innerRadius, ",").concat(innerRadius, " 0 ").concat(largeArcFlag, " 1 ").concat(p4.x, ",").concat(p4.y, " L").concat(p1.x, ",").concat(p1.y);
};

var Arc = function Arc(_ref2) {
  var color = _ref2.color,
      background = _ref2.background,
      props = _objectWithoutProperties(_ref2, ["color", "background"]);

  return React__default.createElement("g", null, background && React__default.createElement("path", {
    d: calcPath(_objectSpread({}, props, {
      percentage: 1
    })),
    style: {
      fill: background
    }
  }), React__default.createElement("path", {
    d: calcPath(props),
    style: {
      fill: color
    }
  }));
};

var Pointer = function Pointer(_ref) {
  var children = _ref.children,
      width = _ref.width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? width : _ref$height,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      percentage = _ref.percentage,
      radius = _ref.radius,
      center = _ref.center,
      type = _ref.type,
      color = _ref.color,
      className = _ref.className;
  return React__default.createElement("g", {
    transform: "\n        rotate(".concat(angleOffset + angleRange * percentage, " ").concat(center, " ").concat(center, ")\n        translate( ").concat(center - width / 2, " ").concat(center - radius - height, ")\n        ")
  }, children && React__default.Children.map(children, function (child) {
    return React__default.cloneElement(child, {
      width: width,
      height: height,
      percentage: percentage
    });
  }), type === 'rect' && React__default.createElement("rect", {
    width: width,
    height: height,
    fill: color,
    className: className
  }), type === 'circle' && React__default.createElement("circle", {
    r: width,
    fill: color,
    className: className
  }));
};

var renderCircle = function renderCircle(_ref) {
  var tickWidth = _ref.tickWidth,
      translateX = _ref.translateX,
      translateY = _ref.translateY,
      angleOffset = _ref.angleOffset,
      stepSize = _ref.stepSize,
      center = _ref.center,
      color = _ref.color,
      active = _ref.active,
      activeColor = _ref.activeColor,
      activeClassName = _ref.activeClassName,
      className = _ref.className;
  return function (_, i) {
    return React__default.createElement("circle", {
      r: tickWidth,
      key: i,
      className: i === active ? activeClassName : className,
      fill: i === active ? activeColor : color,
      stroke: "none",
      transform: "\n        rotate(".concat(angleOffset + stepSize * i, " ").concat(center, " ").concat(center, ") \n        translate(").concat(translateX, " ").concat(translateY, ")\n        ")
    });
  };
};

var renderRect = function renderRect(_ref2) {
  var tickWidth = _ref2.tickWidth,
      tickHeight = _ref2.tickHeight,
      translateX = _ref2.translateX,
      translateY = _ref2.translateY,
      angleOffset = _ref2.angleOffset,
      stepSize = _ref2.stepSize,
      center = _ref2.center,
      color = _ref2.color,
      active = _ref2.active,
      activeColor = _ref2.activeColor,
      activeClassName = _ref2.activeClassName,
      className = _ref2.className;
  return function (_, i) {
    return React__default.createElement("rect", {
      className: i === active ? activeClassName : className,
      fill: i === active ? activeColor : color,
      stroke: "none",
      width: tickWidth,
      height: tickHeight,
      key: i,
      transform: "\n        rotate(".concat(angleOffset + stepSize * i, " ").concat(center, " ").concat(center, ") \n        translate(").concat(translateX, " ").concat(translateY, ")\n        ")
    });
  };
};

var renderCustom = function renderCustom(_ref3) {
  var fn = _ref3.fn,
      props = _objectWithoutProperties(_ref3, ["fn"]);

  return function (_, i) {
    return fn(_objectSpread({}, props, {
      i: i
    }));
  };
};

var Scale = function Scale(_ref4) {
  var angleRange = _ref4.angleRange,
      steps = _ref4.steps,
      _ref4$type = _ref4.type,
      type = _ref4$type === void 0 ? 'rect' : _ref4$type,
      radius = _ref4.radius,
      tickWidth = _ref4.tickWidth,
      tickHeight = _ref4.tickHeight,
      angleOffset = _ref4.angleOffset,
      center = _ref4.center,
      color = _ref4.color,
      _ref4$activeColor = _ref4.activeColor,
      activeColor = _ref4$activeColor === void 0 ? color : _ref4$activeColor,
      className = _ref4.className,
      _ref4$activeClassName = _ref4.activeClassName,
      activeClassName = _ref4$activeClassName === void 0 ? className : _ref4$activeClassName,
      fn = _ref4.fn,
      percentage = _ref4.percentage;
  var stepSize = angleRange / steps;
  var length = steps + (angleRange === 360 ? 0 : 1);
  var translateX = center - tickWidth / 2;
  var translateY = center - radius;
  var active = Math.round((length - 1) * percentage);
  var renderFn = type === 'circle' ? renderCircle({
    tickWidth: tickWidth,
    translateX: translateX,
    translateY: translateY,
    center: center,
    angleOffset: angleOffset,
    stepSize: stepSize,
    color: color,
    active: active,
    activeColor: activeColor,
    className: className,
    activeClassName: activeClassName
  }) : type === 'rect' && !fn ? renderRect({
    tickWidth: tickWidth,
    tickHeight: tickHeight,
    translateX: translateX,
    translateY: translateY,
    angleOffset: angleOffset,
    stepSize: stepSize,
    center: center,
    color: color,
    active: active,
    activeColor: activeColor,
    className: className,
    activeClassName: activeClassName
  }) : renderCustom({
    fn: fn,
    tickWidth: tickWidth,
    tickHeight: tickHeight,
    translateX: translateX,
    translateY: translateY,
    angleOffset: angleOffset,
    stepSize: stepSize,
    center: center,
    color: color,
    active: active,
    activeColor: activeColor,
    className: className,
    activeClassName: activeClassName
  });
  return React__default.createElement("g", null, Array.from({
    length: length
  }, renderFn));
};

var Value = function Value(_ref) {
  var value = _ref.value,
      size = _ref.size,
      _ref$decimalPlace = _ref.decimalPlace,
      decimalPlace = _ref$decimalPlace === void 0 ? 0 : _ref$decimalPlace,
      className = _ref.className,
      _ref$marginBottom = _ref.marginBottom,
      marginBottom = _ref$marginBottom === void 0 ? 0 : _ref$marginBottom;
  return value == null ? null : React__default.createElement("text", {
    style: {
      userSelect: 'none'
    },
    x: "50%",
    textAnchor: "middle",
    className: className,
    y: size - marginBottom
  }, value.toFixed(decimalPlace));
};

var stepsToSnapTo = function stepsToSnapTo(steps, snap) {
  return steps && snap ? Array.from({
    length: steps + 1
  }, function (_, i) {
    return 1 / steps * i;
  }) : undefined;
};

var isInternalComponent = function isInternalComponent(_ref) {
  var type = _ref.type;
  return type === Arc || type === Pointer || type === Scale || type === Value;
};

var Knob = function Knob(_ref2) {
  var min = _ref2.min,
      max = _ref2.max,
      initialValue = _ref2.value,
      _ref2$angleOffset = _ref2.angleOffset,
      angleOffset = _ref2$angleOffset === void 0 ? 0 : _ref2$angleOffset,
      _ref2$angleRange = _ref2.angleRange,
      angleRange = _ref2$angleRange === void 0 ? 360 : _ref2$angleRange,
      size = _ref2.size,
      onChange = _ref2.onChange,
      children = _ref2.children,
      steps = _ref2.steps,
      _ref2$snap = _ref2.snap,
      snap = _ref2$snap === void 0 ? false : _ref2$snap,
      ariaValueText = _ref2.ariaValueText,
      ariaLabelledBy = _ref2.ariaLabelledBy,
      className = _ref2.className;

  var _useUpdate = useUpdate({
    min: min,
    max: max,
    initialValue: initialValue,
    angleOffset: angleOffset,
    angleRange: angleRange,
    size: size,
    steps: stepsToSnapTo(steps, snap),
    onChange: onChange
  }),
      percentage = _useUpdate.percentage,
      value = _useUpdate.value,
      onStart = _useUpdate.onStart,
      svg = _useUpdate.svg,
      container = _useUpdate.container,
      onKeyDown = _useUpdate.onKeyDown,
      onScroll = _useUpdate.onScroll;

  return React__default.createElement("div", {
    ref: container,
    tabIndex: "0",
    style: {
      outline: 'none',
      width: size,
      height: size
    },
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": value,
    "aria-valuetext": ariaValueText,
    "aria-labelledby": ariaLabelledBy,
    onKeyDown: onKeyDown,
    onWheel: onScroll,
    className: className
  }, React__default.createElement("svg", {
    onMouseDown: onStart,
    width: size,
    height: size,
    ref: svg
  }, React__default.Children.map(children, function (child) {
    return isInternalComponent(child) ? React__default.cloneElement(child, _objectSpread({
      percentage: percentage,
      size: size,
      value: value,
      angleOffset: angleOffset,
      angleRange: angleRange,
      radius: size / 2,
      center: size / 2,
      steps: steps
    }, child.props)) : child;
  })));
};

exports.Knob = Knob;
exports.Arc = Arc;
exports.Scale = Scale;
exports.Pointer = Pointer;
exports.Value = Value;
