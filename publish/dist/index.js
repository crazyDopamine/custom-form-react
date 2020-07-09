!(function (e, t) {
  for (var n in t) e[n] = t[n];
})(
  exports,
  (function (e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var i = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function (e) {
        'undefined' !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' === typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var i in e)
            n.d(
              r,
              i,
              function (t) {
                return e[t];
              }.bind(null, i)
            );
        return r;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = '/custom-form-react/'),
      n((n.s = 3))
    );
  })([
    function (e, t) {
      e.exports = require('lodash');
    },
    function (e, t) {
      e.exports = require('moment');
    },
    function (e, t) {
      e.exports = require('react');
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function i(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return r(e);
          })(e) ||
          (function (e) {
            if ('undefined' !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
          })(e) ||
          (function (e, t) {
            if (e) {
              if ('string' === typeof e) return r(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              return (
                'Object' === n && e.constructor && (n = e.constructor.name),
                'Map' === n || 'Set' === n
                  ? Array.from(n)
                  : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? r(e, t)
                  : void 0
              );
            }
          })(e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          })()
        );
      }
      function o(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(n), !0).forEach(function (t) {
                o(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : a(Object(n)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
              });
        }
        return e;
      }
      function c(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }
      function l(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function s(e, t, n) {
        return t && l(e.prototype, t), n && l(e, n), e;
      }
      function f(e, t) {
        return (f =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function d(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 }
        })),
          t && f(e, t);
      }
      function p(e) {
        return (p = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function h() {
        if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      }
      function v(e) {
        return (v =
          'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  'function' === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function b(e, t) {
        return !t || ('object' !== v(t) && 'function' !== typeof t)
          ? (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e)
          : t;
      }
      function y(e) {
        return function () {
          var t,
            n = p(e);
          if (h()) {
            var r = p(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return b(this, t);
        };
      }
      n.r(t),
        n.d(t, 'registorComponent', function () {
          return Z;
        }),
        n.d(t, 'unRegistorComponent', function () {
          return ee;
        }),
        n.d(t, 'BaseForm', function () {
          return te;
        }),
        n.d(t, 'BaseField', function () {
          return _;
        }),
        n.d(t, 'createField', function () {
          return q;
        }),
        n.d(t, 'downloadFile', function () {
          return L;
        }),
        n.d(t, 'uuid', function () {
          return N;
        }),
        n.d(t, 'compareObj', function () {
          return V;
        }),
        n.d(t, 'stopPropagation', function () {
          return D;
        }),
        n.d(t, 'OptionEnum', function () {
          return w;
        }),
        n.d(t, 'isYear', function () {
          return F;
        }),
        n.d(t, 'dateInValue', function () {
          return M;
        }),
        n.d(t, 'dateOutValue', function () {
          return A;
        }),
        n.d(t, 'hourFormat', function () {
          return E;
        }),
        n.d(t, 'plusOrMinus', function () {
          return x;
        }),
        n.d(t, 'formatMoney', function () {
          return Y;
        }),
        n.d(t, 'formatJSON', function () {
          return R;
        }),
        n.d(t, 'formatTreeData', function () {
          return B;
        }),
        n.d(t, 'RuleType', function () {
          return m;
        }),
        n.d(t, 'FormValidateTrigger', function () {
          return g;
        }),
        n.d(t, 'CustomRenderFieldArray', function () {
          return T;
        }),
        n.d(t, 'CustomRenderFieldObject', function () {
          return H;
        });
      var m,
        g,
        O = n(2),
        j = n.n(O),
        k = n(0);
      !(function (e) {
        (e.string = 'string'),
          (e.number = 'number'),
          (e.integer = 'integer'),
          (e.boolean = 'boolean'),
          (e.object = 'object'),
          (e.array = 'array'),
          (e.date = 'date'),
          (e.any = 'any');
      })(m || (m = {})),
        (function (e) {
          (e.onChange = 'onChange'), (e.onBlur = 'onBlur'), (e.onSubmit = 'onSubmit');
        })(g || (g = {}));
      var w = (function () {
          function e(t, n) {
            c(this, e),
              (this.config = void 0),
              (this.request = void 0),
              (this.valueFn = function (e) {
                return e.label;
              }),
              (this.labelFn = function (e) {
                return e.value;
              }),
              (this.lazy = !1),
              (this.transform = void 0),
              (this.status = 0),
              (this.waiting = []),
              (this.request = t),
              (this.labelFn = n.keyFn || this.labelFn),
              (this.valueFn = n.valueFn || this.valueFn),
              (this.lazy = !!n.lazy),
              (this.transform = n.transform),
              (this.config = n);
          }
          return (
            s(e, [
              {
                key: 'get',
                value: function (e) {
                  var t = this,
                    n = this.request,
                    r = this.labelFn,
                    i = this.valueFn;
                  return 1 == this.status
                    ? new Promise(function (e) {
                        t.waiting.push(e);
                      })
                    : new Promise(function (o) {
                        (t.status = 1),
                          n(e)
                            .then(function (e) {
                              var n = e.data;
                              if (((t.status = 2), t.transform)) {
                                var a = t.transform(n);
                                t.waiting.forEach(function (e) {
                                  return e(a);
                                }),
                                  (t.waiting = []),
                                  o(a);
                              } else {
                                var u = n.map(function (e) {
                                  return { data: e, key: i(e), value: i(e), label: r(e) };
                                });
                                t.waiting.forEach(function (e) {
                                  return e(u);
                                }),
                                  (t.waiting = []),
                                  o(u);
                              }
                            })
                            .catch(function () {
                              t.status = 0;
                            });
                      });
                }
              }
            ]),
            e
          );
        })(),
        S = n(1),
        C = n.n(S);
      function F(e, t) {
        if (2 == e.length) {
          var n = C()(e[0], t),
            r = C()(e[1], t);
          return n.year() == r.year() && 0 == n.month() && 11 == r.month();
        }
        return !1;
      }
      function M(e, t) {
        return e && e instanceof Array
          ? e.map(function (e) {
              return M(e, t);
            })
          : e && C()(e, t).isValid()
          ? C()(e, t)
          : void 0;
      }
      var P = new Map([
        ['YYYY', 'year'],
        ['YYYY-MM', 'month'],
        ['YYYY-MM-DD', 'day'],
        ['YYYY-MM-DD HH', 'hour'],
        ['YYYY-MM-DD HH:mm', 'minute'],
        ['YYYY-MM-DD HH:mm:ss', 'second']
      ]);
      function A(e, t, n, r) {
        if (e && e instanceof Array)
          return e.map(function (r, i) {
            return A(r, t, n, i == e.length - 1);
          });
        if (e) {
          var i = C()(e.format(n), n);
          return r && P.get(n) && (i = i.endOf(P.get(n))), i.format(t);
        }
      }
      function E(e) {
        if (!e) return '0\u5c0f\u65f6';
        var t = C.a.duration(e, 'minutes').asHours();
        t = t > 0 ? Math.floor(t) : t < 0 ? Math.ceil(t) : t;
        var n = C.a.duration(e, 'minutes').minutes();
        return (
          (t ? t + '\u5c0f\u65f6' : '') +
          ((n = n > 0 ? Math.floor(n) : n < 0 ? -Math.ceil(n) : n) ? n + '\u5206\u949f' : '')
        );
      }
      function x(e) {
        return e >= 0 ? '+'.concat(e) : e;
      }
      function Y(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ',';
        if (isNaN(e) || 0 === e) return '0.00';
        var n = /-?\d*\.\d{1,2}/,
          r = String(e).match(n),
          i = (e = Number(r ? r[0] : ''.concat(e, '.00'))).toString().split('.');
        return (
          i[1].length < 2 && (i[1] = ''.concat(i[1], '0')),
          ''.concat(i.join('.')).replace(/\B(?=(\d{3})+(?!\d))/g, String(t))
        );
      }
      function R(e, t) {
        var n = null,
          r = '',
          i = 0;
        return (
          ((t = t || {}).newlineAfterColonIfBeforeBraceOrBracket =
            !0 === t.newlineAfterColonIfBeforeBraceOrBracket),
          (t.spaceAfterColon = !1 !== t.spaceAfterColon),
          'string' !== typeof e || (e = JSON.parse(e)),
          (n = /([\{\}])/g),
          (e = (e = JSON.stringify(e)).replace(n, '\r\n$1\r\n')),
          (n = /([\[\]])/g),
          (e = e.replace(n, '\r\n$1\r\n')),
          (n = /(\,)/g),
          (e = e.replace(n, '$1\r\n')),
          (n = /(\r\n\r\n)/g),
          (e = e.replace(n, '\r\n')),
          (n = /\r\n\,/g),
          (e = e.replace(n, ',')),
          t.newlineAfterColonIfBeforeBraceOrBracket ||
            ((n = /\:\r\n\{/g),
            (e = e.replace(n, ':{')),
            (n = /\:\r\n\[/g),
            (e = e.replace(n, ':['))),
          t.spaceAfterColon && ((n = /\:/g), (e = e.replace(n, ':'))),
          e.split('\r\n').forEach(function (e, t) {
            var n = 0,
              o = 0,
              a = '';
            for (
              e.match(/\{$/) || e.match(/\[$/)
                ? (o = 1)
                : e.match(/\}/) || e.match(/\]/)
                ? 0 !== i && (i -= 1)
                : (o = 0),
                n = 0;
              n < i;
              n++
            )
              a += '    ';
            '' != e && (r += a + e + '\r\n'), (i += o);
          }),
          r
        );
      }
      function B(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : function (e) {
                  return e.id;
                },
          n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : function (e) {
                  return e.name;
                },
          r =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : function (e) {
                  return e.children;
                },
          i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 'key',
          a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 'label';
        return (e || []).map(function (e) {
          var c,
            l = r(e);
          return u(
            u({}, e),
            {},
            (o((c = {}), i, t(e)), o(c, a, n(e)), c),
            (!!l && !!l.length && { children: B(r(e), t, n, r, i, a) }) || {}
          );
        });
      }
      function L(e, t) {
        var n = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
          r = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
        if (/(iP)/g.test(navigator.userAgent))
          return (
            alert(
              'Your device does not support files downloading. Please try again in desktop browser.'
            ),
            !1
          );
        if (n || r) {
          var i = document.createElement('a');
          if (
            ((i.target = '_blank'),
            (i.href = e),
            void 0 !== i.download &&
              (i.download = t || e.substring(e.lastIndexOf('/') + 1, e.length)),
            document.createEvent)
          ) {
            var o = document.createEvent('MouseEvents');
            return o.initEvent('click', !0, !0), i.dispatchEvent(o), !0;
          }
        }
        return -1 === e.indexOf('?') && (e += '?download'), window.open(e), !0;
      }
      function N() {
        for (var e = [], t = 0; t < 36; t++)
          e[t] = '0123456789abcdef'.substr(Math.floor(16 * Math.random()), 1);
        return (
          (e[14] = '4'),
          (e[19] = '0123456789abcdef'.substr(8 | e[19], 1)),
          (e[8] = e[13] = e[18] = e[23] = ''),
          e.join('')
        );
      }
      function V(e, t, n) {
        if (e == t) return !0;
        if (
          Object.keys(e).length == Object.keys(t).length &&
          0 == Object(k.difference)(Object.keys(e), Object.keys(t)).length
        ) {
          for (
            var r = function () {
                var r = o[i];
                return (n || []).find(function (e) {
                  return e == r;
                }) || e[r] == t[r]
                  ? 'continue'
                  : (Object(k.isArray)(e[r]) &&
                      Object(k.isArray)(t[r]) &&
                      Object(k.difference)(e[r], t[r]).length > 0) ||
                    (Object(k.isObject)(e[r]) && Object(k.isObject)(t[r]) && e[r] != t[r])
                  ? { v: !1 }
                  : (Object(k.isArray)(e[r]) && Object(k.isArray)(t[r])) ||
                    (Object(k.isObject)(e[r]) && Object(k.isObject)(t[r])) ||
                    e[r] == t[r]
                  ? void 0
                  : { v: !1 };
              },
              i = 0,
              o = Object.keys(e);
            i < o.length;
            i++
          ) {
            var a = r();
            switch (a) {
              case 'continue':
                continue;
              default:
                if ('object' === typeof a) return a.v;
            }
          }
          return !0;
        }
        return !1;
      }
      function D(e) {
        e &&
          (e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0),
          e.nativeEvent && e.nativeEvent.stopImmediatePropagation());
      }
      var _ = (function (e) {
        d(n, e);
        var t = y(n);
        function n(e) {
          var r;
          return c(this, n), ((r = t.call(this, e)).state = { value: e.value }), r;
        }
        return (
          s(n, [
            {
              key: 'componentWillReceiveProps',
              value: function (e, t) {
                e.value != this.props.value && this.setState({ value: e.value });
              }
            },
            {
              key: 'shouldComponentUpdate',
              value: function (e, t, n) {
                return !V(e, this.props, ['onChange', 'onBlur']) || !V(t, this.state);
              }
            },
            {
              key: 'getComponentProps',
              value: function () {
                return Object(k.omit)(this.props.fieldSet, [
                  'key',
                  'label',
                  'type',
                  'editable',
                  'asyncValidator',
                  'validator',
                  'required',
                  'rules',
                  'fields',
                  'onChange',
                  'customFieldSet'
                ]);
              }
            },
            {
              key: 'inValue',
              value: function (e) {
                return e;
              }
            },
            {
              key: 'outValue',
              value: function (e) {
                return e;
              }
            },
            {
              key: 'onChange',
              value: function (e) {
                for (
                  var t = this.props.onChange,
                    n = arguments.length,
                    r = new Array(n > 1 ? n - 1 : 0),
                    i = 1;
                  i < n;
                  i++
                )
                  r[i - 1] = arguments[i];
                t && t.apply(void 0, [e].concat(r));
              }
            },
            {
              key: 'onBlur',
              value: function (e) {
                for (
                  var t = this.props.onBlur,
                    n = arguments.length,
                    r = new Array(n > 1 ? n - 1 : 0),
                    i = 1;
                  i < n;
                  i++
                )
                  r[i - 1] = arguments[i];
                t && t.apply(void 0, [e].concat(r));
              }
            },
            {
              key: 'render',
              value: function () {
                return null;
              }
            }
          ]),
          n
        );
      })(j.a.Component);
      function q(e, t) {
        return (function (n) {
          d(i, n);
          var r = y(i);
          function i() {
            return c(this, i), r.apply(this, arguments);
          }
          return (
            s(i, [
              {
                key: 'onChange',
                value: function (e) {
                  var n = this.props.onChange,
                    r = e;
                  t.outValue && (r = t.outValue.call(this, r)),
                    t.getValueFromEvent && (r = t.getValueFromEvent(e)),
                    n && n(r);
                }
              },
              {
                key: 'render',
                value: function () {
                  var n = this.props.editable,
                    r = t.unEditableRender,
                    i = this.props.value;
                  t.inValue && (i = t.inValue.call(this, i));
                  var a = { value: i };
                  return (
                    t.propsMap && (a = u(u({}, a), t.propsMap(this.props))),
                    n
                      ? j.a.createElement(
                          e,
                          u(
                            u(u({}, a), (t.valuePropName && o({}, t.valuePropName, a.value)) || {}),
                            {},
                            { onChange: this.onChange.bind(this) }
                          )
                        )
                      : r
                      ? r.call(this, i)
                      : j.a.createElement('span', {}, Object(k.toString)(i))
                  );
                }
              }
            ]),
            i
          );
        })(_);
      }
      var I,
        T = (function (e) {
          d(n, e);
          var t = y(n);
          function n(e) {
            var r;
            return c(this, n), ((r = t.call(this, e)).state = {}), r;
          }
          return (
            s(n, [
              {
                key: 'add',
                value: function (e) {
                  var t = this.props,
                    n = t.value,
                    r = t.onChange;
                  r && r([].concat(i(n || []), [e || {}]));
                }
              },
              {
                key: 'remove',
                value: function (e) {
                  var t = this.props,
                    n = t.value,
                    r = t.onChange;
                  r &&
                    r(
                      (n || []).filter(function (t, n) {
                        return n != e;
                      })
                    );
                }
              },
              {
                key: 'createField',
                value: function (e, t) {
                  var n = this.props.fieldSet;
                  return u(
                    u({}, e),
                    {},
                    { key: ''.concat(n.key, '[').concat(t, '].').concat(e.key) }
                  );
                }
              }
            ]),
            n
          );
        })(_),
        H = (function (e) {
          d(n, e);
          var t = y(n);
          function n(e) {
            var r;
            return c(this, n), ((r = t.call(this, e)).state = {}), r;
          }
          return (
            s(n, [
              {
                key: 'createField',
                value: function (e) {
                  var t = this.props.fieldSet;
                  return u(u({}, e), {}, { key: ''.concat(t.key, '.').concat(e.key) });
                }
              }
            ]),
            n
          );
        })(_);
      function $(e, t) {
        return (
          !(!Object(k.isNumber)(e) || !Object(k.isNumber)(t.max)) &&
          Object(k.toNumber)(e) <= Object(k.toNumber)(t.max)
        );
      }
      function z(e, t) {
        return (
          !(!Object(k.isNumber)(e) || !Object(k.isNumber)(t.min)) &&
          Object(k.toNumber)(e) >= Object(k.toNumber)(t.min)
        );
      }
      function U(e, t) {
        return (
          !(!Object(k.isArray)(e) && !Object(k.isString)(e)) &&
          e.length <= (t.maxLength || Number.MAX_SAFE_INTEGER)
        );
      }
      function J(e, t) {
        return !(!Object(k.isArray)(e) && !Object(k.isString)(e)) && e.length >= (t.minLength || 0);
      }
      var K =
          (o((I = {}), m.string, function (e) {
            return Object(k.isString)(e);
          }),
          o(I, m.number, function (e) {
            return Object(k.isNumber)(e);
          }),
          o(I, m.integer, function (e) {
            return Object(k.isInteger)(e);
          }),
          o(I, m.boolean, function (e) {
            return Object(k.isBoolean)(e);
          }),
          o(I, m.object, function (e) {
            return Object(k.isObject)(e);
          }),
          o(I, m.array, function (e) {
            return Object(k.isArray)(e);
          }),
          o(I, m.date, function (e) {
            return C()(e).isValid();
          }),
          I),
        G = new Map([
          [m.string, { maxLength: U, minLength: J }],
          [m.number, { max: $, min: z }],
          [m.integer, { max: $, min: z }],
          [m.array, { maxLength: U, minLength: J }]
        ]),
        W = u(
          u({}, K),
          {},
          {
            required: function (e) {
              return Object(k.isArray)(e)
                ? !Object(k.isEmpty)(e)
                : !Object(k.isNull)(e) && !Object(k.isUndefined)(e) && '' !== e;
            },
            max: $,
            min: z,
            maxLength: U,
            minLength: J
          }
        );
      function X(e, t) {
        return new Promise(function (n) {
          var r = {},
            o = [],
            a = Object(k.values)(t),
            c = [];
          a.forEach(function (t) {
            var n = Object(k.get)(e, t.key, void 0),
              i = {
                key: t.key,
                valid: !0,
                type: !1,
                required: !1,
                maxLength: !1,
                minLength: !1,
                max: !1,
                min: !1,
                validator: !1,
                message: ''
              };
            if (t.required && !W.required(n))
              (i.required = !0),
                (i.valid = !1),
                (i.message = t.label + '\u4e0d\u80fd\u4e3a\u7a7a'),
                (r[i.key] = i),
                o.push(i);
            else if (t.type && t.type != m.any && !W[t.type](n))
              (i.type = !0),
                (i.valid = !1),
                (i.message = t.label + '\u7c7b\u578b\u9519\u8bef'),
                (r[i.key] = i),
                o.push(i);
            else if (G.get(t.type)) {
              var a = G.get(t.type);
              Object(k.keys)(a).forEach(function (e) {
                a &&
                  a[e] &&
                  !a[e](n, t) &&
                  ((i[e] = !0), (i.valid = !1), (i.message = t.label + '\u9519\u8bef'));
              }),
                (r[i.key] = i),
                o.push(i);
            } else t.validator && c.push(t.validator(n, { rule: t, values: e }));
          }),
            c.length
              ? Promise.all(c).then(function (a) {
                  var c = a.filter(function (e) {
                    return !e.valid;
                  });
                  (o = [].concat(i(o), i(c))),
                    (r = u(
                      u({}, r),
                      Object(k.zipObject)(
                        c.map(function (e) {
                          return e.key;
                        }),
                        c
                      )
                    )),
                    n({
                      value: e,
                      valid:
                        o.filter(function (e) {
                          return !e.valid;
                        }).length <= 0,
                      errors: r,
                      errorList: o,
                      rules: t
                    });
                })
              : n({
                  value: e,
                  valid:
                    o.filter(function (e) {
                      return !e.valid;
                    }).length <= 0,
                  errors: r,
                  errorList: o,
                  rules: t
                });
        });
      }
      var Q = new ((function () {
        function e() {
          c(this, e), (this.map = new Map());
        }
        return (
          s(e, [
            {
              key: 'get',
              value: function (e) {
                return this.map.get(Object(k.toLower)(e));
              }
            },
            {
              key: 'has',
              value: function (e) {
                return this.map.has(Object(k.toLower)(e));
              }
            },
            {
              key: 'register',
              value: function (e, t) {
                this.map.set(Object(k.toLower)(e), t);
              }
            },
            {
              key: 'unRegister',
              value: function (e) {
                this.map.delete(Object(k.toLower)(e));
              }
            },
            {
              key: 'clear',
              value: function () {
                this.map.clear();
              }
            }
          ]),
          e
        );
      })())();
      function Z(e, t) {
        Q.has(e) &&
          console.warn(
            'component named '.concat(
              e,
              ' has been registered, the registered component will be replaced!'
            )
          ),
          Q.register(e, t);
      }
      function ee(e) {
        Q.unRegister(e);
      }
      var te = (function (e) {
        d(n, e);
        var t = y(n);
        function n(e) {
          var r;
          return (
            c(this, n),
            ((r = t.call(this, e)).rules = {}),
            (r.options = new Map()),
            (r.fieldComponentMap = Q),
            (r.validateShowMessageFn = void 0),
            (r.defaultField = 'input'),
            (r.formContainerRender = void 0),
            (r.formFieldContainerRender = void 0),
            (r.state = {
              value: e.value || Object(k.cloneDeep)(e.initialValue) || {},
              fields: e.fields || [],
              fieldsMap: ne(e.fields || []),
              errors: {}
            }),
            r
          );
        }
        return (
          s(
            n,
            [
              {
                key: 'reset',
                value: function (e) {
                  var t = this.props.initialValue;
                  if (e) {
                    var n = this.state.value;
                    e.forEach(function (e) {
                      return (n[e] = void 0);
                    }),
                      Object(k.defaultsDeep)(n, Object(k.pick)(t, e)),
                      this.setState({ value: n, errors: {} });
                  } else this.setState({ value: Object(k.cloneDeep)(t), errors: {} });
                }
              },
              {
                key: 'resetValidate',
                value: function () {
                  this.setState({ errors: {} });
                }
              },
              {
                key: 'setValue',
                value: function (e) {
                  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                  if (!t)
                    return (
                      (e = Object(k.defaultsDeep)(e, this.state.value)),
                      void this.setState({ value: e })
                    );
                  this.setState({ value: e, errors: {} });
                }
              },
              {
                key: 'getValue',
                value: function () {
                  return this.state.value;
                }
              },
              {
                key: 'setOption',
                value: function (e, t) {
                  this.options.set(e, t), this.forceUpdate();
                }
              },
              {
                key: 'registerRule',
                value: function (e) {
                  var t = e.fieldSet;
                  if (!t.key) return null;
                  this.rules = u(
                    u({}, this.rules),
                    {},
                    o(
                      {},
                      t.key || '',
                      u(
                        u(
                          u(
                            {
                              type: m.any,
                              fieldProps: e,
                              label: t.validateLabel || t.label || t.placeholder
                            },
                            Object(k.pick)(t, [
                              'key',
                              'required',
                              'maxLength',
                              'minLength',
                              'max',
                              'min',
                              'validator'
                            ])
                          ),
                          e.fieldSet.rules || {}
                        ),
                        (e.fieldSet.validator && { validator: e.fieldSet.validator }) || {}
                      )
                    )
                  );
                }
              },
              {
                key: 'validate',
                value: function (e) {
                  var t = this,
                    n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                  return new Promise(function (r, i) {
                    var o = t.state.value,
                      a = t.rules;
                    X(o, (e && Object(k.pick)(a, e)) || a).then(function (o) {
                      var a = o.errors,
                        c = o.errorList;
                      if (o.valid)
                        t.setState({
                          errors: n
                            ? a
                            : u(
                                u(
                                  {},
                                  (e && Object(k.omit)(t.state.errors, e)) || t.state.errors || {}
                                ),
                                a
                              )
                        }),
                          r(o);
                      else {
                        var l = c[0].message;
                        t.validateShowMessageFn && t.validateShowMessageFn.call(t, l, o),
                          t.setState(
                            {
                              errors: n
                                ? a
                                : u(
                                    u(
                                      {},
                                      (e && Object(k.omit)(t.state.errors, e)) ||
                                        t.state.errors ||
                                        {}
                                    ),
                                    a
                                  )
                            },
                            function () {
                              i(o);
                            }
                          );
                      }
                    });
                  });
                }
              },
              {
                key: 'onFieldChange',
                value: function (e, t, n) {
                  var r = e.fieldSet,
                    i = this.props,
                    o = i.onChange,
                    a = i.validateTrigger,
                    u = this.state.value;
                  if ((Object(k.set)(u, t, n), this.setState({ value: u }), r.onChange)) {
                    for (
                      var c = arguments.length, l = new Array(c > 3 ? c - 3 : 0), s = 3;
                      s < c;
                      s++
                    )
                      l[s - 3] = arguments[s];
                    r.onChange.apply(r, [n, { form: this, field: e }].concat(l));
                  }
                  o && o(u, { changeKey: t, changeValue: n, form: this, field: r }),
                    a == g.onChange && r.key && this.validate([r.key], !0, !1).then();
                }
              },
              {
                key: 'renderField',
                value: function (e, t, n, r) {
                  var o = this.props.editable,
                    a = this.state,
                    c = a.value,
                    l = a.errors,
                    s = e,
                    f = s.key,
                    d = void 0 === f ? '' : f,
                    p = s.customFieldSet,
                    h = s.optionKey;
                  n = [d].concat(i(n || []));
                  var v = [].concat(
                    i(
                      n.map(function (e) {
                        return Object(k.get)(c, e, void 0);
                      })
                    ),
                    [c]
                  );
                  p && (e = u(u({}, e), p(v, e)));
                  var b = e,
                    y = b.type,
                    m = void 0 === y ? '' : y,
                    g = b.render,
                    O =
                      this.fieldComponentMap && this.fieldComponentMap.has(m)
                        ? this.fieldComponentMap.get(m)
                        : this.fieldComponentMap.get(this.defaultField),
                    w = Object(k.get)(c, d, void 0),
                    S = this.options.get(d) || e.options;
                  h && this.options.get(h) && (S = this.options.get(h));
                  var C = [e.editable, o].find(function (e) {
                      return null !== e && void 0 !== e;
                    }),
                    F = {
                      key: d,
                      domKey: t || d,
                      keyNest: n,
                      valueNest: v,
                      fieldSet: e,
                      form: this,
                      value: w,
                      error: l[e.key || ''],
                      editable: void 0 === C || null === C || C,
                      options: S
                    };
                  if (
                    ((F.onChange = this.onFieldChange.bind(this, F, d)),
                    (F.onBlur = this.onFieldChange.bind(this, F, d)),
                    O &&
                      (O.prototype instanceof T || O.prototype instanceof H) &&
                      (F = u(u({}, F), {}, { renderField: this.renderField.bind(this) })),
                    (e.hidden && Object(k.isFunction)(e.hidden) && e.hidden(F)) ||
                      (e.hidden && !Object(k.isFunction)(e.hidden)))
                  )
                    return null;
                  this.registerRule(F);
                  var M = null;
                  g
                    ? (M = g.call(this, F, { renderField: this.renderField.bind(this) }))
                    : O && (M = j.a.createElement(O, F));
                  var P = r && r.componentOnly,
                    A = (!!r && r.formFieldContainerRender) || this.formFieldContainerRender;
                  return (!P && !!A && A(M, F, t || d)) || M;
                }
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.state,
                    n = t.fields,
                    r = t.value,
                    o = this.renderField,
                    a = this.props.beforeRender;
                  this.rules = {};
                  var u = i(n).filter(function (e) {
                    return Object(k.isFunction)(e.hidden) || !e.hidden;
                  });
                  return (
                    a && (u = i(a(n, r))),
                    this.formContainerRender
                      ? this.formContainerRender(
                          u
                            .map(function (t, n) {
                              return o.call(e, t, Object(k.toString)(n));
                            })
                            .filter(Boolean),
                          this.props
                        )
                      : u
                          .map(function (t, n) {
                            return o.call(e, t, Object(k.toString)(n));
                          })
                          .filter(Boolean)
                  );
                }
              }
            ],
            [
              {
                key: 'getDerivedStateFromProps',
                value: function (e, t) {
                  var n = u({}, t);
                  return (
                    e.value && e.value !== t.value && (n.value = e.value),
                    e.fields !== t.fields &&
                      ((n.fields = e.fields), (n.fieldsMap = ne(e.fields || []))),
                    n
                  );
                }
              }
            ]
          ),
          n
        );
      })(j.a.Component);
      function ne() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          t = new Map();
        return (
          e
            .filter(function (e) {
              return e.key;
            })
            .forEach(function (e) {
              t.set(e.key, e);
            }),
          t
        );
      }
      (te.defaultProps = {
        validateTrigger: g.onChange,
        validateFirst: !1,
        initialValue: {},
        fields: [],
        rules: {}
      }),
        (te.prototype.fieldComponentMap = Q);
    }
  ])
);
