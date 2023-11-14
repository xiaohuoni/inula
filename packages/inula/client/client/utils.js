function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
export function assert(value, message) {
  if (!value) throw new Error(message);
}
export function compose(_ref) {
  var fns = _ref.fns,
    args = _ref.args;
  if (fns.length === 1) {
    return fns[0];
  }
  var last = fns.pop();
  return fns.reduce(function (a, b) {
    return function () {
      return b(a, args);
    };
  }, last);
}
export function isPromiseLike(obj) {
  return !!obj && _typeof(obj) === 'object' && typeof obj.then === 'function';
}