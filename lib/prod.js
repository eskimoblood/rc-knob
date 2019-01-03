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
    return Math.max(Math.min(1, angle / angleRange), 0);
  } else {
    return +(angle - angleRange < (360 - angleRange) / 2);
  }
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
  return (value - min) / (max - min) / 100;
};

var clamp = function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
};

var getStartXY = function getStartXY(_ref4) {
  var container = _ref4.container,
      size = _ref4.size;
  return {
    startX: Math.floor(container.current.offsetLeft) + size / 2,
    startY: Math.floor(container.current.offsetTop) + size / 2
  };
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

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return _objectSpread({}, state, {
        isActive: true
      }, getStartXY(state));

    case 'MOVE':
      var percentage = caclulatePercentage(_objectSpread({}, state, action));
      return _objectSpread({}, state, {
        percentage: percentage,
        value: getValueFromPercentage(_objectSpread({}, state, {
          percentage: percentage
        }))
      });

    case 'INCREASE':
      var value = clamp(state.min, state.max, state.value + 1);
      return _objectSpread({}, state, {
        value: value,
        percentage: getPercentageFromValue(_objectSpread({}, state, {
          value: value
        }))
      });

    default:
      return _objectSpread({}, state, {
        isActive: false,
        value: state.value
      });
  }
};

var eventHandling = function eventHandling(_ref5) {
  var dispatch = _ref5.dispatch,
      isActive = _ref5.isActive;
  return function () {
    var onMove = function onMove(_ref6) {
      var pageX = _ref6.pageX,
          pageY = _ref6.pageY;
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
      document.body.addEventListener('mousemove', onMove);
      document.body.addEventListener('mouseup', onStop);
      return function () {
        document.body.removeEventListener('mousemove', onMove);
        document.body.removeEventListener('mouseup', onStop);
      };
    }
  };
};

var useUpdate = (function (_ref7) {
  var min = _ref7.min,
      max = _ref7.max,
      initialValue = _ref7.initialValue,
      _ref7$angleOffset = _ref7.angleOffset,
      angleOffset = _ref7$angleOffset === void 0 ? 0 : _ref7$angleOffset,
      _ref7$angleRange = _ref7.angleRange,
      angleRange = _ref7$angleRange === void 0 ? 360 : _ref7$angleRange,
      size = _ref7.size,
      steps = _ref7.steps,
      snap = _ref7.snap;
  var svg = React.useRef();
  var container = React.useRef();

  var _useReducer = React.useReducer(reducer, {
    isActive: false,
    min: min,
    max: max,
    angleOffset: angleOffset,
    angleRange: angleRange,
    percentage: initialValue ? (max - min) / initialValue : 0,
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

  React.useEffect(eventHandling({
    dispatch: dispatch,
    isActive: isActive
  }), [isActive]);
  return {
    svg: svg,
    container: container,
    percentage: steps ? findClosest(steps, percentage) : percentage,
    value: value,
    angle: angle,
    onStart: function onStart(e) {
      return dispatch(_objectSpread({}, e, {
        type: 'START'
      }));
    },
    dispatch: dispatch
  };
});

var stepsToSnapTo = function stepsToSnapTo(steps, snap) {
  return steps && snap ? Array.from({
    length: steps + 1
  }, function (_, i) {
    return 1 / steps * i;
  }) : undefined;
};

var Knob = function Knob(_ref) {
  var min = _ref.min,
      max = _ref.max,
      initialValue = _ref.value,
      _ref$angleOffset = _ref.angleOffset,
      angleOffset = _ref$angleOffset === void 0 ? 0 : _ref$angleOffset,
      _ref$angleRange = _ref.angleRange,
      angleRange = _ref$angleRange === void 0 ? 360 : _ref$angleRange,
      size = _ref.size,
      onChange = _ref.onChange,
      children = _ref.children,
      steps = _ref.steps,
      _ref$snap = _ref.snap,
      snap = _ref$snap === void 0 ? false : _ref$snap,
      ariaValueText = _ref.ariaValueText,
      ariaLabelledBy = _ref.ariaLabelledBy;

  var _useUpdate = useUpdate({
    min: min,
    max: max,
    initialValue: initialValue,
    angleOffset: angleOffset,
    angleRange: angleRange,
    size: size,
    steps: stepsToSnapTo(steps, snap)
  }),
      percentage = _useUpdate.percentage,
      value = _useUpdate.value,
      onStart = _useUpdate.onStart,
      svg = _useUpdate.svg,
      container = _useUpdate.container,
      dispatch = _useUpdate.dispatch;

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
    onKeyDown: function onKeyDown() {
      return dispatch({
        type: 'INCREASE'
      });
    }
  }, React__default.createElement("svg", {
    onMouseDown: onStart,
    width: size,
    height: size,
    ref: svg
  }, React__default.Children.map(children, function (child) {
    return /Pointer|Scale|Arc|Value/.test(child.type.name) ? React__default.cloneElement(child, _objectSpread({
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
      size = _ref.size,
      arcWidth = _ref.arcWidth,
      outerRadius = _ref.radius,
      center = _ref.center,
      backgroundColor = _ref.backgroundColor;
  var angle = angleRange * percentage;
  var startAngle = angleOffset - 90;
  var endAngle = startAngle + angle;
  var innerRadius = outerRadius - arcWidth;
  var startAngleDegree = degTorad(startAngle);
  var endAngleDegree = degTorad(endAngle);
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

var renderCircle = function renderCircle(_ref) {
  var tickWidth = _ref.tickWidth,
      translateX = _ref.translateX,
      translateY = _ref.translateY;
  return function () {
    return React__default.createElement("circle", {
      r: tickWidth,
      key: i,
      transform: "translate( ".concat(translateX, " ").concat(translateY, ")")
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
      center = _ref2.center;
  return function (_, i) {
    return React__default.createElement("rect", {
      width: tickWidth,
      height: tickHeight,
      key: i,
      transform: "\n        rotate(".concat(angleOffset + stepSize * i, " ").concat(center, " ").concat(center, ") \n        translate( ").concat(translateX, " ").concat(translateY, ")\n        ")
    });
  };
};

var renderCustom = function renderCustom(props) {
  return function (_, i) {
    return fn(_objectSpread({}, props, {
      i: i
    }));
  };
};

var Scale = function Scale(_ref3) {
  var angleRange = _ref3.angleRange,
      steps = _ref3.steps,
      type = _ref3.type,
      radius = _ref3.radius,
      tickWidth = _ref3.tickWidth,
      tickHeight = _ref3.tickHeight,
      angleOffset = _ref3.angleOffset,
      center = _ref3.center,
      fn = _ref3.fn;
  var stepSize = angleRange / steps;
  var length = steps + (angleRange === 360 ? 0 : 1);
  var translateX = center - tickWidth;
  var translateY = center - radius;
  var renderFn = type === 'circle' ? renderCircle({
    tickWidth: tickWidth,
    translateX: translateX,
    translateY: translateY
  }) : type === 'rect' ? renderRect({
    tickWidth: tickWidth,
    tickHeight: tickHeight,
    translateX: translateX,
    translateY: translateY,
    angleOffset: angleOffset,
    stepSize: stepSize,
    center: center
  }) : renderCustom({
    fn: fn,
    tickWidth: tickWidth,
    tickHeight: tickHeight,
    translateX: translateX,
    translateY: translateY,
    angleOffset: angleOffset,
    stepSize: stepSize,
    center: center
  });
  return React__default.createElement("g", null, Array.from({
    length: length
  }, function (_, i) {
    return renderFn;
  }));
};

var Pointer = function Pointer(_ref) {
  var children = _ref.children,
      size = _ref.size,
      width = _ref.width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? width : _ref$height,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      percentage = _ref.percentage,
      radius = _ref.radius,
      center = _ref.center,
      style = _ref.style,
      type = _ref.type,
      fill = _ref.fill;
  return React__default.createElement("g", {
    transform: "\n        rotate(".concat(angleOffset + angleRange * percentage, " ").concat(center, " ").concat(center, ")\n        translate( ").concat(center - width / 2, " ").concat(center - radius - height, ")\n        ")
  }, children && React__default.Children.map(children, function (child) {
    return React__default.cloneElement(child, {
      width: width,
      height: height,
      percentage: percentage,
      fill: fill
    });
  }), type === 'rect' && React__default.createElement("rect", {
    width: width,
    height: height,
    fill: fill
  }), type === 'circle' && React__default.createElement("circle", {
    r: width,
    fill: fill
  }));
};

var Value = function Value(_ref) {
  var value = _ref.value,
      size = _ref.size,
      _ref$decimalPlace = _ref.decimalPlace,
      decimalPlace = _ref$decimalPlace === void 0 ? 0 : _ref$decimalPlace,
      className = _ref.className,
      _ref$marginBottom = _ref.marginBottom,
      marginBottom = _ref$marginBottom === void 0 ? 0 : _ref$marginBottom;
  return React__default.createElement("text", {
    style: {
      userSelect: 'none'
    },
    x: "50%",
    textAnchor: "middle",
    className: className,
    y: size - marginBottom
  }, value.toFixed(decimalPlace));
};

exports.Knob = Knob;
exports.Arc = Arc;
exports.Scale = Scale;
exports.Pointer = Pointer;
exports.Value = Value;
