'use strict';
var aa = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);

function da(a, b) {
    if (b) a: {
        var c = ca;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && b != null && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}

function ea(a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a.throw(d)
    }
    return new Promise(function(d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
}

function r(a) {
    return ea(a())
}
da("Symbol.dispose", function(a) {
    return a ? a : Symbol("Symbol.dispose")
});

function fa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
}
da("Array.prototype.values", function(a) {
    return a ? a : function() {
        return fa(this, function(b, c) {
            return c
        })
    }
});
da("Object.values", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
        return c
    }
});
da("Array.prototype.includes", function(a) {
    return a ? a : function(b, c) {
        var d = this;
        d instanceof String && (d = String(d));
        var e = d.length;
        c = c || 0;
        for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0
        }
        return !1
    }
});
da("Object.entries", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});
da("String.prototype.matchAll", function(a) {
    return a ? a : function(b) {
        if (b instanceof RegExp && !b.global) throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
        var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
            d = this,
            e = !1,
            f = {
                next: function() {
                    if (e) return {
                        value: void 0,
                        done: !0
                    };
                    var g = c.exec(d);
                    if (!g) return e = !0, {
                        value: void 0,
                        done: !0
                    };
                    g[0] === "" && (c.lastIndex += 1);
                    return {
                        value: g,
                        done: !1
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
});
da("Promise.prototype.finally", function(a) {
    return a ? a : function(b) {
        return this.then(function(c) {
            return Promise.resolve(b()).then(function() {
                return c
            })
        }, function(c) {
            return Promise.resolve(b()).then(function() {
                throw c;
            })
        })
    }
});
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var t = this || self;

function ha(a, b) {
    var c = u("CLOSURE_FLAGS");
    a = c && c[a];
    return a != null ? a : b
}

function u(a, b) {
    a = a.split(".");
    b = b || t;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], b == null) return null;
    return b
}

function ia(a) {
    var b = typeof a;
    b = b != "object" ? b : a ? Array.isArray(a) ? "array" : b : "null";
    return b == "array" || b == "object" && typeof a.length == "number"
}

function ja(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function ka(a, b, c) {
    if (!a) throw Error();
    if (arguments.length > 2) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function la(a, b, c) {
    la = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? ja : ka;
    return la.apply(null, arguments)
}

function w(a, b) {
    a = a.split(".");
    var c = t;
    a[0] in c || typeof c.execScript == "undefined" || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || b === void 0 ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
}

function ma(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Ja = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.pb = function(d, e, f) {
        for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
        return b.prototype[e].apply(d, g)
    }
}

function na(a) {
    return a
};

function oa(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, oa);
    else {
        const c = Error().stack;
        c && (this.stack = c)
    }
    a && (this.message = String(a));
    b !== void 0 && (this.cause = b)
}
ma(oa, Error);
oa.prototype.name = "CustomError";
var pa = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};
var qa;

function ra(a, b) {
    this.h = a === sa && b || ""
}
ra.prototype.toString = function() {
    return this.h
};

function ta(a) {
    return new ra(sa, a)
}
var sa = {};
ta("");
var ua = class {
        constructor(a) {
            this.h = a
        }
        toString() {
            return this.h + ""
        }
    },
    va = {};

function wa(a, b) {
    Array.prototype.forEach.call(a, b, void 0)
}

function xa(a, b) {
    return Array.prototype.map.call(a, b, void 0)
}

function ya(a, b) {
    b = Array.prototype.indexOf.call(a, b, void 0);
    b >= 0 && Array.prototype.splice.call(a, b, 1)
}

function za(a, b) {
    for (let c = 1; c < arguments.length; c++) {
        const d = arguments[c];
        if (ia(d)) {
            const e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (let g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};

function Aa(a) {
    for (const b in a) return !1;
    return !0
}

function Ba(a) {
    if (!a || typeof a !== "object") return a;
    if (typeof a.clone === "function") return a.clone();
    if (typeof Map !== "undefined" && a instanceof Map) return new Map(a);
    if (typeof Set !== "undefined" && a instanceof Set) return new Set(a);
    if (a instanceof Date) return new Date(a.getTime());
    const b = Array.isArray(a) ? [] : typeof ArrayBuffer !== "function" || typeof ArrayBuffer.isView !== "function" || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length);
    for (const c in a) b[c] = Ba(a[c]);
    return b
}
const Ca = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function Da(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < Ca.length; f++) c = Ca[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function Ea(a, b = `unexpected value ${a}!`) {
    throw Error(b);
};

function Fa(a, b) {
    a.__closure__error__context__984382 || (a.__closure__error__context__984382 = {});
    a.__closure__error__context__984382.severity = b
};

function Ga(a) {
    var b = u("window.location.href");
    a == null && (a = 'Unknown Error of type "null/undefined"');
    if (typeof a === "string") return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (g) {
        d = "Not available", c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || t.$googDebugFname || b
    } catch (g) {
        e = "Not available", c = !0
    }
    b = Ia(a);
    if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
        c = a.message;
        if (c ==
            null) {
            if (a.constructor && a.constructor instanceof Function) {
                if (a.constructor.name) c = a.constructor.name;
                else if (c = a.constructor, Ja[c]) c = Ja[c];
                else {
                    c = String(c);
                    if (!Ja[c]) {
                        var f = /function\s+([^\(]+)/m.exec(c);
                        Ja[c] = f ? f[1] : "[Anonymous]"
                    }
                    c = Ja[c]
                }
                c = 'Unknown Error of type "' + c + '"'
            } else c = "Unknown Error of unknown type";
            typeof a.toString === "function" && Object.prototype.toString !== a.toString && (c += ": " + a.toString())
        }
        return {
            message: c,
            name: a.name || "UnknownError",
            lineNumber: d,
            fileName: e,
            stack: b || "Not available"
        }
    }
    return {
        message: a.message,
        name: a.name,
        lineNumber: a.lineNumber,
        fileName: a.fileName,
        stack: b
    }
}

function Ia(a, b) {
    b || (b = {});
    b[Ka(a)] = !0;
    var c = a.stack || "";
    (a = a.cause) && !b[Ka(a)] && (c += "\nCaused by: ", a.stack && a.stack.indexOf(a.toString()) == 0 || (c += typeof a === "string" ? a : a.message + "\n"), c += Ia(a, b));
    return c
}

function Ka(a) {
    var b = "";
    typeof a.toString === "function" && (b = "" + a);
    return b + a.stack
}
var Ja = {};
var La = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Ma(a) {
    return a ? decodeURI(a) : a
}

function Na(a, b, c) {
    if (Array.isArray(b))
        for (var d = 0; d < b.length; d++) Na(a, String(b[d]), c);
    else b != null && c.push(a + (b === "" ? "" : "=" + encodeURIComponent(String(b))))
}

function Oa(a) {
    var b = [],
        c;
    for (c in a) Na(c, a[c], b);
    return b.join("&")
};

function Pa() {
    this.l = this.l;
    this.i = this.i
}
Pa.prototype.l = !1;
Pa.prototype.dispose = function() {
    this.l || (this.l = !0, this.m())
};
Pa.prototype[Symbol.dispose] = function() {
    this.dispose()
};
Pa.prototype.addOnDisposeCallback = function(a, b) {
    this.l ? b !== void 0 ? a.call(b) : a() : (this.i || (this.i = []), b && (a = a.bind(b)), this.i.push(a))
};
Pa.prototype.m = function() {
    if (this.i)
        for (; this.i.length;) this.i.shift()()
};
var Qa = ha(610401301, !1),
    Ra = ha(188588736, !0),
    Sa = ha(645172343, ha(1, !0));

function Ta() {
    var a = t.navigator;
    return a && (a = a.userAgent) ? a : ""
}
var Ua;
const Va = t.navigator;
Ua = Va ? Va.userAgentData || null : null;

function Wa(a) {
    return Qa ? Ua ? Ua.brands.some(({
        brand: b
    }) => b && b.indexOf(a) != -1) : !1 : !1
}

function x(a) {
    return Ta().indexOf(a) != -1
};

function Xa() {
    return Qa ? !!Ua && Ua.brands.length > 0 : !1
}

function Ya() {
    return Xa() ? Wa("Chromium") : (x("Chrome") || x("CriOS")) && !(Xa() ? 0 : x("Edge")) || x("Silk")
};
var Za = Xa() ? !1 : x("Trident") || x("MSIE");

function $a(a, b) {
    a.l(b);
    a.i < 100 && (a.i++, b.next = a.h, a.h = b)
}
class ab {
    constructor(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null
    }
    get() {
        let a;
        this.i > 0 ? (this.i--, a = this.h, this.h = a.next, a.next = null) : a = this.j();
        return a
    }
};

function bb() {};

function cb(a) {
    t.setTimeout(() => {
        throw a;
    }, 0)
};
class db {
    constructor() {
        this.i = this.h = null
    }
    add(a, b) {
        const c = eb.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c
    }
    remove() {
        let a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a
    }
}
var eb = new ab(() => new fb, a => a.reset());
class fb {
    constructor() {
        this.next = this.scope = this.h = null
    }
    set(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null
    }
    reset() {
        this.next = this.scope = this.h = null
    }
};
let gb, hb = !1,
    ib = new db,
    kb = (a, b) => {
        gb || jb();
        hb || (gb(), hb = !0);
        ib.add(a, b)
    },
    jb = () => {
        const a = t.Promise.resolve(void 0);
        gb = () => {
            a.then(lb)
        }
    };
var lb = () => {
    let a;
    for (; a = ib.remove();) {
        try {
            a.h.call(a.scope)
        } catch (b) {
            cb(b)
        }
        $a(eb, a)
    }
    hb = !1
};

function y(a) {
    this.h = 0;
    this.v = void 0;
    this.l = this.i = this.j = null;
    this.m = this.s = !1;
    if (a != bb) try {
        var b = this;
        a.call(void 0, function(c) {
            mb(b, 2, c)
        }, function(c) {
            mb(b, 3, c)
        })
    } catch (c) {
        mb(this, 3, c)
    }
}

function nb() {
    this.next = this.context = this.i = this.j = this.h = null;
    this.l = !1
}
nb.prototype.reset = function() {
    this.context = this.i = this.j = this.h = null;
    this.l = !1
};
var ob = new ab(function() {
    return new nb
}, function(a) {
    a.reset()
});

function pb(a, b, c) {
    var d = ob.get();
    d.j = a;
    d.i = b;
    d.context = c;
    return d
}

function qb(a) {
    if (a instanceof y) return a;
    var b = new y(bb);
    mb(b, 2, a);
    return b
}
y.prototype.then = function(a, b, c) {
    return rb(this, typeof a === "function" ? a : null, typeof b === "function" ? b : null, c)
};
y.prototype.$goog_Thenable = !0;
y.prototype.C = function(a, b) {
    return rb(this, null, a, b)
};
y.prototype.catch = y.prototype.C;
y.prototype.cancel = function(a) {
    if (this.h == 0) {
        var b = new sb(a);
        kb(function() {
            tb(this, b)
        }, this)
    }
};

function tb(a, b) {
    if (a.h == 0)
        if (a.j) {
            var c = a.j;
            if (c.i) {
                for (var d = 0, e = null, f = null, g = c.i; g && (g.l || (d++, g.h == a && (e = g), !(e && d > 1))); g = g.next) e || (f = g);
                e && (c.h == 0 && d == 1 ? tb(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : ub(c), vb(c, e, 3, b)))
            }
            a.j = null
        } else mb(a, 3, b)
}

function wb(a, b) {
    a.i || a.h != 2 && a.h != 3 || xb(a);
    a.l ? a.l.next = b : a.i = b;
    a.l = b
}

function rb(a, b, c, d) {
    var e = pb(null, null, null);
    e.h = new y(function(f, g) {
        e.j = b ? function(k) {
            try {
                var h = b.call(d, k);
                f(h)
            } catch (l) {
                g(l)
            }
        } : f;
        e.i = c ? function(k) {
            try {
                var h = c.call(d, k);
                h === void 0 && k instanceof sb ? g(k) : f(h)
            } catch (l) {
                g(l)
            }
        } : g
    });
    e.h.j = a;
    wb(a, e);
    return e.h
}
y.prototype.H = function(a) {
    this.h = 0;
    mb(this, 2, a)
};
y.prototype.J = function(a) {
    this.h = 0;
    mb(this, 3, a)
};

function mb(a, b, c) {
    if (a.h == 0) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.h = 1;
        a: {
            var d = c,
                e = a.H,
                f = a.J;
            if (d instanceof y) {
                wb(d, pb(e || bb, f || null, a));
                var g = !0
            } else {
                if (d) try {
                    var k = !!d.$goog_Thenable
                } catch (l) {
                    k = !1
                } else k = !1;
                if (k) d.then(e, f, a), g = !0;
                else {
                    k = typeof d;
                    if (k == "object" && d != null || k == "function") try {
                        var h = d.then;
                        if (typeof h === "function") {
                            yb(d, h, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (l) {
                        f.call(a, l);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
        }
        g || (a.v = c, a.h = b, a.j = null, xb(a), b != 3 || c instanceof sb || zb(a, c))
    }
}

function yb(a, b, c, d, e) {
    function f(h) {
        k || (k = !0, d.call(e, h))
    }

    function g(h) {
        k || (k = !0, c.call(e, h))
    }
    var k = !1;
    try {
        b.call(a, g, f)
    } catch (h) {
        f(h)
    }
}

function xb(a) {
    a.s || (a.s = !0, kb(a.A, a))
}

function ub(a) {
    var b = null;
    a.i && (b = a.i, a.i = b.next, b.next = null);
    a.i || (a.l = null);
    return b
}
y.prototype.A = function() {
    for (var a; a = ub(this);) vb(this, a, this.h, this.v);
    this.s = !1
};

function vb(a, b, c, d) {
    if (c == 3 && b.i && !b.l)
        for (; a && a.m; a = a.j) a.m = !1;
    if (b.h) b.h.j = null, Ab(b, c, d);
    else try {
        b.l ? b.j.call(b.context) : Ab(b, c, d)
    } catch (e) {
        Bb.call(null, e)
    }
    $a(ob, b)
}

function Ab(a, b, c) {
    b == 2 ? a.j.call(a.context, c) : a.i && a.i.call(a.context, c)
}

function zb(a, b) {
    a.m = !0;
    kb(function() {
        a.m && Bb.call(null, b)
    })
}
var Bb = cb;

function sb(a) {
    oa.call(this, a)
}
ma(sb, oa);
sb.prototype.name = "cancel";

function Cb() {
    throw Error("Invalid UTF8");
}

function Db(a, b) {
    b = String.fromCharCode.apply(null, b);
    return a == null ? b : a + b
}
let Eb = void 0,
    Fb;
const Gb = typeof TextDecoder !== "undefined";
!x("Android") || Ya();
Ya();
var Hb = x("Safari") && !(Ya() || (Xa() ? 0 : x("Coast")) || (Xa() ? 0 : x("Opera")) || (Xa() ? 0 : x("Edge")) || (Xa() ? Wa("Microsoft Edge") : x("Edg/")) || (Xa() ? Wa("Opera") : x("OPR")) || x("Firefox") || x("FxiOS") || x("Silk") || x("Android")) && !(x("iPhone") && !x("iPod") && !x("iPad") || x("iPad") || x("iPod"));
var Ib = {},
    Jb = null;

function Kb(a, b) {
    b === void 0 && (b = 0);
    Lb();
    b = Ib[b];
    const c = Array(Math.floor(a.length / 3)),
        d = b[64] || "";
    let e = 0,
        f = 0;
    for (; e < a.length - 2; e += 3) {
        var g = a[e],
            k = a[e + 1],
            h = a[e + 2],
            l = b[g >> 2];
        g = b[(g & 3) << 4 | k >> 4];
        k = b[(k & 15) << 2 | h >> 6];
        h = b[h & 63];
        c[f++] = "" + l + g + k + h
    }
    l = 0;
    h = d;
    switch (a.length - e) {
        case 2:
            l = a[e + 1], h = b[(l & 15) << 2] || d;
        case 1:
            a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | l >> 4] + h + d
    }
    return c.join("")
}

function Mb(a) {
    var b = a.length,
        c = b * 3 / 4;
    c % 3 ? c = Math.floor(c) : "=.".indexOf(a[b - 1]) != -1 && (c = "=.".indexOf(a[b - 2]) != -1 ? c - 2 : c - 1);
    var d = new Uint8Array(c),
        e = 0;
    Nb(a, function(f) {
        d[e++] = f
    });
    return e !== c ? d.subarray(0, e) : d
}

function Nb(a, b) {
    function c(h) {
        for (; d < a.length;) {
            var l = a.charAt(d++),
                n = Jb[l];
            if (n != null) return n;
            if (!/^[\s\xa0]*$/.test(l)) throw Error("Unknown base64 encoding at char: " + l);
        }
        return h
    }
    Lb();
    for (var d = 0;;) {
        var e = c(-1),
            f = c(0),
            g = c(64),
            k = c(64);
        if (k === 64 && e === -1) break;
        b(e << 2 | f >> 4);
        g != 64 && (b(f << 4 & 240 | g >> 2), k != 64 && b(g << 6 & 192 | k))
    }
}

function Lb() {
    if (!Jb) {
        Jb = {};
        for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; c < 5; c++) {
            var d = a.concat(b[c].split(""));
            Ib[c] = d;
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                Jb[f] === void 0 && (Jb[f] = e)
            }
        }
    }
};
var Ob = typeof Uint8Array !== "undefined",
    Pb = !Za && typeof btoa === "function";

function Qb(a) {
    if (!Pb) return Kb(a);
    let b = "",
        c = 0;
    const d = a.length - 10240;
    for (; c < d;) b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
    b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
    return btoa(b)
}
const Rb = /[-_.]/g,
    Sb = {
        "-": "+",
        _: "/",
        ".": "="
    };

function Tb(a) {
    return Sb[a] || ""
}

function Ub(a) {
    if (!Pb) return Mb(a);
    Rb.test(a) && (a = a.replace(Rb, Tb));
    a = atob(a);
    const b = new Uint8Array(a.length);
    for (let c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
    return b
}

function Vb(a) {
    return Ob && a != null && a instanceof Uint8Array
}
var Wb = {};
let Xb;

function Yb(a) {
    if (a !== Wb) throw Error("illegal external caller");
}

function Zb() {
    return Xb || (Xb = new $b(null, Wb))
}

function ac(a) {
    Yb(Wb);
    var b = a.h;
    b = b == null || Vb(b) ? b : typeof b === "string" ? Ub(b) : null;
    return b == null ? b : a.h = b
}
var $b = class {
    constructor(a, b) {
        Yb(b);
        this.h = a;
        if (a != null && a.length === 0) throw Error("ByteString should be constructed with non-empty values");
    }
    sizeBytes() {
        const a = ac(this);
        return a ? a.length : 0
    }
};
let bc;

function cc() {
    const a = Error();
    Fa(a, "incident");
    cb(a)
}

function dc(a) {
    a = Error(a);
    Fa(a, "warning");
    return a
};

function ec() {
    return typeof BigInt === "function"
};

function fc(a) {
    return Array.prototype.slice.call(a)
};
var gc = typeof Symbol === "function" && typeof Symbol() === "symbol";

function hc(a) {
    return typeof Symbol === "function" && typeof Symbol() === "symbol" ? Symbol() : a
}
var ic = hc(),
    jc = hc("2ex"),
    kc = hc("1oa");
[...Object.values({
    ab: 1,
    Ya: 2,
    Xa: 4,
    gb: 8,
    fb: 16,
    eb: 32,
    Pa: 64,
    lb: 128,
    Wa: 256,
    Va: 512,
    Za: 1024,
    Ta: 2048,
    kb: 4096,
    Ua: 8192
})];
var lc = gc ? (a, b) => {
        a[ic] |= b
    } : (a, b) => {
        a.h !== void 0 ? a.h |= b : Object.defineProperties(a, {
            h: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    },
    mc = gc ? (a, b) => {
        a[ic] &= ~b
    } : (a, b) => {
        a.h !== void 0 && (a.h &= ~b)
    },
    B = gc ? a => a[ic] | 0 : a => a.h | 0,
    D = gc ? a => a[ic] : a => a.h,
    E = gc ? (a, b) => {
        a[ic] = b
    } : (a, b) => {
        a.h !== void 0 ? a.h = b : Object.defineProperties(a, {
            h: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    };

function nc(a, b) {
    E(b, (a | 0) & -14591)
}

function oc(a, b) {
    E(b, (a | 34) & -14557)
};
var pc = {},
    qc = {};

function rc(a) {
    return !(!a || typeof a !== "object" || a.h !== qc)
}

function sc(a) {
    return a !== null && typeof a === "object" && !Array.isArray(a) && a.constructor === Object
}

function tc(a, b, c) {
    if (!Array.isArray(a) || a.length) return !1;
    const d = B(a);
    if (d & 1) return !0;
    if (!(b && (Array.isArray(b) ? b.includes(c) : b.has(c)))) return !1;
    E(a, d | 1);
    return !0
}
var uc;
const vc = [];
E(vc, 55);
uc = Object.freeze(vc);

function wc(a) {
    if (a & 2) throw Error();
}
let xc;

function yc(a, b) {
    (b = xc ? b[xc] : void 0) && (a[xc] = fc(b))
}
let zc;
var Ac = Object.freeze({});
const Bc = typeof Uint8Array.prototype.slice === "function";
let F = 0,
    G = 0;

function Cc(a) {
    const b = a >>> 0;
    F = b;
    G = (a - b) / 4294967296 >>> 0
}

function Dc(a) {
    if (a < 0) {
        Cc(0 - a);
        const [b, c] = Ec(F, G);
        F = b >>> 0;
        G = c >>> 0
    } else Cc(a)
}

function Fc(a, b) {
    b >>>= 0;
    a >>>= 0;
    if (b <= 2097151) var c = "" + (4294967296 * b + a);
    else ec() ? c = "" + (BigInt(b) << BigInt(32) | BigInt(a)) : (c = (a >>> 24 | b << 8) & 16777215, b = b >> 16 & 65535, a = (a & 16777215) + c * 6777216 + b * 6710656, c += b * 8147497, b *= 2, a >= 1E7 && (c += a / 1E7 >>> 0, a %= 1E7), c >= 1E7 && (b += c / 1E7 >>> 0, c %= 1E7), c = b + Gc(c) + Gc(a));
    return c
}

function Gc(a) {
    a = String(a);
    return "0000000".slice(a.length) + a
}

function Hc() {
    var a = F,
        b = G;
    if (b & 2147483648)
        if (ec()) a = "" + (BigInt(b | 0) << BigInt(32) | BigInt(a >>> 0));
        else {
            const [c, d] = Ec(a, b);
            a = "-" + Fc(c, d)
        }
    else a = Fc(a, b);
    return a
}

function Ec(a, b) {
    b = ~b;
    a ? a = ~a + 1 : b += 1;
    return [a, b]
};

function Ic(a) {
    return a.displayName || a.name || "unknown type name"
}
const Jc = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;

function Kc(a) {
    const b = typeof a;
    return b === "number" ? Number.isFinite(a) : b !== "string" ? !1 : Jc.test(a)
}

function Lc(a) {
    if (a == null) return a;
    if (typeof a === "string") {
        if (!a) return;
        a = +a
    }
    if (typeof a === "number") return Number.isFinite(a) ? a | 0 : void 0
}

function Mc(a) {
    return a[0] === "-" ? a.length < 20 ? !0 : a.length === 20 && Number(a.substring(0, 7)) > -922337 : a.length < 19 ? !0 : a.length === 19 && Number(a.substring(0, 6)) < 922337
}

function Nc(a) {
    if (a != null && typeof a !== "string") throw Error();
    return a
}

function Oc(a, b) {
    if (!(a instanceof b)) throw Error(`Expected instanceof ${Ic(b)} but got ${a&&Ic(a.constructor)}`);
    return a
}

function Pc(a, b, c) {
    if (a != null && typeof a === "object" && a.T === pc) return a;
    if (Array.isArray(a)) {
        var d = B(a),
            e = d;
        e === 0 && (e |= c & 32);
        e |= c & 2;
        e !== d && E(a, e);
        return new b(a)
    }
};

function Qc(a) {
    var b = Rc(a);
    if (b) return b;
    (b = Math.random() > .01) || (Sc === void 0 && (Sc = typeof Proxy !== "function" ? !1 : !0), b = !Sc || !Proxy);
    if (b) return a;
    b = new Proxy(a, {
        set(c, d, e) {
            Tc();
            c[d] = e;
            return !0
        }
    });
    Uc(a, b);
    return b
}

function Tc() {
    cc()
}
let Vc = void 0,
    Wc = void 0;

function Rc(a) {
    let b;
    return (b = Vc) == null ? void 0 : b.get(a)
}

function Uc(a, b) {
    (Vc || (Vc = new WeakMap)).set(a, b);
    (Wc || (Wc = new WeakMap)).set(b, a)
}
let Sc = void 0;
let Xc, Yc, Zc;

function $c(a) {
    switch (typeof a) {
        case "boolean":
            return Yc || (Yc = [0, void 0, !0]);
        case "number":
            return a > 0 ? void 0 : a === 0 ? Zc || (Zc = [0, void 0]) : [-a, void 0];
        case "string":
            return [0, a];
        case "object":
            return a
    }
}

function ad(a, b, c) {
    a == null && (a = Xc);
    Xc = void 0;
    if (a == null) {
        var d = 96;
        c ? (a = [c], d |= 512) : a = [];
        b && (d = d & -16760833 | (b & 1023) << 14)
    } else {
        if (!Array.isArray(a)) throw Error("narr");
        d = B(a);
        if (d & 2048) throw Error("farr");
        if (d & 64) return a;
        d |= 64;
        if (c && (d |= 512, c !== a[0])) throw Error("mid");
        a: {
            c = a;
            const e = c.length;
            if (e) {
                const f = e - 1;
                if (sc(c[f])) {
                    d |= 256;
                    b = f - (+!!(d & 512) - 1);
                    if (b >= 1024) throw Error("pvtlmt");
                    d = d & -16760833 | (b & 1023) << 14;
                    break a
                }
            }
            if (b) {
                b = Math.max(b, e - (+!!(d & 512) - 1));
                if (b > 1024) throw Error("spvt");
                d = d & -16760833 | (b &
                    1023) << 14
            }
        }
    }
    E(a, d);
    return a
};

function bd(a, b) {
    return cd(b)
}

function cd(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "boolean":
            return a ? 1 : 0;
        case "object":
            if (a)
                if (Array.isArray(a)) {
                    if (tc(a, void 0, 0)) return
                } else {
                    if (Vb(a)) return Qb(a);
                    if (a instanceof $b) {
                        const b = a.h;
                        return b == null ? "" : typeof b === "string" ? b : a.h = Qb(b)
                    }
                }
    }
    return a
};

function dd(a, b, c) {
    const d = fc(a);
    var e = d.length;
    const f = b & 256 ? d[e - 1] : void 0;
    e += f ? -1 : 0;
    for (b = b & 512 ? 1 : 0; b < e; b++) d[b] = c(d[b]);
    if (f) {
        b = d[b] = {};
        for (const g in f) b[g] = c(f[g])
    }
    yc(d, a);
    return d
}

function ed(a, b, c, d, e) {
    if (a != null) {
        if (Array.isArray(a)) a = tc(a, void 0, 0) ? void 0 : e && B(a) & 2 ? a : fd(a, b, c, d !== void 0, e);
        else if (sc(a)) {
            const f = {};
            for (let g in a) f[g] = ed(a[g], b, c, d, e);
            a = f
        } else a = b(a, d);
        return a
    }
}

function fd(a, b, c, d, e) {
    const f = d || c ? B(a) : 0;
    d = d ? !!(f & 32) : void 0;
    const g = fc(a);
    for (let k = 0; k < g.length; k++) g[k] = ed(g[k], b, c, d, e);
    c && (yc(g, a), c(f, g));
    return g
}

function gd(a) {
    return a.T === pc ? a.toJSON() : cd(a)
};

function hd(a, b, c = oc) {
    if (a != null) {
        if (Ob && a instanceof Uint8Array) return b ? a : new Uint8Array(a);
        if (Array.isArray(a)) {
            var d = B(a);
            if (d & 2) return a;
            b && (b = d === 0 || !!(d & 32) && !(d & 64 || !(d & 16)));
            return b ? (E(a, (d | 34) & -12293), a) : fd(a, hd, d & 4 ? oc : c, !0, !0)
        }
        a.T === pc && (c = a.o, d = D(c), a = d & 2 ? a : id(a, c, d, !0));
        return a
    }
}

function id(a, b, c, d) {
    a = a.constructor;
    Xc = b = jd(b, c, d);
    b = new a(b);
    Xc = void 0;
    return b
}

function jd(a, b, c) {
    const d = c || b & 2 ? oc : nc,
        e = !!(b & 32);
    a = dd(a, b, f => hd(f, e, d));
    lc(a, 32 | (c ? 2 : 0));
    return a
}

function kd(a) {
    const b = a.o,
        c = D(b);
    return c & 2 ? id(a, b, c, !1) : a
};

function ld(a, b) {
    a = a.o;
    return md(a, D(a), b)
}

function nd(a, b, c, d) {
    b = d + (+!!(b & 512) - 1);
    if (!(b < 0 || b >= a.length || b >= c)) return a[b]
}

function md(a, b, c, d) {
    if (c === -1) return null;
    const e = b >> 14 & 1023 || 536870912;
    if (c >= e) {
        if (b & 256) return a[a.length - 1][c]
    } else {
        var f = a.length;
        if (d && b & 256 && (d = a[f - 1][c], d != null)) {
            if (nd(a, b, e, c) && jc != null) {
                var g;
                a = (g = bc) != null ? g : bc = {};
                g = a[jc] || 0;
                g >= 4 || (a[jc] = g + 1, cc())
            }
            return d
        }
        return nd(a, b, e, c)
    }
}

function od(a, b, c) {
    const d = a.o;
    let e = D(d);
    wc(e);
    H(d, e, b, c);
    return a
}

function H(a, b, c, d, e) {
    const f = b >> 14 & 1023 || 536870912;
    if (c >= f || e && !Sa) {
        let g = b;
        if (b & 256) e = a[a.length - 1];
        else {
            if (d == null) return g;
            e = a[f + (+!!(b & 512) - 1)] = {};
            g |= 256
        }
        e[c] = d;
        c < f && (a[c + (+!!(b & 512) - 1)] = void 0);
        g !== b && E(a, g);
        return g
    }
    a[c + (+!!(b & 512) - 1)] = d;
    b & 256 && (a = a[a.length - 1], c in a && delete a[c]);
    return b
}

function pd(a) {
    return !!(2 & a) && !!(4 & a) || !!(2048 & a)
}

function qd(a, b, c, d) {
    const e = a.o;
    var f = D(e);
    wc(f);
    if (d == null) {
        var g = rd(e);
        if (sd(g, e, f, c) === b) g.set(c, 0);
        else return a
    } else {
        c.includes(b);
        g = rd(e);
        const k = sd(g, e, f, c);
        k !== b && (k && (f = H(e, f, k)), g.set(c, b))
    }
    H(e, f, b, d);
    return a
}

function rd(a) {
    if (gc) {
        var b;
        return (b = a[kc]) != null ? b : a[kc] = new Map
    }
    if (kc in a) return a[kc];
    b = new Map;
    Object.defineProperty(a, kc, {
        value: b
    });
    return b
}

function sd(a, b, c, d) {
    let e = a.get(d);
    if (e != null) return e;
    e = 0;
    for (let f = 0; f < d.length; f++) {
        const g = d[f];
        md(b, c, g) != null && (e !== 0 && (c = H(b, c, e)), e = g)
    }
    a.set(d, e);
    return e
}

function td(a, b, c, d) {
    let e = D(a);
    const f = md(a, e, c, d);
    let g;
    if (f != null && f.T === pc) return b = kd(f), b !== f && H(a, e, c, b, d), b.o;
    if (Array.isArray(f)) {
        const k = B(f);
        k & 2 ? g = jd(f, k, !1) : g = f;
        g = ad(g, b[0], b[1])
    } else g = ad(void 0, b[0], b[1]);
    g !== f && H(a, e, c, g, d);
    return g
}

function ud(a, b, c) {
    var d = a.o,
        e = D(d),
        f = md(d, e, c, !1);
    b = Pc(f, b, e);
    b !== f && b != null && H(d, e, c, b, !1);
    d = b;
    if (d == null) return d;
    a = a.o;
    e = D(a);
    e & 2 || (f = kd(d), f !== d && (d = f, H(a, e, c, d, !1)));
    return d
}

function vd(a, b, c, d, e, f, g) {
    var k = !!(2 & b);
    e = k ? 1 : e;
    f = !!f;
    g && (g = !k);
    k = md(a, b, d);
    k = Array.isArray(k) ? k : uc;
    var h = B(k),
        l = !!(4 & h);
    if (!l) {
        var n = h;
        n === 0 && (n = wd(n, b));
        h = k;
        n |= 1;
        var p = b;
        const m = !!(2 & n);
        m && (p |= 2);
        let v = !m,
            z = !0,
            C = 0,
            A = 0;
        for (; C < h.length; C++) {
            const M = Pc(h[C], c, p);
            if (M instanceof c) {
                if (!m) {
                    const Ha = !!(B(M.o) & 2);
                    v && (v = !Ha);
                    z && (z = Ha)
                }
                h[A++] = M
            }
        }
        A < C && (h.length = A);
        n |= 4;
        n = z ? n | 16 : n & -17;
        n = v ? n | 8 : n & -9;
        E(h, n);
        m && Object.freeze(h);
        h = n
    }
    if (g && !(8 & h || !k.length && (e === 1 || e === 4 && 32 & h))) {
        pd(h) && (k = fc(k), h = wd(h, b), b = H(a,
            b, d, k));
        c = k;
        g = h;
        for (h = 0; h < c.length; h++) n = c[h], p = kd(n), n !== p && (c[h] = p);
        g |= 8;
        g = c.length ? g & -17 : g | 16;
        E(c, g);
        h = g
    }
    let q;
    e === 1 || e === 4 && 32 & h ? pd(h) || (b = h, f = !!(32 & h), h |= !k.length || 16 & h && (!l || f) ? 2 : 2048, h !== b && E(k, h), Object.freeze(k)) : (l = e !== 5 ? !1 : !!(32 & h) || pd(h) || !!Rc(k), (e === 2 || l) && pd(h) && (k = fc(k), h = wd(h, b), h = xd(h, b, f), E(k, h), b = H(a, b, d, k)), pd(h) || (a = h, h = xd(h, b, f), h !== a && E(k, h)), l && (q = Qc(k)));
    return q || k
}

function I(a, b, c, d) {
    d != null ? Oc(d, b) : d = void 0;
    return od(a, c, d)
}

function wd(a, b) {
    a = (2 & b ? a | 2 : a & -3) | 32;
    return a &= -2049
}

function xd(a, b, c) {
    32 & b && c || (a &= -33);
    return a
}

function yd(a, b, c, d) {
    a = a.o;
    const e = D(a);
    wc(e);
    b = vd(a, e, c, b, 2, !0);
    c = d != null ? Oc(d, c) : new c;
    b.push(c);
    B(c.o) & 2 ? mc(b, 8) : mc(b, 16)
}

function zd(a, b) {
    a = ld(a, b);
    return a == null || typeof a === "string" ? a : void 0
}

function Ad(a, b) {
    a = zd(a, b);
    return a != null ? a : ""
}

function Bd(a, b) {
    var c = Cd;
    const d = a.o;
    c = sd(rd(d), d, D(d), c);
    return zd(a, c === b ? b : -1)
}

function Dd(a, b, c) {
    if (c != null) {
        if (typeof c !== "number") throw dc("int32");
        if (!Number.isFinite(c)) throw dc("int32");
        c |= 0
    }
    od(a, b, c)
}

function Ed(a, b) {
    if (b != null) {
        var c = !!c;
        if (!Kc(b)) throw dc("int64");
        if (typeof b === "string")
            if (Kc(b), c = Math.trunc(Number(b)), Number.isSafeInteger(c)) b = String(c);
            else {
                if (c = b.indexOf("."), c !== -1 && (b = b.substring(0, c)), !Mc(b)) {
                    if (b.length < 16) Dc(Number(b));
                    else if (ec()) b = BigInt(b), F = Number(b & BigInt(4294967295)) >>> 0, G = Number(b >> BigInt(32) & BigInt(4294967295));
                    else {
                        c = +(b[0] === "-");
                        G = F = 0;
                        var d = b.length;
                        for (let e = 0 + c, f = (d - c) % 6 + c; f <= d; e = f, f += 6) {
                            const g = Number(b.slice(e, f));
                            G *= 1E6;
                            F = F * 1E6 + g;
                            F >= 4294967296 && (G +=
                                Math.trunc(F / 4294967296), G >>>= 0, F >>>= 0)
                        }
                        if (c) {
                            const [e, f] = Ec(F, G);
                            F = e;
                            G = f
                        }
                    }
                    b = Hc()
                }
            }
        else if (c) Kc(b), b = Math.trunc(b), Number.isSafeInteger(b) ? b = String(b) : (c = String(b), Mc(c) ? b = c : (Dc(b), b = Hc()));
        else if (Kc(b), b = Math.trunc(b), !Number.isSafeInteger(b)) {
            Dc(b);
            c = F;
            d = G;
            if (b = d & 2147483648) c = ~c + 1 >>> 0, d = ~d >>> 0, c == 0 && (d = d + 1 >>> 0);
            c = d * 4294967296 + (c >>> 0);
            b = b ? -c : c
        }
    }
    od(a, 2, b)
}

function J(a, b, c) {
    return od(a, b, Nc(c))
}

function Fd(a, b, c) {
    if (c != null) {
        if (!Number.isFinite(c)) throw dc("enum");
        c |= 0
    }
    return od(a, b, c)
};

function Gd(a, b) {
    return Error(`Invalid wire type: ${a} (at position ${b})`)
}

function Hd() {
    return Error("Failed to read varint, encoding is invalid.")
}

function Id(a, b) {
    return Error(`Tried to read past the end of the data ${b} > ${a}`)
};

function Jd(a) {
    if (typeof a === "string") return {
        buffer: Ub(a),
        I: !1
    };
    if (Array.isArray(a)) return {
        buffer: new Uint8Array(a),
        I: !1
    };
    if (a.constructor === Uint8Array) return {
        buffer: a,
        I: !1
    };
    if (a.constructor === ArrayBuffer) return {
        buffer: new Uint8Array(a),
        I: !1
    };
    if (a.constructor === $b) return {
        buffer: ac(a) || new Uint8Array(0),
        I: !0
    };
    if (a instanceof Uint8Array) return {
        buffer: new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
        I: !1
    };
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
};

function Kd(a) {
    const b = a.j;
    let c = a.h,
        d = b[c++],
        e = d & 127;
    if (d & 128 && (d = b[c++], e |= (d & 127) << 7, d & 128 && (d = b[c++], e |= (d & 127) << 14, d & 128 && (d = b[c++], e |= (d & 127) << 21, d & 128 && (d = b[c++], e |= d << 28, d & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128))))) throw Hd();
    Ld(a, c);
    return e
}

function Ld(a, b) {
    a.h = b;
    if (b > a.i) throw Id(a.i, b);
}

function Md(a, b) {
    if (b < 0) throw Error(`Tried to read a negative byte length: ${b}`);
    const c = a.h,
        d = c + b;
    if (d > a.i) throw Id(b, a.i - c);
    a.h = d;
    return c
}
var Nd = class {
        constructor(a, b) {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.init(a, void 0, void 0, b)
        }
        init(a, b, c, {
            X: d = !1
        } = {}) {
            this.X = d;
            a && (a = Jd(a), this.j = a.buffer, this.m = a.I, this.l = b || 0, this.i = c !== void 0 ? this.l + c : this.j.length, this.h = this.l)
        }
        clear() {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.X = !1
        }
        reset() {
            this.h = this.l
        }
    },
    Od = [];

function Pd(a, {
    ga: b = !1
} = {}) {
    a.ga = b
}

function Qd(a) {
    var b = a.h;
    if (b.h == b.i) return !1;
    a.j = a.h.h;
    var c = Kd(a.h) >>> 0;
    b = c >>> 3;
    c &= 7;
    if (!(c >= 0 && c <= 5)) throw Gd(c, a.j);
    if (b < 1) throw Error(`Invalid field number: ${b} (at position ${a.j})`);
    a.l = b;
    a.i = c;
    return !0
}

function Rd(a) {
    switch (a.i) {
        case 0:
            if (a.i != 0) Rd(a);
            else a: {
                a = a.h;
                var b = a.h;
                const c = b + 10,
                    d = a.j;
                for (; b < c;)
                    if ((d[b++] & 128) === 0) {
                        Ld(a, b);
                        break a
                    }
                throw Hd();
            }
            break;
        case 1:
            a = a.h;
            Ld(a, a.h + 8);
            break;
        case 2:
            a.i != 2 ? Rd(a) : (b = Kd(a.h) >>> 0, a = a.h, Ld(a, a.h + b));
            break;
        case 5:
            a = a.h;
            Ld(a, a.h + 4);
            break;
        case 3:
            b = a.l;
            do {
                if (!Qd(a)) throw Error("Unmatched start-group tag: stream EOF");
                if (a.i == 4) {
                    if (a.l != b) throw Error("Unmatched end-group tag");
                    break
                }
                Rd(a)
            } while (1);
            break;
        default:
            throw Gd(a.i, a.j);
    }
}

function Sd(a, b, c) {
    const d = a.h.i,
        e = Kd(a.h) >>> 0,
        f = a.h.h + e;
    let g = f - d;
    g <= 0 && (a.h.i = f, c(b, a, void 0, void 0, void 0), g = f - a.h.h);
    if (g) throw Error("Message parsing ended unexpectedly. Expected to read " + `${e} bytes, instead read ${e-g} bytes, either the ` + "data ended unexpectedly or the message misreported its own length");
    a.h.h = f;
    a.h.i = d
}
var Td = class {
        constructor(a, b) {
            if (Od.length) {
                const c = Od.pop();
                c.init(a, void 0, void 0, b);
                a = c
            } else a = new Nd(a, b);
            this.h = a;
            this.j = this.h.h;
            this.i = this.l = -1;
            Pd(this, b)
        }
        reset() {
            this.h.reset();
            this.j = this.h.h;
            this.i = this.l = -1
        }
    },
    Ud = [];
let Vd;
var K = class {
    constructor(a, b, c) {
        this.o = ad(a, b, c)
    }
    toJSON() {
        return Wd(this)
    }
    clone() {
        const a = this.o;
        return id(this, a, D(a), !1)
    }
    I() {
        return !!(B(this.o) & 2)
    }
};
K.prototype.T = pc;

function Wd(a) {
    var b = Vd ? a.o : fd(a.o, gd, void 0, void 0, !1);
    var c = !Vd;
    var d = Ra ? void 0 : a.constructor.Eb;
    var e = D(c ? a.o : b);
    if (a = b.length) {
        var f = b[a - 1],
            g = sc(f);
        g ? a-- : f = void 0;
        e = +!!(e & 512) - 1;
        var k = b;
        if (g) {
            b: {
                var h = f;
                var l = {};g = !1;
                if (h)
                    for (var n in h) {
                        if (isNaN(+n)) {
                            l[n] = h[n];
                            continue
                        }
                        let m = h[n];
                        Array.isArray(m) && (tc(m, d, +n) || rc(m) && m.size === 0) && (m = null);
                        m == null && (g = !0);
                        m != null && (l[n] = m)
                    }
                if (g) {
                    for (var p in l) break b;
                    l = null
                } else l = h
            }
            h = l == null ? f != null : l !== f
        }
        for (var q; a > 0; a--) {
            p = a - 1;
            n = k[p];
            p -= e;
            if (!(n == null || tc(n,
                    d, p) || rc(n) && n.size === 0)) break;
            q = !0
        }
        if (k !== b || h || q) {
            if (!c) k = Array.prototype.slice.call(k, 0, a);
            else if (q || h || l) k.length = a;
            l && k.push(l)
        }
        b = k
    }
    return b
};
class Xd {
    constructor(a, b, c) {
        this.i = a;
        this.h = b;
        this.na = c
    }
};
const Yd = Symbol();

function Zd(a) {
    let b = a[Yd];
    if (!b) {
        const c = $d(a),
            d = ae(a),
            e = d.j;
        b = e ? (f, g) => e(f, g, d) : (f, g) => {
            for (; Qd(g) && g.i != 4;) {
                var k = g.l,
                    h = d[k];
                if (!h) {
                    var l = d.extensions;
                    l && (l = l[k]) && (h = d[k] = be(l))
                }
                if (!h || !h(g, f, k)) {
                    h = g;
                    k = h.j;
                    Rd(h);
                    if (h.ga) h = void 0;
                    else {
                        l = h.h.h - k;
                        h.h.h = k;
                        b: {
                            h = h.h;k = l;
                            if (k == 0) {
                                h = Zb();
                                break b
                            }
                            const n = Md(h, k);h.X && h.m ? k = h.j.subarray(n, n + k) : (h = h.j, l = n, k = n + k, k = l === k ? new Uint8Array(0) : Bc ? h.slice(l, k) : new Uint8Array(h.subarray(l, k)));h = k.length == 0 ? Zb() : new $b(k, Wb)
                        }
                    }
                    k = f;
                    h && (xc || (xc = Symbol()), (l = k[xc]) ? l.push(h) : k[xc] = [h])
                }
            }
            c === ce || c === de || c.l || (f[zc || (zc = Symbol())] = c)
        };
        a[Yd] = b
    }
    return b
}

function be(a) {
    a = Array.isArray(a) ? a[0] instanceof Xd ? a : [ee, a] : [a, void 0];
    const b = a[0].i;
    if (a = a[1]) {
        const c = Zd(a),
            d = ae(a).S;
        return (e, f, g) => b(e, f, g, d, c)
    }
    return b
}
class fe {}
let ce, de;
const ge = Symbol();

function he(a, b, c) {
    const d = c[1];
    let e;
    if (d) {
        const f = d[ge];
        e = f ? f.S : $c(d[0]);
        a[b] = f != null ? f : d
    }
    e && e === Yc ? (a.h || (a.h = new Set)).add(b) : c[0] && (a.i || (a.i = new Set)).add(b)
}

function ie(a, b) {
    return [a.h, !b || b[0] > 0 ? void 0 : b]
}

function $d(a) {
    var b = a[ge];
    if (b) return b;
    b = je(a, a[ge] = new fe, ie, ie, he);
    if (!b.extensions && !b.i && !b.h) {
        let c = !0;
        for (let d in b) isNaN(d) || (c = !1);
        c ? ($c(a[0]) === Yc ? de ? b = de : (b = new fe, b.S = $c(!0), b = de = b) : b = ce || (ce = new fe), b = a[ge] = b) : b.l = !0
    }
    return b
}

function ke(a, b, c) {
    a[b] = c
}

function je(a, b, c, d, e = ke) {
    b.S = $c(a[0]);
    let f = 0;
    var g = a[++f];
    g && g.constructor === Object && (b.extensions = g, g = a[++f], typeof g === "function" && (b.j = g, b.m = a[++f], g = a[++f]));
    const k = {};
    for (; Array.isArray(g) && typeof g[0] === "number" && g[0] > 0;) {
        for (var h = 0; h < g.length; h++) k[g[h]] = g;
        g = a[++f]
    }
    for (h = 1; g !== void 0;) {
        typeof g === "number" && (h += g, g = a[++f]);
        let p;
        var l = void 0;
        g instanceof Xd ? p = g : (p = le, f--);
        if (p.na) {
            g = a[++f];
            l = a;
            var n = f;
            typeof g == "function" && (g = g(), l[n] = g);
            l = g
        }
        g = a[++f];
        n = h + 1;
        typeof g === "number" && g < 0 && (n -=
            g, g = a[++f]);
        for (; h < n; h++) {
            const q = k[h];
            e(b, h, l ? d(p, l, q) : c(p, q))
        }
    }
    return b
}
const me = Symbol(),
    ne = Symbol();

function oe(a, b) {
    const c = a.i;
    return b ? (d, e, f) => c(d, e, f, b) : c
}

function pe(a, b, c) {
    const d = a.i;
    let e, f;
    return (g, k, h) => d(g, k, h, f || (f = ae(b).S), e || (e = Zd(b)), c)
}

function ae(a) {
    let b = a[ne];
    if (b) return b;
    $d(a);
    b = je(a, a[ne] = {}, oe, pe);
    ne in a && ge in a && me in a && (a.length = 0);
    return b
}
var qe;
qe = new Xd(function(a, b, c) {
    if (a.i !== 2) return !1;
    var d = Kd(a.h) >>> 0;
    a = a.h;
    var e = Md(a, d);
    a = a.j;
    if (Gb) {
        var f = a,
            g;
        (g = Fb) || (g = Fb = new TextDecoder("utf-8", {
            fatal: !0
        }));
        d = e + d;
        f = e === 0 && d === f.length ? f : f.subarray(e, d);
        try {
            var k = g.decode(f)
        } catch (l) {
            if (Eb === void 0) {
                try {
                    g.decode(new Uint8Array([128]))
                } catch (n) {}
                try {
                    g.decode(new Uint8Array([97])), Eb = !0
                } catch (n) {
                    Eb = !1
                }
            }!Eb && (Fb = void 0);
            throw l;
        }
    } else {
        k = e;
        d = k + d;
        e = [];
        let l = null;
        let n;
        for (; k < d;) {
            var h = a[k++];
            h < 128 ? e.push(h) : h < 224 ? k >= d ? Cb() : (n = a[k++], h < 194 || (n & 192) !==
                128 ? (k--, Cb()) : e.push((h & 31) << 6 | n & 63)) : h < 240 ? k >= d - 1 ? Cb() : (n = a[k++], (n & 192) !== 128 || h === 224 && n < 160 || h === 237 && n >= 160 || ((g = a[k++]) & 192) !== 128 ? (k--, Cb()) : e.push((h & 15) << 12 | (n & 63) << 6 | g & 63)) : h <= 244 ? k >= d - 2 ? Cb() : (n = a[k++], (n & 192) !== 128 || (h << 28) + (n - 144) >> 30 !== 0 || ((g = a[k++]) & 192) !== 128 || ((f = a[k++]) & 192) !== 128 ? (k--, Cb()) : (h = (h & 7) << 18 | (n & 63) << 12 | (g & 63) << 6 | f & 63, h -= 65536, e.push((h >> 10 & 1023) + 55296, (h & 1023) + 56320))) : Cb();
            e.length >= 8192 && (l = Db(l, e), e.length = 0)
        }
        k = Db(l, e)
    }
    H(b, D(b), c, k);
    return !0
}, !1, !1);
var ee = new Xd(function(a, b, c, d, e) {
        if (a.i !== 2) return !1;
        Sd(a, td(b, d, c, !0), e);
        return !0
    }, !1, !0),
    le = new Xd(function(a, b, c, d, e) {
        if (a.i !== 2) return !1;
        Sd(a, td(b, d, c), e);
        return !0
    }, !1, !0),
    re;
re = new Xd(function(a, b, c, d, e) {
    if (a.i !== 2) return !1;
    d = ad(void 0, d[0], d[1]);
    var f = D(b);
    wc(f);
    var g = f;
    const k = g & 2;
    f = md(b, g, c);
    Array.isArray(f) || (f = uc);
    var h = B(f);
    h === 0 && g & 32 && !k ? (h |= 33, E(f, h)) : h & 1 || (h |= 1, E(f, h));
    k && (g = !1, h & 2 || (lc(f, 34), g = !!(4 & h)), g && Object.freeze(f));
    h = f;
    f = D(b);
    B(h) & 4 && (h = fc(h), E(h, (B(h) | 1) & -2079), H(b, f, c, h));
    h.push(d);
    Sd(a, d, e);
    return !0
}, !0, !0);
ta("csi.gstatic.com");
ta("googleads.g.doubleclick.net");
ta("partner.googleadservices.com");
ta("pubads.g.doubleclick.net");
ta("securepubads.g.doubleclick.net");
ta("tpc.googlesyndication.com");

function se(a) {
    if (!a) return "";
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
    a.indexOf("blob:") === 0 && (a = a.substring(5));
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    a.indexOf("//") == 0 && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/");
    c != -1 && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if (c !== "http" && c !== "https" && c !== "chrome-extension" &&
        c !== "moz-extension" && c !== "file" && c !== "android-app" && c !== "chrome-search" && c !== "chrome-untrusted" && c !== "chrome" && c !== "app" && c !== "devtools") throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (d != -1) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if (c === "http" && e !== "80" || c === "https" && e !== "443") a = ":" + e
    }
    return c + "://" + b + a
};

function te() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        n = l = 0
    }

    function b(p) {
        for (var q = g, m = 0; m < 64; m += 4) q[m / 4] = p[m] << 24 | p[m + 1] << 16 | p[m + 2] << 8 | p[m + 3];
        for (m = 16; m < 80; m++) p = q[m - 3] ^ q[m - 8] ^ q[m - 14] ^ q[m - 16], q[m] = (p << 1 | p >>> 31) & 4294967295;
        p = e[0];
        var v = e[1],
            z = e[2],
            C = e[3],
            A = e[4];
        for (m = 0; m < 80; m++) {
            if (m < 40)
                if (m < 20) {
                    var M = C ^ v & (z ^ C);
                    var Ha = 1518500249
                } else M = v ^ z ^ C, Ha = 1859775393;
            else m < 60 ? (M = v & z | C & (v | z), Ha = 2400959708) : (M = v ^ z ^ C, Ha = 3395469782);
            M = ((p << 5 | p >>> 27) & 4294967295) + M + A + Ha + q[m] & 4294967295;
            A = C;
            C = z;
            z = (v << 30 | v >>> 2) & 4294967295;
            v = p;
            p = M
        }
        e[0] = e[0] + p & 4294967295;
        e[1] = e[1] + v & 4294967295;
        e[2] = e[2] + z & 4294967295;
        e[3] = e[3] + C & 4294967295;
        e[4] = e[4] + A & 4294967295
    }

    function c(p, q) {
        if (typeof p === "string") {
            p = unescape(encodeURIComponent(p));
            for (var m = [], v = 0, z = p.length; v < z; ++v) m.push(p.charCodeAt(v));
            p = m
        }
        q || (q = p.length);
        m = 0;
        if (l == 0)
            for (; m + 64 < q;) b(p.slice(m, m + 64)), m += 64, n += 64;
        for (; m < q;)
            if (f[l++] = p[m++], n++, l == 64)
                for (l = 0, b(f); m + 64 < q;) b(p.slice(m, m + 64)), m += 64, n += 64
    }

    function d() {
        var p = [],
            q = n * 8;
        l < 56 ? c(k, 56 - l) : c(k, 64 - (l - 56));
        for (var m = 63; m >= 56; m--) f[m] = q & 255, q >>>= 8;
        b(f);
        for (m = q = 0; m < 5; m++)
            for (var v = 24; v >= 0; v -= 8) p[q++] = e[m] >> v & 255;
        return p
    }
    for (var e = [], f = [], g = [], k = [128], h = 1; h < 64; ++h) k[h] = 0;
    var l, n;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        ya: function() {
            for (var p = d(), q = "", m = 0; m < p.length; m++) q += "0123456789ABCDEF".charAt(Math.floor(p[m] / 16)) + "0123456789ABCDEF".charAt(p[m] % 16);
            return q
        }
    }
};

function ue(a, b, c) {
    var d = String(t.location.href);
    return d && a && b ? [b, ve(se(d), a, c || null)].join(" ") : null
}

function ve(a, b, c) {
    var d = [],
        e = [];
    if ((Array.isArray(c) ? 2 : 1) == 1) return e = [b, a], wa(d, function(k) {
        e.push(k)
    }), we(e.join(" "));
    var f = [],
        g = [];
    wa(c, function(k) {
        g.push(k.key);
        f.push(k.value)
    });
    c = Math.floor((new Date).getTime() / 1E3);
    e = f.length == 0 ? [c, b, a] : [f.join(":"), c, b, a];
    wa(d, function(k) {
        e.push(k)
    });
    a = we(e.join(" "));
    a = [c, a];
    g.length == 0 || a.push(g.join(""));
    return a.join("_")
}

function we(a) {
    var b = te();
    b.update(a);
    return b.ya().toLowerCase()
};
const xe = {};

function ye() {
    this.h = document || {
        cookie: ""
    }
}
ye.prototype.isEnabled = function() {
    if (!t.navigator.cookieEnabled) return !1;
    if (this.h.cookie) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        ka: 60
    });
    if (this.get("TESTCOOKIESENABLED") !== "1") return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
ye.prototype.set = function(a, b, c) {
    let d, e, f, g = !1,
        k;
    typeof c === "object" && (k = c.Ib, g = c.Jb || !1, f = c.domain || void 0, e = c.path || void 0, d = c.ka);
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    d === void 0 && (d = -1);
    this.h.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (e ? ";path=" + e : "") + (d < 0 ? "" : d == 0 ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + d * 1E3)).toUTCString()) + (g ? ";secure" : "") + (k != null ? ";samesite=" + k : "")
};
ye.prototype.get = function(a, b) {
    const c = a + "=",
        d = (this.h.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
        f = pa(d[e]);
        if (f.lastIndexOf(c, 0) == 0) return f.slice(c.length);
        if (f == a) return ""
    }
    return b
};
ye.prototype.remove = function(a, b, c) {
    const d = this.get(a) !== void 0;
    this.set(a, "", {
        ka: 0,
        path: b,
        domain: c
    });
    return d
};
ye.prototype.clear = function() {
    var a = (this.h.cookie || "").split(";");
    const b = [],
        c = [];
    let d, e;
    for (let f = 0; f < a.length; f++) e = pa(a[f]), d = e.indexOf("="), d == -1 ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; a >= 0; a--) this.remove(b[a])
};

function ze() {
    return !!xe.FPA_SAMESITE_PHASE2_MOD || !1
}

function Ae(a, b, c, d) {
    (a = t[a]) || typeof document === "undefined" || (a = (new ye).get(b));
    return a ? ue(a, c, d) : null
};
const Be = self;
class Ce {
    constructor() {
        this.promise = new Promise((a, b) => {
            this.resolve = a;
            this.reject = b
        })
    }
};

function L(a) {
    Pa.call(this);
    this.H = 1;
    this.s = [];
    this.v = 0;
    this.h = [];
    this.j = {};
    this.W = !!a
}
ma(L, Pa);
L.prototype.J = function(a, b, c) {
    var d = this.j[a];
    d || (d = this.j[a] = []);
    var e = this.H;
    this.h[e] = a;
    this.h[e + 1] = b;
    this.h[e + 2] = c;
    this.H = e + 3;
    d.push(e);
    return e
};
L.prototype.C = function(a) {
    var b = this.h[a];
    if (b) {
        var c = this.j[b];
        this.v != 0 ? (this.s.push(a), this.h[a + 1] = () => {}) : (c && ya(c, a), delete this.h[a], delete this.h[a + 1], delete this.h[a + 2])
    }
    return !!b
};
L.prototype.A = function(a, b) {
    var c = this.j[a];
    if (c) {
        for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
        if (this.W)
            for (e = 0; e < c.length; e++) {
                var g = c[e];
                De(this.h[g + 1], this.h[g + 2], d)
            } else {
                this.v++;
                try {
                    for (e = 0, f = c.length; e < f && !this.l; e++) g = c[e], this.h[g + 1].apply(this.h[g + 2], d)
                } finally {
                    if (this.v--, this.s.length > 0 && this.v == 0)
                        for (; c = this.s.pop();) this.C(c)
                }
            }
        return e != 0
    }
    return !1
};

function De(a, b, c) {
    kb(function() {
        a.apply(b, c)
    })
}
L.prototype.clear = function(a) {
    if (a) {
        var b = this.j[a];
        b && (b.forEach(this.C, this), delete this.j[a])
    } else this.h.length = 0, this.j = {}
};
L.prototype.m = function() {
    L.Ja.m.call(this);
    this.clear();
    this.s.length = 0
};
/*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
let N = {};
var Ee = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
N.assign = function(a) {
    for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
        var c = b.shift();
        if (c) {
            if (typeof c !== "object") throw new TypeError(c + "must be non-object");
            for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
        }
    }
    return a
};
N.Mb = function(a, b) {
    if (a.length === b) return a;
    if (a.subarray) return a.subarray(0, b);
    a.length = b;
    return a
};
var Fe = {
        va: function(a, b, c, d, e) {
            if (b.subarray && a.subarray) a.set(b.subarray(c, c + d), e);
            else
                for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        za: function(a) {
            var b, c;
            var d = c = 0;
            for (b = a.length; d < b; d++) c += a[d].length;
            var e = new Uint8Array(c);
            d = c = 0;
            for (b = a.length; d < b; d++) {
                var f = a[d];
                e.set(f, c);
                c += f.length
            }
            return e
        }
    },
    Ge = {
        va: function(a, b, c, d, e) {
            for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        za: function(a) {
            return [].concat.apply([], a)
        }
    };
N.Ia = function() {
    Ee ? (N.qa = Uint8Array, N.oa = Uint16Array, N.pa = Int32Array, N.assign(N, Fe)) : (N.qa = Array, N.oa = Array, N.pa = Array, N.assign(N, Ge))
};
N.Ia();
try {
    new Uint8Array(1)
} catch (a) {};

function He(a) {
    for (var b = a.length; --b >= 0;) a[b] = 0
}
He(Array(576));
He(Array(60));
He(Array(512));
He(Array(256));
He(Array(29));
He(Array(30));
/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var Ie = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var Je = class {
    constructor(a) {
        this.name = a
    }
};
var Ke = new Je("rawColdConfigGroup");
var Le = new Je("rawHotConfigGroup");
var Me = class extends K {
    constructor(a) {
        super(a)
    }
};
var Ne = class extends K {
    constructor(a) {
        super(a)
    }
};
var Oe = class extends K {
    constructor(a) {
        super(a)
    }
};
var Pe = class extends K {
    constructor(a) {
        super(a)
    }
    getPlayerType() {
        var a = ld(this, 36);
        a = a == null ? a : Number.isFinite(a) ? a | 0 : void 0;
        return a != null ? a : 0
    }
    setHomeGroupInfo(a) {
        return I(this, Oe, 81, a)
    }
    clearLocationPlayabilityToken() {
        return od(this, 89)
    }
};
var Qe = class extends K {
        constructor(a) {
            super(a)
        }
        getKey() {
            return Ad(this, 1)
        }
    },
    Re = [2, 3, 4, 5, 6];
var Se = class extends K {
    constructor(a) {
        super(a)
    }
};
var Te = class extends K {
    constructor(a) {
        super(a)
    }
};
var Ue = class extends K {
    constructor(a) {
        super(a)
    }
};
var Ve = class extends K {
    constructor(a) {
        super(a)
    }
    setSafetyMode(a) {
        return Fd(this, 5, a)
    }
};
var We = class extends K {
    constructor(a) {
        super(a)
    }
    j(a) {
        return I(this, Pe, 1, a)
    }
};
var Xe = new Je("signalServiceEndpoint");
var Ye = class extends K {
    constructor(a) {
        super(a)
    }
    setTrackingParams(a) {
        if (a != null)
            if (typeof a === "string") a = a ? new $b(a, Wb) : Zb();
            else if (a.constructor !== $b)
            if (Vb(a)) a = a.length ? new $b(new Uint8Array(a), Wb) : Zb();
            else throw Error();
        return od(this, 1, a)
    }
};
var Ze = class extends K {
    constructor(a) {
        super(a, 497)
    }
};
var $e = class extends K {
    constructor(a) {
        super(a)
    }
};
var af = class extends K {
        constructor(a) {
            super(a)
        }
        setVideoId(a) {
            return qd(this, 1, Cd, Nc(a))
        }
        getPlaylistId() {
            return Bd(this, 2)
        }
    },
    Cd = [1, 2];
var bf = class extends K {
    constructor() {
        super()
    }
};
var cf = new Je("recordNotificationInteractionsEndpoint");
var df = ["notification/convert_endpoint_to_url"],
    ef = ["notification/record_interactions"],
    ff = ["notification_registration/set_registration"];
var gf = a => self.btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a)))).replace(/\+/g, "-").replace(/\//g, "_");
var hf = ["notifications_register", "notifications_check_registration"];
var jf = class extends Error {
    constructor(a, ...b) {
        super(a);
        this.args = [...b]
    }
};
let kf = null;

function O(a, b) {
    const c = {};
    c.key = a;
    c.value = b;
    return lf().then(d => new Promise((e, f) => {
        try {
            const g = d.transaction("swpushnotificationsstore", "readwrite").objectStore("swpushnotificationsstore").put(c);
            g.onsuccess = () => {
                e()
            };
            g.onerror = () => {
                f()
            }
        } catch (g) {
            f(g)
        }
    }))
}

function mf() {
    return O("IndexedDBCheck", "testing IndexedDB").then(() => nf("IndexedDBCheck")).then(a => a === "testing IndexedDB" ? Promise.resolve() : Promise.reject()).then(() => !0).catch(() => !1)
}

function nf(a) {
    const b = new jf("Error accessing DB");
    return lf().then(c => new Promise((d, e) => {
        try {
            const f = c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);
            f.onsuccess = () => {
                const g = f.result;
                d(g ? g.value : null)
            };
            f.onerror = () => {
                b.params = {
                    key: a,
                    source: "onerror"
                };
                e(b)
            }
        } catch (f) {
            b.params = {
                key: a,
                thrownError: String(f)
            }, e(b)
        }
    }), () => null)
}

function lf() {
    return kf ? Promise.resolve(kf) : new Promise((a, b) => {
        const c = self.indexedDB.open("swpushnotificationsdb");
        c.onerror = b;
        c.onsuccess = () => {
            const d = c.result;
            if (d.objectStoreNames.contains("swpushnotificationsstore")) kf = d, a(kf);
            else return self.indexedDB.deleteDatabase("swpushnotificationsdb"), lf()
        };
        c.onupgradeneeded = of
    })
}

function of (a) {
    a = a.target.result;
    a.objectStoreNames.contains("swpushnotificationsstore") && a.deleteObjectStore("swpushnotificationsstore");
    a.createObjectStore("swpushnotificationsstore", {
        keyPath: "key"
    })
};
const pf = {
    WEB_UNPLUGGED: "^unplugged/",
    WEB_UNPLUGGED_ONBOARDING: "^unplugged/",
    WEB_UNPLUGGED_OPS: "^unplugged/",
    WEB_UNPLUGGED_PUBLIC: "^unplugged/",
    WEB_CREATOR: "^creator/",
    WEB_KIDS: "^kids/",
    WEB_EXPERIMENTS: "^experiments/",
    WEB_MUSIC: "^music/",
    WEB_REMIX: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^main_app/|^sfv/"
};

function qf(a) {
    if (a.length === 1) return a[0];
    var b = pf.UNKNOWN_INTERFACE;
    if (b) {
        b = new RegExp(b);
        for (var c of a)
            if (b.exec(c)) return c
    }
    const d = [];
    Object.entries(pf).forEach(([e, f]) => {
        "UNKNOWN_INTERFACE" !== e && d.push(f)
    });
    c = new RegExp(d.join("|"));
    a.sort((e, f) => e.length - f.length);
    for (const e of a)
        if (!c.exec(e)) return e;
    return a[0]
}

function rf(a) {
    return `/youtubei/v1/${qf(a)}`
};
var sf = class extends K {
    constructor(a) {
        super(a)
    }
};
var tf = class extends K {
    constructor(a) {
        super(a, 0, "yt.sw.adr")
    }
};
const uf = t.window;
let vf, wf;
const xf = (uf == null ? void 0 : (vf = uf.yt) == null ? void 0 : vf.config_) || (uf == null ? void 0 : (wf = uf.ytcfg) == null ? void 0 : wf.data_) || {};
w("yt.config_", xf);

function P(...a) {
    a = arguments;
    a.length > 1 ? xf[a[0]] = a[1] : a.length === 1 && Object.assign(xf, a[0])
}

function Q(a, b) {
    return a in xf ? xf[a] : b
};
const yf = [];

function zf(a) {
    yf.forEach(b => b(a))
}

function R(a) {
    return a && window.yterr ? function() {
        try {
            return a.apply(this, arguments)
        } catch (b) {
            Af(b)
        }
    } : a
}

function Af(a) {
    var b = u("yt.logging.errors.log");
    b ? b(a, "ERROR", void 0, void 0, void 0, void 0, void 0) : (b = Q("ERRORS", []), b.push([a, "ERROR", void 0, void 0, void 0, void 0, void 0]), P("ERRORS", b));
    zf(a)
}

function Bf(a) {
    var b = u("yt.logging.errors.log");
    b ? b(a, "WARNING", void 0, void 0, void 0, void 0, void 0) : (b = Q("ERRORS", []), b.push([a, "WARNING", void 0, void 0, void 0, void 0, void 0]), P("ERRORS", b))
};
const Cf = /^[\w.]*$/,
    Df = {
        q: !0,
        search_query: !0
    };

function Ef(a, b) {
    b = a.split(b);
    const c = {};
    for (let f = 0, g = b.length; f < g; f++) {
        const k = b[f].split("=");
        if (k.length === 1 && k[0] || k.length === 2) try {
            const h = Ff(k[0] || ""),
                l = Ff(k[1] || "");
            if (h in c) {
                const n = c[h];
                Array.isArray(n) ? za(n, l) : c[h] = [n, l]
            } else c[h] = l
        } catch (h) {
            var d = h,
                e = k[0];
            const l = String(Ef);
            d.args = [{
                key: e,
                value: k[1],
                query: a,
                method: Gf === l ? "unchanged" : l
            }];
            Df.hasOwnProperty(e) || Bf(d)
        }
    }
    return c
}
const Gf = String(Ef);

function Hf(a) {
    a.charAt(0) === "?" && (a = a.substring(1));
    return Ef(a, "&")
}

function If(a, b, c) {
    var d = a.split("#", 2);
    a = d[0];
    d = d.length > 1 ? "#" + d[1] : "";
    var e = a.split("?", 2);
    a = e[0];
    e = Hf(e[1] || "");
    for (var f in b) !c && e !== null && f in e || (e[f] = b[f]);
    b = a;
    a = Oa(e);
    a ? (c = b.indexOf("#"), c < 0 && (c = b.length), f = b.indexOf("?"), f < 0 || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [b.slice(0, f), e, b.slice(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
    return a + d
}

function Jf(a) {
    if (!b) var b = window.location.href;
    const c = a.match(La)[1] || null,
        d = Ma(a.match(La)[3] || null);
    c && d ? (a = a.match(La), b = b.match(La), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Ma(b.match(La)[3] || null) === d && (Number(b.match(La)[4] || null) || null) === (Number(a.match(La)[4] || null) || null) : !0;
    return a
}

function Ff(a) {
    return a && a.match(Cf) ? a : decodeURIComponent(a.replace(/\+/g, " "))
};

function Kf(a, b) {
    typeof a === "function" && (a = R(a));
    return window.setTimeout(a, b)
};
var Lf = "client_dev_domain client_dev_expflag client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods".split(" "),
    Mf = [...Lf, "client_dev_set_cookie"];

function S(a) {
    a = Nf(a);
    return typeof a === "string" && a === "false" ? !1 : !!a
}

function T(a, b) {
    a = Nf(a);
    return a === void 0 && b !== void 0 ? b : Number(a || 0)
}

function Of() {
    return Q("EXPERIMENTS_TOKEN", "")
}

function Nf(a) {
    return Q("EXPERIMENT_FLAGS", {})[a]
}

function Pf() {
    const a = [],
        b = Q("EXPERIMENTS_FORCED_FLAGS", {});
    for (var c of Object.keys(b)) a.push({
        key: c,
        value: String(b[c])
    });
    c = Q("EXPERIMENT_FLAGS", {});
    for (const d of Object.keys(c)) d.startsWith("force_") && b[d] === void 0 && a.push({
        key: d,
        value: String(c[d])
    });
    return a
};
[...Lf];
let Qf = !1;

function Rf(a, b) {
    const c = {
        method: b.method || "GET",
        credentials: "same-origin"
    };
    b.headers && (c.headers = b.headers);
    a = Sf(a, b);
    const d = Tf(a, b);
    d && (c.body = d);
    b.withCredentials && (c.credentials = "include");
    const e = b.context || t;
    let f = !1,
        g;
    fetch(a, c).then(k => {
        if (!f) {
            f = !0;
            g && window.clearTimeout(g);
            var h = k.ok,
                l = n => {
                    n = n || {};
                    h ? b.onSuccess && b.onSuccess.call(e, n, k) : b.onError && b.onError.call(e, n, k);
                    b.onFinish && b.onFinish.call(e, n, k)
                };
            (b.format || "JSON") === "JSON" && (h || k.status >= 400 && k.status < 500) ? k.json().then(l, () => {
                l(null)
            }): l(null)
        }
    }).catch(() => {
        b.onError && b.onError.call(e, {}, {})
    });
    a = b.timeout || 0;
    b.onFetchTimeout && a > 0 && (g = Kf(() => {
        f || (f = !0, window.clearTimeout(g), b.onFetchTimeout.call(b.context || t))
    }, a))
}

function Sf(a, b) {
    b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
    const c = Q("XSRF_FIELD_NAME");
    if (b = b.urlParams) b[c] && delete b[c], a = If(a, b || {}, !0);
    return a
}

function Tf(a, b) {
    const c = Q("XSRF_FIELD_NAME"),
        d = Q("XSRF_TOKEN");
    var e = b.postBody || "",
        f = b.postParams;
    const g = Q("XSRF_FIELD_NAME");
    let k;
    b.headers && (k = b.headers["Content-Type"]);
    b.excludeXsrf || Ma(a.match(La)[3] || null) && !b.withCredentials && Ma(a.match(La)[3] || null) !== document.location.hostname || b.method !== "POST" || k && k !== "application/x-www-form-urlencoded" || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
    (S("ajax_parse_query_data_only_when_filled") && f && Object.keys(f).length > 0 || f) && typeof e === "string" &&
        (e = Hf(e), Da(e, f), e = b.postBodyFormat && b.postBodyFormat === "JSON" ? JSON.stringify(e) : Oa(e));
    f = e || f && !Aa(f);
    !Qf && f && b.method !== "POST" && (Qf = !0, Af(Error("AJAX request with postData should use POST")));
    return e
};
const Uf = [{
    aa: a => `Cannot read property '${a.key}'`,
    U: {
        Error: [{
            u: /(Permission denied) to access property "([^']+)"/,
            groups: ["reason", "key"]
        }],
        TypeError: [{
            u: /Cannot read property '([^']+)' of (null|undefined)/,
            groups: ["key", "value"]
        }, {
            u: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
            groups: ["value", "key"]
        }, {
            u: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
            groups: ["value", "key"]
        }, {
            u: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
            groups: ["key"]
        }, {
            u: /Unable to get property '([^']+)' of (undefined or null) reference/,
            groups: ["key", "value"]
        }, {
            u: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
            groups: ["value", "base", "key"]
        }]
    }
}, {
    aa: a => `Cannot call '${a.key}'`,
    U: {
        TypeError: [{
            u: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
            groups: ["base", "key"]
        }, {
            u: /([^ ]+) called on (null or undefined)/,
            groups: ["key", "value"]
        }, {
            u: /Object (.*) has no method '([^ ]+)'/,
            groups: ["base", "key"]
        }, {
            u: /Object doesn't support property or method '([^ ]+)'/,
            groups: ["key"]
        }, {
            u: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
            groups: ["key"]
        }, {
            u: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
            groups: ["key"]
        }]
    }
}, {
    aa: a => `${a.key} is not defined`,
    U: {
        ReferenceError: [{
            u: /(.*) is not defined/,
            groups: ["key"]
        }, {
            u: /Can't find variable: (.*)/,
            groups: ["key"]
        }]
    }
}];
var Wf = {
    F: [],
    D: [{
        callback: Vf,
        weight: 500
    }]
};

function Vf(a) {
    if (a.name === "JavaException") return !0;
    a = a.stack;
    return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://")
};

function Xf() {
    if (!Yf) {
        var a = Yf = new Zf;
        a.F.length = 0;
        a.D.length = 0;
        $f(a, Wf)
    }
    return Yf
}

function $f(a, b) {
    b.F && a.F.push.apply(a.F, b.F);
    b.D && a.D.push.apply(a.D, b.D)
}
var Zf = class {
        constructor() {
            this.D = [];
            this.F = []
        }
    },
    Yf;
const ag = new L;

function bg(a) {
    const b = a.length;
    let c = 0;
    const d = () => a.charCodeAt(c++);
    do {
        var e = cg(d);
        if (e === Infinity) break;
        const f = e >> 3;
        switch (e & 7) {
            case 0:
                e = cg(d);
                if (f === 2) return e;
                break;
            case 1:
                if (f === 2) return;
                c += 8;
                break;
            case 2:
                e = cg(d);
                if (f === 2) return a.substr(c, e);
                c += e;
                break;
            case 5:
                if (f === 2) return;
                c += 4;
                break;
            default:
                return
        }
    } while (c < b)
}

function cg(a) {
    let b = a(),
        c = b & 127;
    if (b < 128) return c;
    b = a();
    c |= (b & 127) << 7;
    if (b < 128) return c;
    b = a();
    c |= (b & 127) << 14;
    if (b < 128) return c;
    b = a();
    return b < 128 ? c | (b & 127) << 21 : Infinity
};

function dg(a, b, c, d) {
    if (a)
        if (Array.isArray(a)) {
            var e = d;
            for (d = 0; d < a.length && !(a[d] && (e += eg(d, a[d], b, c), e > 500)); d++);
            d = e
        } else if (typeof a === "object")
        for (e in a) {
            if (a[e]) {
                var f = e;
                var g = a[e],
                    k = b,
                    h = c;
                f = typeof g !== "string" || f !== "clickTrackingParams" && f !== "trackingParams" ? 0 : (g = bg(atob(g.replace(/-/g, "+").replace(/_/g, "/")))) ? eg(`${f}.ve`, g, k, h) : 0;
                d += f;
                d += eg(e, a[e], b, c);
                if (d > 500) break
            }
        } else c[b] = fg(a), d += c[b].length;
    else c[b] = fg(a), d += c[b].length;
    return d
}

function eg(a, b, c, d) {
    c += `.${a}`;
    a = fg(b);
    d[c] = a;
    return c.length + a.length
}

function fg(a) {
    try {
        return (typeof a === "string" ? a : String(JSON.stringify(a))).substr(0, 500)
    } catch (b) {
        return `unable to serialize ${typeof a} (${b.message})`
    }
};

function gg() {
    hg.h || (hg.h = new hg);
    return hg.h
}

function ig(a, b) {
    a = {};
    var c = [],
        d = S("enable_first_party_auth_v2") || (b == null ? void 0 : b.ha) && S("enable_first_party_auth_v2_on_get_account_menu");
    "USER_SESSION_ID" in xf && d && c.push({
        key: "u",
        value: Q("USER_SESSION_ID")
    });
    var e = se(String(t.location.href));
    d = [];
    var f = t.__SAPISID || t.__APISID || t.__3PSAPISID || t.__OVERRIDE_SID;
    ze() && (f = f || t.__1PSAPISID);
    if (f) f = !0;
    else {
        if (typeof document !== "undefined") {
            const g = new ye;
            f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID");
            ze() && (f = f || g.get("__Secure-1PAPISID"))
        }
        f = !!f
    }
    f && (f = (e = e.indexOf("https:") == 0 || e.indexOf("chrome-extension:") == 0 || e.indexOf("chrome-untrusted://new-tab-page") == 0 || e.indexOf("moz-extension:") == 0) ? t.__SAPISID : t.__APISID, f || typeof document === "undefined" || (f = new ye, f = f.get(e ? "SAPISID" : "APISID") || f.get("__Secure-3PAPISID")), (f = f ? ue(f, e ? "SAPISIDHASH" : "APISIDHASH", c) : null) && d.push(f), e && ze() && ((e = Ae("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", c)) && d.push(e), (c = Ae("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", c)) && d.push(c)));
    if (c = d.length ==
        0 ? null : d.join(" ")) a.Authorization = c, c = b = b == null ? void 0 : b.sessionIndex, c === void 0 && (c = Number(Q("SESSION_INDEX", 0)), c = isNaN(c) ? 0 : c), S("voice_search_auth_header_removal") || (a["X-Goog-AuthUser"] = c.toString()), "INNERTUBE_HOST_OVERRIDE" in xf || (a["X-Origin"] = window.location.origin), b === void 0 && "DELEGATED_SESSION_ID" in xf && (a["X-Goog-PageId"] = Q("DELEGATED_SESSION_ID"));
    return a
}
var hg = class {
    constructor() {
        this.Ka = !0
    }
};
var jg = {
    identityType: "UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"
};

function kg(a) {
    switch (a) {
        case "DESKTOP":
            return 1;
        case "UNKNOWN_PLATFORM":
            return 0;
        case "TV":
            return 2;
        case "GAME_CONSOLE":
            return 3;
        case "MOBILE":
            return 4;
        case "TABLET":
            return 5
    }
};
w("ytglobal.prefsUserPrefsPrefs_", u("ytglobal.prefsUserPrefsPrefs_") || {});

function lg() {
    if (Q("DATASYNC_ID") !== void 0) return Q("DATASYNC_ID");
    throw new jf("Datasync ID not set", "unknown");
};

function mg(a, b) {
    return ng(a, 0, b)
}

function og(a) {
    const b = u("yt.scheduler.instance.addImmediateJob");
    b ? b(a) : a()
}
var pg = class {
    h(a) {
        ng(a, 1)
    }
};

function qg() {
    rg.h || (rg.h = new rg);
    return rg.h
}

function ng(a, b, c) {
    c !== void 0 && Number.isNaN(Number(c)) && (c = void 0);
    const d = u("yt.scheduler.instance.addJob");
    return d ? d(a, b, c) : c === void 0 ? (a(), NaN) : Kf(a, c || 0)
}
var rg = class extends pg {
        P(a) {
            if (a === void 0 || !Number.isNaN(Number(a))) {
                var b = u("yt.scheduler.instance.cancelJob");
                b ? b(a) : window.clearTimeout(a)
            }
        }
        start() {
            const a = u("yt.scheduler.instance.start");
            a && a()
        }
    },
    sg = qg();
const tg = [];
let ug, vg = !1;

function wg(a) {
    vg || (ug ? ug.handleError(a) : (tg.push({
        type: "ERROR",
        payload: a
    }), tg.length > 10 && tg.shift()))
}

function xg(a, b) {
    vg || (ug ? ug.R(a, b) : (tg.push({
        type: "EVENT",
        eventType: a,
        payload: b
    }), tg.length > 10 && tg.shift()))
};

function yg(a) {
    if (a.indexOf(":") >= 0) throw Error("Database name cannot contain ':'");
}

function zg(a) {
    return a.substr(0, a.indexOf(":")) || a
};
const Ag = {
        AUTH_INVALID: "No user identifier specified.",
        EXPLICIT_ABORT: "Transaction was explicitly aborted.",
        IDB_NOT_SUPPORTED: "IndexedDB is not supported.",
        MISSING_INDEX: "Index not created.",
        MISSING_OBJECT_STORES: "Object stores not created.",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "Database is deleted because expected object stores were not created.",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "Database is reopened because expected object stores were not created.",
        UNKNOWN_ABORT: "Transaction was aborted for unknown reasons.",
        QUOTA_EXCEEDED: "The current transaction exceeded its quota limitations.",
        QUOTA_MAYBE_EXCEEDED: "The current transaction may have failed because of exceeding quota limitations.",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "Can't start a transaction on a closed database",
        INCOMPATIBLE_DB_VERSION: "The binary is incompatible with the database version"
    },
    Bg = {
        AUTH_INVALID: "ERROR",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "WARNING",
        EXPLICIT_ABORT: "IGNORED",
        IDB_NOT_SUPPORTED: "ERROR",
        MISSING_INDEX: "WARNING",
        MISSING_OBJECT_STORES: "ERROR",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "WARNING",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "WARNING",
        QUOTA_EXCEEDED: "WARNING",
        QUOTA_MAYBE_EXCEEDED: "WARNING",
        UNKNOWN_ABORT: "WARNING",
        INCOMPATIBLE_DB_VERSION: "WARNING"
    },
    Cg = {
        AUTH_INVALID: !1,
        EXECUTE_TRANSACTION_ON_CLOSED_DB: !1,
        EXPLICIT_ABORT: !1,
        IDB_NOT_SUPPORTED: !1,
        MISSING_INDEX: !1,
        MISSING_OBJECT_STORES: !1,
        DB_DELETED_BY_MISSING_OBJECT_STORES: !1,
        DB_REOPENED_BY_MISSING_OBJECT_STORES: !1,
        QUOTA_EXCEEDED: !1,
        QUOTA_MAYBE_EXCEEDED: !0,
        UNKNOWN_ABORT: !0,
        INCOMPATIBLE_DB_VERSION: !1
    };
var U = class extends jf {
        constructor(a, b = {}, c = Ag[a], d = Bg[a], e = Cg[a]) {
            super(c, Object.assign({}, {
                name: "YtIdbKnownError",
                isSw: self.document === void 0,
                isIframe: self !== self.top,
                type: a
            }, b));
            this.type = a;
            this.message = c;
            this.level = d;
            this.h = e;
            Object.setPrototypeOf(this, U.prototype)
        }
    },
    Dg = class extends U {
        constructor(a, b) {
            super("MISSING_OBJECT_STORES", {
                expectedObjectStores: b,
                foundObjectStores: a
            }, Ag.MISSING_OBJECT_STORES);
            Object.setPrototypeOf(this, Dg.prototype)
        }
    },
    Eg = class extends Error {
        constructor(a, b) {
            super();
            this.index =
                a;
            this.objectStore = b;
            Object.setPrototypeOf(this, Eg.prototype)
        }
    };
const Fg = ["The database connection is closing", "Can't start a transaction on a closed database", "A mutation operation was attempted on a database that did not allow mutations"];

function Gg(a, b, c, d) {
    b = zg(b);
    let e;
    e = a instanceof Error ? a : Error(`Unexpected error: ${a}`);
    if (e instanceof U) return e;
    a = {
        objectStoreNames: c,
        dbName: b,
        dbVersion: d
    };
    if (e.name === "QuotaExceededError") return new U("QUOTA_EXCEEDED", a);
    if (Hb && e.name === "UnknownError") return new U("QUOTA_MAYBE_EXCEEDED", a);
    if (e instanceof Eg) return new U("MISSING_INDEX", Object.assign({}, a, {
        objectStore: e.objectStore,
        index: e.index
    }));
    if (e.name === "InvalidStateError" && Fg.some(f => e.message.includes(f))) return new U("EXECUTE_TRANSACTION_ON_CLOSED_DB",
        a);
    if (e.name === "AbortError") return new U("UNKNOWN_ABORT", a, e.message);
    e.args = [Object.assign({}, a, {
        name: "IdbError",
        yb: e.name
    })];
    e.level = "WARNING";
    return e
}

function Hg(a, b, c) {
    return new U("IDB_NOT_SUPPORTED", {
        context: {
            caller: a,
            publicName: b,
            version: c,
            hasSucceededOnce: void 0
        }
    })
};

function Ig(a) {
    if (!a) throw Error();
    throw a;
}

function Jg(a) {
    return a
}
var Kg = class {
    constructor(a) {
        this.h = a
    }
};

function Lg(a, b, c, d, e) {
    try {
        if (a.state.status !== "FULFILLED") throw Error("calling handleResolve before the promise is fulfilled.");
        const f = c(a.state.value);
        f instanceof Mg ? Ng(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function Og(a, b, c, d, e) {
    try {
        if (a.state.status !== "REJECTED") throw Error("calling handleReject before the promise is rejected.");
        const f = c(a.state.reason);
        f instanceof Mg ? Ng(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function Ng(a, b, c, d, e) {
    b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(f => {
        f instanceof Mg ? Ng(a, b, f, d, e) : d(f)
    }, f => {
        e(f)
    })
}
var Mg = class {
    constructor(a) {
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.i = [];
        a = a.h;
        const b = d => {
                if (this.state.status === "PENDING") {
                    this.state = {
                        status: "FULFILLED",
                        value: d
                    };
                    for (const e of this.h) e()
                }
            },
            c = d => {
                if (this.state.status === "PENDING") {
                    this.state = {
                        status: "REJECTED",
                        reason: d
                    };
                    for (const e of this.i) e()
                }
            };
        try {
            a(b, c)
        } catch (d) {
            c(d)
        }
    }
    static all(a) {
        return new Mg(new Kg((b, c) => {
            const d = [];
            let e = a.length;
            e === 0 && b(d);
            for (let f = 0; f < a.length; ++f) Mg.resolve(a[f]).then(g => {
                d[f] = g;
                e--;
                e === 0 && b(d)
            }).catch(g => {
                c(g)
            })
        }))
    }
    static resolve(a) {
        return new Mg(new Kg((b, c) => {
            a instanceof Mg ? a.then(b, c) : b(a)
        }))
    }
    static reject(a) {
        return new Mg(new Kg((b, c) => {
            c(a)
        }))
    }
    then(a, b) {
        const c = a != null ? a : Jg,
            d = b != null ? b : Ig;
        return new Mg(new Kg((e, f) => {
            this.state.status === "PENDING" ? (this.h.push(() => {
                Lg(this, this, c, e, f)
            }), this.i.push(() => {
                Og(this, this, d, e, f)
            })) : this.state.status === "FULFILLED" ? Lg(this, this, c, e, f) : this.state.status === "REJECTED" && Og(this, this, d, e, f)
        }))
    } catch (a) {
        return this.then(void 0, a)
    }
};

function Pg(a, b, c) {
    const d = () => {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", f)
            } catch (g) {}
        },
        e = () => {
            b(a.result);
            d()
        },
        f = () => {
            c(a.error);
            d()
        };
    a.addEventListener("success", e);
    a.addEventListener("error", f)
}

function Qg(a) {
    return new Promise((b, c) => {
        Pg(a, b, c)
    })
}

function V(a) {
    return new Mg(new Kg((b, c) => {
        Pg(a, b, c)
    }))
};

function Rg(a, b) {
    return new Mg(new Kg((c, d) => {
        const e = () => {
            const f = a ? b(a) : null;
            f ? f.then(g => {
                a = g;
                e()
            }, d) : c()
        };
        e()
    }))
};
const Sg = window;
var W = Sg.ytcsi && Sg.ytcsi.now ? Sg.ytcsi.now : Sg.performance && Sg.performance.timing && Sg.performance.now && Sg.performance.timing.navigationStart ? () => Sg.performance.timing.navigationStart + Sg.performance.now() : () => (new Date).getTime();

function X(a, b, c, d) {
    return r(function*() {
        const e = {
            mode: "readonly",
            B: !1,
            tag: "IDB_TRANSACTION_TAG_UNKNOWN"
        };
        typeof c === "string" ? e.mode = c : Object.assign(e, c);
        a.transactionCount++;
        const f = e.B ? 3 : 1;
        let g = 0,
            k;
        for (; !k;) {
            g++;
            const n = Math.round(W());
            try {
                var h = a.h.transaction(b, e.mode),
                    l = d;
                const p = new Tg(h),
                    q = yield Ug(p, l), m = Math.round(W());
                Vg(a, n, m, g, void 0, b.join(), e);
                return q
            } catch (p) {
                l = Math.round(W());
                const q = Gg(p, a.h.name, b.join(), a.h.version);
                if (q instanceof U && !q.h || g >= f) Vg(a, n, l, g, q, b.join(), e), k = q
            }
        }
        return Promise.reject(k)
    })
}

function Wg(a, b, c) {
    a = a.h.createObjectStore(b, c);
    return new Xg(a)
}

function Yg(a, b, c, d) {
    return X(a, [b], {
        mode: "readwrite",
        B: !0
    }, e => {
        e = e.objectStore(b);
        return V(e.h.put(c, d))
    })
}

function Vg(a, b, c, d, e, f, g) {
    b = c - b;
    e ? (e instanceof U && (e.type === "QUOTA_EXCEEDED" || e.type === "QUOTA_MAYBE_EXCEEDED") && xg("QUOTA_EXCEEDED", {
        dbName: zg(a.h.name),
        objectStoreNames: f,
        transactionCount: a.transactionCount,
        transactionMode: g.mode
    }), e instanceof U && e.type === "UNKNOWN_ABORT" && (c -= a.j, c < 0 && c >= Math.pow(2, 31) && (c = 0), xg("TRANSACTION_UNEXPECTEDLY_ABORTED", {
        objectStoreNames: f,
        transactionDuration: b,
        transactionCount: a.transactionCount,
        dbDuration: c
    }), a.i = !0), Zg(a, !1, d, f, b, g.tag), wg(e)) : Zg(a, !0, d, f, b, g.tag)
}

function Zg(a, b, c, d, e, f = "IDB_TRANSACTION_TAG_UNKNOWN") {
    xg("TRANSACTION_ENDED", {
        objectStoreNames: d,
        connectionHasUnknownAbortedTransaction: a.i,
        duration: e,
        isSuccessful: b,
        tryCount: c,
        tag: f
    })
}
var $g = class {
    constructor(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(W());
        this.i = !1
    }
    add(a, b, c) {
        return X(this, [a], {
            mode: "readwrite",
            B: !0
        }, d => d.objectStore(a).add(b, c))
    }
    clear(a) {
        return X(this, [a], {
            mode: "readwrite",
            B: !0
        }, b => b.objectStore(a).clear())
    }
    close() {
        this.h.close();
        let a;
        ((a = this.options) == null ? 0 : a.closed) && this.options.closed()
    }
    count(a, b) {
        return X(this, [a], {
            mode: "readonly",
            B: !0
        }, c => c.objectStore(a).count(b))
    }
    delete(a, b) {
        return X(this, [a], {
            mode: "readwrite",
            B: !0
        }, c => c.objectStore(a).delete(b))
    }
    get(a, b) {
        return X(this, [a], {
            mode: "readonly",
            B: !0
        }, c => c.objectStore(a).get(b))
    }
    getAll(a, b, c) {
        return X(this, [a], {
            mode: "readonly",
            B: !0
        }, d => d.objectStore(a).getAll(b, c))
    }
    objectStoreNames() {
        return Array.from(this.h.objectStoreNames)
    }
    getName() {
        return this.h.name
    }
};

function ah(a, b, c) {
    a = a.h.openCursor(b.query, b.direction);
    return bh(a).then(d => Rg(d, c))
}

function ch(a, b) {
    return ah(a, {
        query: b
    }, c => c.delete().then(() => dh(c))).then(() => {})
}

function eh(a, b, c) {
    const d = [];
    return ah(a, {
        query: b
    }, e => {
        if (!(c !== void 0 && d.length >= c)) return d.push(e.cursor.value), dh(e)
    }).then(() => d)
}
var Xg = class {
    constructor(a) {
        this.h = a
    }
    add(a, b) {
        return V(this.h.add(a, b))
    }
    autoIncrement() {
        return this.h.autoIncrement
    }
    clear() {
        return V(this.h.clear()).then(() => {})
    }
    count(a) {
        return V(this.h.count(a))
    }
    delete(a) {
        return a instanceof IDBKeyRange ? ch(this, a) : V(this.h.delete(a))
    }
    get(a) {
        return V(this.h.get(a))
    }
    getAll(a, b) {
        return "getAll" in IDBObjectStore.prototype ? V(this.h.getAll(a, b)) : eh(this, a, b)
    }
    index(a) {
        try {
            return new fh(this.h.index(a))
        } catch (b) {
            if (b instanceof Error && b.name === "NotFoundError") throw new Eg(a,
                this.h.name);
            throw b;
        }
    }
    getName() {
        return this.h.name
    }
    keyPath() {
        return this.h.keyPath
    }
};

function Ug(a, b) {
    const c = new Promise((d, e) => {
        try {
            b(a).then(f => {
                d(f)
            }).catch(e)
        } catch (f) {
            e(f), a.abort()
        }
    });
    return Promise.all([c, a.done]).then(([d]) => d)
}
var Tg = class {
    constructor(a) {
        this.h = a;
        this.j = new Map;
        this.i = !1;
        this.done = new Promise((b, c) => {
            this.h.addEventListener("complete", () => {
                b()
            });
            this.h.addEventListener("error", d => {
                d.currentTarget === d.target && c(this.h.error)
            });
            this.h.addEventListener("abort", () => {
                var d = this.h.error;
                if (d) c(d);
                else if (!this.i) {
                    d = U;
                    var e = this.h.objectStoreNames;
                    const f = [];
                    for (let g = 0; g < e.length; g++) {
                        const k = e.item(g);
                        if (k === null) throw Error("Invariant: item in DOMStringList is null");
                        f.push(k)
                    }
                    d = new d("UNKNOWN_ABORT", {
                        objectStoreNames: f.join(),
                        dbName: this.h.db.name,
                        mode: this.h.mode
                    });
                    c(d)
                }
            })
        })
    }
    abort() {
        this.h.abort();
        this.i = !0;
        throw new U("EXPLICIT_ABORT");
    }
    objectStore(a) {
        a = this.h.objectStore(a);
        let b = this.j.get(a);
        b || (b = new Xg(a), this.j.set(a, b));
        return b
    }
};

function gh(a, b, c) {
    const {
        query: d = null,
        direction: e = "next"
    } = b;
    a = a.h.openCursor(d, e);
    return bh(a).then(f => Rg(f, c))
}

function hh(a, b, c) {
    const d = [];
    return gh(a, {
        query: b
    }, e => {
        if (!(c !== void 0 && d.length >= c)) return d.push(e.cursor.value), dh(e)
    }).then(() => d)
}
var fh = class {
    constructor(a) {
        this.h = a
    }
    count(a) {
        return V(this.h.count(a))
    }
    delete(a) {
        return gh(this, {
            query: a
        }, b => b.delete().then(() => dh(b)))
    }
    get(a) {
        return V(this.h.get(a))
    }
    getAll(a, b) {
        return "getAll" in IDBIndex.prototype ? V(this.h.getAll(a, b)) : hh(this, a, b)
    }
    getKey(a) {
        return V(this.h.getKey(a))
    }
    keyPath() {
        return this.h.keyPath
    }
    unique() {
        return this.h.unique
    }
};

function bh(a) {
    return V(a).then(b => b ? new ih(a, b) : null)
}

function dh(a) {
    a.cursor.continue(void 0);
    return bh(a.request)
}

function jh(a) {
    a.cursor.advance(5);
    return bh(a.request)
}
var ih = class {
    constructor(a, b) {
        this.request = a;
        this.cursor = b
    }
    delete() {
        return V(this.cursor.delete()).then(() => {})
    }
    getKey() {
        return this.cursor.key
    }
    update(a) {
        return V(this.cursor.update(a))
    }
};

function kh(a, b, c) {
    return new Promise((d, e) => {
        let f;
        f = b !== void 0 ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
        const g = c.wa,
            k = c.blocking,
            h = c.La,
            l = c.upgrade,
            n = c.closed;
        let p;
        const q = () => {
            p || (p = new $g(f.result, {
                closed: n
            }));
            return p
        };
        f.addEventListener("upgradeneeded", m => {
            try {
                if (m.newVersion === null) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                if (f.transaction === null) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                m.dataLoss && m.dataLoss !== "none" && xg("IDB_DATA_CORRUPTED", {
                    reason: m.dataLossMessage || "unknown reason",
                    dbName: zg(a)
                });
                const v = q(),
                    z = new Tg(f.transaction);
                l && l(v, C => m.oldVersion < C && m.newVersion >= C, z);
                z.done.catch(C => {
                    e(C)
                })
            } catch (v) {
                e(v)
            }
        });
        f.addEventListener("success", () => {
            const m = f.result;
            k && m.addEventListener("versionchange", () => {
                k(q())
            });
            m.addEventListener("close", () => {
                xg("IDB_UNEXPECTEDLY_CLOSED", {
                    dbName: zg(a),
                    dbVersion: m.version
                });
                h && h()
            });
            d(q())
        });
        f.addEventListener("error", () => {
            e(f.error)
        });
        g && f.addEventListener("blocked", () => {
            g()
        })
    })
}

function lh(a, b, c = {}) {
    return kh(a, b, c)
}

function mh(a, b = {}) {
    return r(function*() {
        try {
            const c = self.indexedDB.deleteDatabase(a),
                d = b.wa;
            d && c.addEventListener("blocked", () => {
                d()
            });
            yield Qg(c)
        } catch (c) {
            throw Gg(c, a, "", -1);
        }
    })
};

function nh(a, b) {
    return new U("INCOMPATIBLE_DB_VERSION", {
        dbName: a.name,
        oldVersion: a.options.version,
        newVersion: b
    })
}

function oh(a, b) {
    if (!b) throw Hg("openWithToken", zg(a.name));
    return a.open()
}
var ph = class {
    constructor(a, b) {
        this.name = a;
        this.options = b;
        this.j = !0;
        this.m = this.l = 0
    }
    i(a, b, c = {}) {
        return lh(a, b, c)
    }
    delete(a = {}) {
        return mh(this.name, a)
    }
    open() {
        if (!this.j) throw nh(this);
        if (this.h) return this.h;
        let a;
        const b = () => {
                this.h === a && (this.h = void 0)
            },
            c = {
                blocking: e => {
                    e.close()
                },
                closed: b,
                La: b,
                upgrade: this.options.upgrade
            },
            d = () => {
                const e = this;
                return r(function*() {
                    var f, g = (f = Error().stack) != null ? f : "";
                    try {
                        const h = yield e.i(e.name, e.options.version, c);
                        f = h;
                        var k = e.options;
                        const l = [];
                        for (const n of Object.keys(k.L)) {
                            const {
                                K: p,
                                Db: q = Number.MAX_VALUE
                            } = k.L[n];
                            !(f.h.version >= p) || f.h.version >= q || f.h.objectStoreNames.contains(n) || l.push(n)
                        }
                        if (l.length !== 0) {
                            const n = Object.keys(e.options.L),
                                p = h.objectStoreNames();
                            if (e.m < T("ytidb_reopen_db_retries", 0)) return e.m++, h.close(), wg(new U("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: n,
                                foundObjectStores: p
                            })), d();
                            if (e.l < T("ytidb_remake_db_retries", 1)) return e.l++, yield e.delete(), wg(new U("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: n,
                                foundObjectStores: p
                            })), d();
                            throw new Dg(p, n);
                        }
                        return h
                    } catch (h) {
                        if (h instanceof DOMException ? h.name === "VersionError" : "DOMError" in self && h instanceof DOMError ? h.name === "VersionError" : h instanceof Object && "message" in h && h.message === "An attempt was made to open a database using a lower version than the existing version.") {
                            g =
                                yield e.i(e.name, void 0, Object.assign({}, c, {
                                    upgrade: void 0
                                }));
                            k = g.h.version;
                            if (e.options.version !== void 0 && k > e.options.version + 1) throw g.close(), e.j = !1, nh(e, k);
                            return g
                        }
                        b();
                        h instanceof Error && !S("ytidb_async_stack_killswitch") && (h.stack = `${h.stack}\n${g.substring(g.indexOf("\n")+1)}`);
                        let l;
                        throw Gg(h, e.name, "", (l = e.options.version) != null ? l : -1);
                    }
                })
            };
        return this.h = a = d()
    }
};
const qh = new ph("YtIdbMeta", {
    L: {
        databases: {
            K: 1
        }
    },
    upgrade(a, b) {
        b(1) && Wg(a, "databases", {
            keyPath: "actualName"
        })
    }
});

function rh(a, b) {
    return r(function*() {
        return X(yield oh(qh, b), ["databases"], {
            B: !0,
            mode: "readwrite"
        }, c => {
            const d = c.objectStore("databases");
            return d.get(a.actualName).then(e => {
                if (e ? a.actualName !== e.actualName || a.publicName !== e.publicName || a.userIdentifier !== e.userIdentifier : 1) return V(d.h.put(a, void 0)).then(() => {})
            })
        })
    })
}

function sh(a, b) {
    return r(function*() {
        if (a) return (yield oh(qh, b)).delete("databases", a)
    })
};
let th;
const uh = new class {
    constructor() {}
}(new class {
    constructor() {}
});

function vh() {
    return r(function*() {
        return !0
    })
}

function wh() {
    if (th !== void 0) return th;
    vg = !0;
    return th = vh().then(a => {
        vg = !1;
        return a
    })
}

function xh() {
    return u("ytglobal.idbToken_") || void 0
}

function yh() {
    const a = xh();
    return a ? Promise.resolve(a) : wh().then(b => {
        (b = b ? uh : void 0) && w("ytglobal.idbToken_", b);
        return b
    })
};
new Ce;

function zh(a) {
    try {
        lg();
        var b = !0
    } catch (c) {
        b = !1
    }
    if (!b) throw a = new U("AUTH_INVALID", {
        dbName: a
    }), wg(a), a;
    b = lg();
    return {
        actualName: `${a}:${b}`,
        publicName: a,
        userIdentifier: b
    }
}

function Ah(a, b, c, d) {
    return r(function*() {
        var e, f = (e = Error().stack) != null ? e : "";
        e = yield yh();
        if (!e) throw e = Hg("openDbImpl", a, b), S("ytidb_async_stack_killswitch") || (e.stack = `${e.stack}\n${f.substring(f.indexOf("\n")+1)}`), wg(e), e;
        yg(a);
        f = c ? {
            actualName: a,
            publicName: a,
            userIdentifier: void 0
        } : zh(a);
        try {
            return yield rh(f, e), yield lh(f.actualName, b, d)
        } catch (g) {
            try {
                yield sh(f.actualName, e)
            } catch (k) {}
            throw g;
        }
    })
}

function Bh(a, b, c = {}) {
    return Ah(a, b, !1, c)
}

function Ch(a, b, c = {}) {
    return Ah(a, b, !0, c)
}

function Dh(a, b = {}) {
    return r(function*() {
        const c = yield yh();
        if (c) {
            yg(a);
            var d = zh(a);
            yield mh(d.actualName, b);
            yield sh(d.actualName, c)
        }
    })
}

function Eh(a, b = {}) {
    return r(function*() {
        const c = yield yh();
        c && (yg(a), yield mh(a, b), yield sh(a, c))
    })
};

function Fh(a, b) {
    let c;
    return () => {
        c || (c = new Gh(a, b));
        return c
    }
}
var Gh = class extends ph {
    constructor(a, b) {
        super(a, b);
        this.options = b;
        yg(a)
    }
    i(a, b, c = {}) {
        return (this.options.shared ? Ch : Bh)(a, b, Object.assign({}, c))
    }
    delete(a = {}) {
        return (this.options.shared ? Eh : Dh)(this.name, a)
    }
};

function Hh(a, b) {
    return Fh(a, b)
};
var Ih = Hh("ytGcfConfig", {
    L: {
        coldConfigStore: {
            K: 1
        },
        hotConfigStore: {
            K: 1
        }
    },
    shared: !1,
    upgrade(a, b) {
        b(1) && (Wg(a, "hotConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("hotTimestampIndex", "timestamp", {
            unique: !1
        }), Wg(a, "coldConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("coldTimestampIndex", "timestamp", {
            unique: !1
        }))
    },
    version: 1
});

function Jh(a) {
    return oh(Ih(), a)
}

function Kh(a, b, c) {
    return r(function*() {
        const d = {
                config: a,
                hashData: b,
                timestamp: W()
            },
            e = yield Jh(c);
        yield e.clear("hotConfigStore");
        return yield Yg(e, "hotConfigStore", d)
    })
}

function Lh(a, b, c, d) {
    return r(function*() {
        const e = {
                config: a,
                hashData: b,
                configData: c,
                timestamp: W()
            },
            f = yield Jh(d);
        yield f.clear("coldConfigStore");
        return yield Yg(f, "coldConfigStore", e)
    })
}

function Mh(a) {
    return r(function*() {
        let b = void 0;
        yield X(yield Jh(a), ["coldConfigStore"], {
            mode: "readwrite",
            B: !0
        }, c => gh(c.objectStore("coldConfigStore").index("coldTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.cursor.value
        }));
        return b
    })
}

function Nh(a) {
    return r(function*() {
        let b = void 0;
        yield X(yield Jh(a), ["hotConfigStore"], {
            mode: "readwrite",
            B: !0
        }, c => gh(c.objectStore("hotConfigStore").index("hotTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.cursor.value
        }));
        return b
    })
};
var Oh = class extends Pa {
    constructor() {
        super();
        this.j = [];
        this.h = [];
        const a = u("yt.gcf.config.hotUpdateCallbacks");
        a ? (this.j = [...a], this.h = a) : (this.h = [], w("yt.gcf.config.hotUpdateCallbacks", this.h))
    }
    m() {
        for (const b of this.j) {
            var a = this.h;
            const c = a.indexOf(b);
            c >= 0 && a.splice(c, 1)
        }
        this.j.length = 0;
        super.m()
    }
};

function Ph(a, b, c) {
    return r(function*() {
        if (S("start_client_gcf")) {
            c && (a.j = c, w("yt.gcf.config.hotConfigGroup", a.j || null));
            a.hotHashData = b;
            w("yt.gcf.config.hotHashData", a.hotHashData || null);
            var d = xh();
            if (d) {
                if (!c) {
                    var e;
                    c = (e = yield Nh(d)) == null ? void 0 : e.config
                }
                yield Kh(c, b, d)
            }
            if (c) {
                d = a.i;
                e = c;
                for (const f of d.h) f(e)
            }
        }
    })
}

function Qh(a, b, c) {
    return r(function*() {
        if (S("start_client_gcf")) {
            a.coldHashData = b;
            w("yt.gcf.config.coldHashData", a.coldHashData || null);
            const d = xh();
            if (d) {
                if (!c) {
                    let e;
                    c = (e = yield Mh(d)) == null ? void 0 : e.config
                }
                c && (yield Lh(c, b, c.configData, d))
            }
        }
    })
}
var Rh = class {
    constructor() {
        this.h = 0;
        this.i = new Oh
    }
};

function Sh() {
    return "INNERTUBE_API_KEY" in xf && "INNERTUBE_API_VERSION" in xf
}

function Th() {
    return {
        innertubeApiKey: Q("INNERTUBE_API_KEY"),
        innertubeApiVersion: Q("INNERTUBE_API_VERSION"),
        Y: Q("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
        Aa: Q("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
        Ba: Q("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
        innertubeContextClientVersion: Q("INNERTUBE_CONTEXT_CLIENT_VERSION"),
        ja: Q("INNERTUBE_CONTEXT_HL"),
        ia: Q("INNERTUBE_CONTEXT_GL"),
        Ca: Q("INNERTUBE_HOST_OVERRIDE") || "",
        Ea: !!Q("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
        Da: !!Q("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
        appInstallData: Q("SERIALIZED_CLIENT_CONFIG_DATA")
    }
}

function Uh(a) {
    const b = {
        client: {
            hl: a.ja,
            gl: a.ia,
            clientName: a.Aa,
            clientVersion: a.innertubeContextClientVersion,
            configInfo: a.Y
        }
    };
    navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
    var c = t.devicePixelRatio;
    c && c != 1 && (b.client.screenDensityFloat = String(c));
    c = Of();
    c !== "" && (b.client.experimentsToken = c);
    c = Pf();
    c.length > 0 && (b.request = {
        internalExperimentFlags: c
    });
    Vh(void 0, b);
    Wh(a, void 0, b);
    S("start_client_gcf") && Xh(void 0, b);
    Q("DELEGATED_SESSION_ID") && !S("pageid_as_header_web") && (b.user = {
        onBehalfOfUser: Q("DELEGATED_SESSION_ID")
    });
    !S("fill_delegate_context_in_gel_killswitch") && (a = Q("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT")) && (b.user = Object.assign({}, b.user, {
        serializedDelegationContext: a
    }));
    a = Object;
    c = a.assign;
    var d = b.client,
        e = Q("DEVICE", "");
    const f = {};
    for (const [g, k] of Object.entries(Hf(e))) {
        e = g;
        const h = k;
        e === "cbrand" ? f.deviceMake = h : e === "cmodel" ? f.deviceModel = h : e === "cbr" ? f.browserName = h : e === "cbrver" ? f.browserVersion = h : e === "cos" ? f.osName = h : e === "cosver" ? f.osVersion = h : e === "cplatform" &&
            (f.platform = h)
    }
    b.client = c.call(a, d, f);
    return b
}

function Vh(a, b) {
    const c = u("yt.embedded_player.embed_url");
    c && (a ? (b = ud(a, Te, 7) || new Te, J(b, 4, c), I(a, Te, 7, b)) : b && (b.thirdParty = {
        embedUrl: c
    }))
}

function Wh(a, b, c) {
    if (a.appInstallData)
        if (b) {
            let d;
            c = (d = ud(b, Ne, 62)) != null ? d : new Ne;
            J(c, 6, a.appInstallData);
            I(b, Ne, 62, c)
        } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData)
}

function Yh(a, b, c = {}) {
    let d = {};
    Q("EOM_VISITOR_DATA") ? d = {
        "X-Goog-EOM-Visitor-Id": Q("EOM_VISITOR_DATA")
    } : d = {
        "X-Goog-Visitor-Id": c.visitorData || Q("VISITOR_DATA", "")
    };
    if (b && b.includes("www.youtube-nocookie.com")) return d;
    b = c.ob || Q("AUTHORIZATION");
    b || (a ? b = `Bearer ${u("gapi.auth.getToken")().nb}` : (a = ig(gg()), S("pageid_as_header_web") || delete a["X-Goog-PageId"], d = Object.assign({}, d, a)));
    b && (d.Authorization = b);
    return d
}

function Xh(a, b) {
    if (!Rh.h) {
        var c = new Rh;
        Rh.h = c
    }
    c = Rh.h;
    var d = W() - c.h;
    if (c.h !== 0 && d < T("send_config_hash_timer")) c = void 0;
    else {
        d = u("yt.gcf.config.coldConfigData");
        var e = u("yt.gcf.config.hotHashData"),
            f = u("yt.gcf.config.coldHashData");
        d && e && f && (c.h = W());
        c = {
            coldConfigData: d,
            hotHashData: e,
            coldHashData: f
        }
    }
    if (d = c)
        if (e = d.coldConfigData, c = d.coldHashData, d = d.hotHashData, a) {
            var g;
            b = (g = ud(a, Ne, 62)) != null ? g : new Ne;
            g = J(b, 1, e);
            g = J(g, 3, c);
            J(g, 5, d);
            I(a, Ne, 62, b)
        } else b && (b.client.configInfo = b.client.configInfo || {},
            e && (b.client.configInfo.coldConfigData = e), c && (b.client.configInfo.coldHashData = c), d && (b.client.configInfo.hotHashData = d))
};
typeof TextEncoder !== "undefined" && new TextEncoder;

function Zh(a) {
    this.version = 1;
    this.args = a
};

function $h() {
    var a = ai;
    this.topic = "screen-created";
    this.h = a
}
$h.prototype.toString = function() {
    return this.topic
};
const bi = u("ytPubsub2Pubsub2Instance") || new L;
L.prototype.subscribe = L.prototype.J;
L.prototype.unsubscribeByKey = L.prototype.C;
L.prototype.publish = L.prototype.A;
L.prototype.clear = L.prototype.clear;
w("ytPubsub2Pubsub2Instance", bi);
const ci = u("ytPubsub2Pubsub2SubscribedKeys") || {};
w("ytPubsub2Pubsub2SubscribedKeys", ci);
const di = u("ytPubsub2Pubsub2TopicToKeys") || {};
w("ytPubsub2Pubsub2TopicToKeys", di);
const ei = u("ytPubsub2Pubsub2IsAsync") || {};
w("ytPubsub2Pubsub2IsAsync", ei);
w("ytPubsub2Pubsub2SkipSubKey", null);

function fi(a, b) {
    const c = gi();
    c && c.publish.call(c, a.toString(), a, b)
}

function hi(a) {
    var b = ii;
    const c = gi();
    if (!c) return 0;
    const d = c.subscribe(b.toString(), (e, f) => {
        var g = u("ytPubsub2Pubsub2SkipSubKey");
        g && g == d || (g = () => {
            if (ci[d]) try {
                if (f && b instanceof $h && b != e) try {
                    var k = b.h,
                        h = f;
                    if (!h.args || !h.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
                    try {
                        if (!k.ma) {
                            const m = new k;
                            k.ma = m.version
                        }
                        var l = k.ma
                    } catch (m) {}
                    if (!l || h.version != l) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
                    try {
                        l = Reflect;
                        var n = l.construct; {
                            var p = h.args;
                            const m = p.length;
                            if (m > 0) {
                                const v = Array(m);
                                for (h = 0; h < m; h++) v[h] = p[h];
                                var q = v
                            } else q = []
                        }
                        f = n.call(l, k, q)
                    } catch (m) {
                        throw m.message = "yt.pubsub2.Data.deserialize(): " + m.message, m;
                    }
                } catch (m) {
                    throw m.message = "yt.pubsub2.pubsub2 cross-binary conversion error for " + b.toString() + ": " + m.message, m;
                }
                a.call(window, f)
            } catch (m) {
                Af(m)
            }
        }, ei[b.toString()] ? u("yt.scheduler.instance") ? sg.h(g) : Kf(g, 0) : g())
    });
    ci[d] = !0;
    di[b.toString()] || (di[b.toString()] = []);
    di[b.toString()].push(d);
    return d
}

function ji() {
    var a = ki;
    const b = hi(function(c) {
        a.apply(void 0, arguments);
        li(b)
    });
    return b
}

function li(a) {
    const b = gi();
    b && (typeof a === "number" && (a = [a]), wa(a, c => {
        b.unsubscribeByKey(c);
        delete ci[c]
    }))
}

function gi() {
    return u("ytPubsub2Pubsub2Instance")
};
let mi = void 0,
    ni = void 0;
var oi = {
    accountStateChangeSignedIn: 23,
    accountStateChangeSignedOut: 24,
    delayedEventMetricCaptured: 11,
    latencyActionBaselined: 6,
    latencyActionInfo: 7,
    latencyActionTicked: 5,
    offlineTransferStatusChanged: 2,
    offlineImageDownload: 335,
    playbackStartStateChanged: 9,
    systemHealthCaptured: 3,
    mangoOnboardingCompleted: 10,
    mangoPushNotificationReceived: 230,
    mangoUnforkDbMigrationError: 121,
    mangoUnforkDbMigrationSummary: 122,
    mangoUnforkDbMigrationPreunforkDbVersionNumber: 133,
    mangoUnforkDbMigrationPhoneMetadata: 134,
    mangoUnforkDbMigrationPhoneStorage: 135,
    mangoUnforkDbMigrationStep: 142,
    mangoAsyncApiMigrationEvent: 223,
    mangoDownloadVideoResult: 224,
    mangoHomepageVideoCount: 279,
    mangoHomeV3State: 295,
    mangoImageClientCacheHitEvent: 273,
    sdCardStatusChanged: 98,
    framesDropped: 12,
    thumbnailHovered: 13,
    deviceRetentionInfoCaptured: 14,
    thumbnailLoaded: 15,
    backToAppEvent: 318,
    streamingStatsCaptured: 17,
    offlineVideoShared: 19,
    appCrashed: 20,
    youThere: 21,
    offlineStateSnapshot: 22,
    mdxSessionStarted: 25,
    mdxSessionConnected: 26,
    mdxSessionDisconnected: 27,
    bedrockResourceConsumptionSnapshot: 28,
    nextGenWatchWatchSwiped: 29,
    kidsAccountsSnapshot: 30,
    zeroStepChannelCreated: 31,
    tvhtml5SearchCompleted: 32,
    offlineSharePairing: 34,
    offlineShareUnlock: 35,
    mdxRouteDistributionSnapshot: 36,
    bedrockRepetitiveActionTimed: 37,
    unpluggedDegradationInfo: 229,
    uploadMp4HeaderMoved: 38,
    uploadVideoTranscoded: 39,
    uploadProcessorStarted: 46,
    uploadProcessorEnded: 47,
    uploadProcessorReady: 94,
    uploadProcessorRequirementPending: 95,
    uploadProcessorInterrupted: 96,
    uploadFrontendEvent: 241,
    assetPackDownloadStarted: 41,
    assetPackDownloaded: 42,
    assetPackApplied: 43,
    assetPackDeleted: 44,
    appInstallAttributionEvent: 459,
    playbackSessionStopped: 45,
    adBlockerMessagingShown: 48,
    distributionChannelCaptured: 49,
    dataPlanCpidRequested: 51,
    detailedNetworkTypeCaptured: 52,
    sendStateUpdated: 53,
    receiveStateUpdated: 54,
    sendDebugStateUpdated: 55,
    receiveDebugStateUpdated: 56,
    kidsErrored: 57,
    mdxMsnSessionStatsFinished: 58,
    appSettingsCaptured: 59,
    mdxWebSocketServerHttpError: 60,
    mdxWebSocketServer: 61,
    startupCrashesDetected: 62,
    coldStartInfo: 435,
    offlinePlaybackStarted: 63,
    liveChatMessageSent: 225,
    liveChatUserPresent: 434,
    liveChatBeingModerated: 457,
    liveCreationCameraUpdated: 64,
    liveCreationEncodingCaptured: 65,
    liveCreationError: 66,
    liveCreationHealthUpdated: 67,
    liveCreationVideoEffectsCaptured: 68,
    liveCreationStageOccured: 75,
    liveCreationBroadcastScheduled: 123,
    liveCreationArchiveReplacement: 149,
    liveCreationCostreamingConnection: 421,
    liveCreationStreamWebrtcStats: 288,
    mdxSessionRecoveryStarted: 69,
    mdxSessionRecoveryCompleted: 70,
    mdxSessionRecoveryStopped: 71,
    visualElementShown: 72,
    visualElementHidden: 73,
    visualElementGestured: 78,
    visualElementStateChanged: 208,
    screenCreated: 156,
    playbackAssociated: 202,
    visualElementAttached: 215,
    playbackContextEvent: 214,
    cloudCastingPlaybackStarted: 74,
    webPlayerApiCalled: 76,
    tvhtml5AccountDialogOpened: 79,
    foregroundHeartbeat: 80,
    foregroundHeartbeatScreenAssociated: 111,
    kidsOfflineSnapshot: 81,
    mdxEncryptionSessionStatsFinished: 82,
    playerRequestCompleted: 83,
    liteSchedulerStatistics: 84,
    mdxSignIn: 85,
    spacecastMetadataLookupRequested: 86,
    spacecastBatchLookupRequested: 87,
    spacecastSummaryRequested: 88,
    spacecastPlayback: 89,
    spacecastDiscovery: 90,
    tvhtml5LaunchUrlComponentChanged: 91,
    mdxBackgroundPlaybackRequestCompleted: 92,
    mdxBrokenAdditionalDataDeviceDetected: 93,
    tvhtml5LocalStorage: 97,
    tvhtml5DeviceStorageStatus: 147,
    autoCaptionsAvailable: 99,
    playbackScrubbingEvent: 339,
    flexyState: 100,
    interfaceOrientationCaptured: 101,
    mainAppBrowseFragmentCache: 102,
    offlineCacheVerificationFailure: 103,
    offlinePlaybackExceptionDigest: 217,
    vrCopresenceStats: 104,
    vrCopresenceSyncStats: 130,
    vrCopresenceCommsStats: 137,
    vrCopresencePartyStats: 153,
    vrCopresenceEmojiStats: 213,
    vrCopresenceEvent: 141,
    vrCopresenceFlowTransitEvent: 160,
    vrCowatchPartyEvent: 492,
    vrCowatchUserStartOrJoinEvent: 504,
    vrPlaybackEvent: 345,
    kidsAgeGateTracking: 105,
    offlineDelayAllowedTracking: 106,
    mainAppAutoOfflineState: 107,
    videoAsThumbnailDownload: 108,
    videoAsThumbnailPlayback: 109,
    liteShowMore: 110,
    renderingError: 118,
    kidsProfilePinGateTracking: 119,
    abrTrajectory: 124,
    scrollEvent: 125,
    streamzIncremented: 126,
    kidsProfileSwitcherTracking: 127,
    kidsProfileCreationTracking: 129,
    buyFlowStarted: 136,
    mbsConnectionInitiated: 138,
    mbsPlaybackInitiated: 139,
    mbsLoadChildren: 140,
    liteProfileFetcher: 144,
    mdxRemoteTransaction: 146,
    reelPlaybackError: 148,
    reachabilityDetectionEvent: 150,
    mobilePlaybackEvent: 151,
    courtsidePlayerStateChanged: 152,
    musicPersistentCacheChecked: 154,
    musicPersistentCacheCleared: 155,
    playbackInterrupted: 157,
    playbackInterruptionResolved: 158,
    fixFopFlow: 159,
    anrDetection: 161,
    backstagePostCreationFlowEnded: 162,
    clientError: 163,
    gamingAccountLinkStatusChanged: 164,
    liteHousewarming: 165,
    buyFlowEvent: 167,
    kidsParentalGateTracking: 168,
    kidsSignedOutSettingsStatus: 437,
    kidsSignedOutPauseHistoryFixStatus: 438,
    tvhtml5WatchdogViolation: 444,
    ypcUpgradeFlow: 169,
    yongleStudy: 170,
    ypcUpdateFlowStarted: 171,
    ypcUpdateFlowCancelled: 172,
    ypcUpdateFlowSucceeded: 173,
    ypcUpdateFlowFailed: 174,
    liteGrowthkitPromo: 175,
    paymentFlowStarted: 341,
    transactionFlowShowPaymentDialog: 405,
    transactionFlowStarted: 176,
    transactionFlowSecondaryDeviceStarted: 222,
    transactionFlowSecondaryDeviceSignedOutStarted: 383,
    transactionFlowCancelled: 177,
    transactionFlowPaymentCallBackReceived: 387,
    transactionFlowPaymentSubmitted: 460,
    transactionFlowPaymentSucceeded: 329,
    transactionFlowSucceeded: 178,
    transactionFlowFailed: 179,
    transactionFlowPlayBillingConnectionStartEvent: 428,
    transactionFlowSecondaryDeviceSuccess: 458,
    transactionFlowErrorEvent: 411,
    liteVideoQualityChanged: 180,
    watchBreakEnablementSettingEvent: 181,
    watchBreakFrequencySettingEvent: 182,
    videoEffectsCameraPerformanceMetrics: 183,
    adNotify: 184,
    startupTelemetry: 185,
    playbackOfflineFallbackUsed: 186,
    outOfMemory: 187,
    ypcPauseFlowStarted: 188,
    ypcPauseFlowCancelled: 189,
    ypcPauseFlowSucceeded: 190,
    ypcPauseFlowFailed: 191,
    uploadFileSelected: 192,
    ypcResumeFlowStarted: 193,
    ypcResumeFlowCancelled: 194,
    ypcResumeFlowSucceeded: 195,
    ypcResumeFlowFailed: 196,
    adsClientStateChange: 197,
    ypcCancelFlowStarted: 198,
    ypcCancelFlowCancelled: 199,
    ypcCancelFlowSucceeded: 200,
    ypcCancelFlowFailed: 201,
    ypcCancelFlowGoToPaymentProcessor: 402,
    ypcDeactivateFlowStarted: 320,
    ypcRedeemFlowStarted: 203,
    ypcRedeemFlowCancelled: 204,
    ypcRedeemFlowSucceeded: 205,
    ypcRedeemFlowFailed: 206,
    ypcFamilyCreateFlowStarted: 258,
    ypcFamilyCreateFlowCancelled: 259,
    ypcFamilyCreateFlowSucceeded: 260,
    ypcFamilyCreateFlowFailed: 261,
    ypcFamilyManageFlowStarted: 262,
    ypcFamilyManageFlowCancelled: 263,
    ypcFamilyManageFlowSucceeded: 264,
    ypcFamilyManageFlowFailed: 265,
    restoreContextEvent: 207,
    embedsAdEvent: 327,
    autoplayTriggered: 209,
    clientDataErrorEvent: 210,
    experimentalVssValidation: 211,
    tvhtml5TriggeredEvent: 212,
    tvhtml5FrameworksFieldTrialResult: 216,
    tvhtml5FrameworksFieldTrialStart: 220,
    musicOfflinePreferences: 218,
    watchTimeSegment: 219,
    appWidthLayoutError: 221,
    accountRegistryChange: 226,
    userMentionAutoCompleteBoxEvent: 227,
    downloadRecommendationEnablementSettingEvent: 228,
    musicPlaybackContentModeChangeEvent: 231,
    offlineDbOpenCompleted: 232,
    kidsFlowEvent: 233,
    kidsFlowCorpusSelectedEvent: 234,
    videoEffectsEvent: 235,
    unpluggedOpsEogAnalyticsEvent: 236,
    playbackAudioRouteEvent: 237,
    interactionLoggingDebugModeError: 238,
    offlineYtbRefreshed: 239,
    kidsFlowError: 240,
    musicAutoplayOnLaunchAttempted: 242,
    deviceContextActivityEvent: 243,
    deviceContextEvent: 244,
    templateResolutionException: 245,
    musicSideloadedPlaylistServiceCalled: 246,
    embedsStorageAccessNotChecked: 247,
    embedsHasStorageAccessResult: 248,
    embedsItpPlayedOnReload: 249,
    embedsRequestStorageAccessResult: 250,
    embedsShouldRequestStorageAccessResult: 251,
    embedsRequestStorageAccessState: 256,
    embedsRequestStorageAccessFailedState: 257,
    embedsItpWatchLaterResult: 266,
    searchSuggestDecodingPayloadFailure: 252,
    siriShortcutActivated: 253,
    tvhtml5KeyboardPerformance: 254,
    latencyActionSpan: 255,
    elementsLog: 267,
    ytbFileOpened: 268,
    tfliteModelError: 269,
    apiTest: 270,
    yongleUsbSetup: 271,
    touStrikeInterstitialEvent: 272,
    liteStreamToSave: 274,
    appBundleClientEvent: 275,
    ytbFileCreationFailed: 276,
    adNotifyFailure: 278,
    ytbTransferFailed: 280,
    blockingRequestFailed: 281,
    liteAccountSelector: 282,
    liteAccountUiCallbacks: 283,
    dummyPayload: 284,
    browseResponseValidationEvent: 285,
    entitiesError: 286,
    musicIosBackgroundFetch: 287,
    mdxNotificationEvent: 289,
    layersValidationError: 290,
    musicPwaInstalled: 291,
    liteAccountCleanup: 292,
    html5PlayerHealthEvent: 293,
    watchRestoreAttempt: 294,
    liteAccountSignIn: 296,
    notaireEvent: 298,
    kidsVoiceSearchEvent: 299,
    adNotifyFilled: 300,
    delayedEventDropped: 301,
    analyticsSearchEvent: 302,
    systemDarkThemeOptOutEvent: 303,
    flowEvent: 304,
    networkConnectivityBaselineEvent: 305,
    ytbFileImported: 306,
    downloadStreamUrlExpired: 307,
    directSignInEvent: 308,
    lyricImpressionEvent: 309,
    accessibilityStateEvent: 310,
    tokenRefreshEvent: 311,
    genericAttestationExecution: 312,
    tvhtml5VideoSeek: 313,
    unpluggedAutoPause: 314,
    scrubbingEvent: 315,
    bedtimeReminderEvent: 317,
    tvhtml5UnexpectedRestart: 319,
    tvhtml5StabilityTraceEvent: 478,
    tvhtml5OperationHealth: 467,
    tvhtml5WatchKeyEvent: 321,
    voiceLanguageChanged: 322,
    tvhtml5LiveChatStatus: 323,
    parentToolsCorpusSelectedEvent: 324,
    offerAdsEnrollmentInitiated: 325,
    networkQualityIntervalEvent: 326,
    deviceStartupMetrics: 328,
    heartbeatActionPlayerTransitioned: 330,
    tvhtml5Lifecycle: 331,
    heartbeatActionPlayerHalted: 332,
    adaptiveInlineMutedSettingEvent: 333,
    mainAppLibraryLoadingState: 334,
    thirdPartyLogMonitoringEvent: 336,
    appShellAssetLoadReport: 337,
    tvhtml5AndroidAttestation: 338,
    tvhtml5StartupSoundEvent: 340,
    iosBackgroundRefreshTask: 342,
    iosBackgroundProcessingTask: 343,
    sliEventBatch: 344,
    postImpressionEvent: 346,
    musicSideloadedPlaylistExport: 347,
    idbUnexpectedlyClosed: 348,
    voiceSearchEvent: 349,
    mdxSessionCastEvent: 350,
    idbQuotaExceeded: 351,
    idbTransactionEnded: 352,
    idbTransactionAborted: 353,
    tvhtml5KeyboardLogging: 354,
    idbIsSupportedCompleted: 355,
    creatorStudioMobileEvent: 356,
    idbDataCorrupted: 357,
    parentToolsAppChosenEvent: 358,
    webViewBottomSheetResized: 359,
    activeStateControllerScrollPerformanceSummary: 360,
    navigatorValidation: 361,
    mdxSessionHeartbeat: 362,
    clientHintsPolyfillDiagnostics: 363,
    clientHintsPolyfillEvent: 364,
    proofOfOriginTokenError: 365,
    kidsAddedAccountSummary: 366,
    musicWearableDevice: 367,
    ypcRefundFlowEvent: 368,
    tvhtml5PlaybackMeasurementEvent: 369,
    tvhtml5WatermarkMeasurementEvent: 370,
    clientExpGcfPropagationEvent: 371,
    mainAppReferrerIntent: 372,
    leaderLockEnded: 373,
    leaderLockAcquired: 374,
    googleHatsEvent: 375,
    persistentLensLaunchEvent: 376,
    parentToolsChildWelcomeChosenEvent: 378,
    browseThumbnailPreloadEvent: 379,
    finalPayload: 380,
    mdxDialAdditionalDataUpdateEvent: 381,
    webOrchestrationTaskLifecycleRecord: 382,
    startupSignalEvent: 384,
    accountError: 385,
    gmsDeviceCheckEvent: 386,
    accountSelectorEvent: 388,
    accountUiCallbacks: 389,
    mdxDialAdditionalDataProbeEvent: 390,
    downloadsSearchIcingApiStats: 391,
    downloadsSearchIndexUpdatedEvent: 397,
    downloadsSearchIndexSnapshot: 398,
    dataPushClientEvent: 392,
    kidsCategorySelectedEvent: 393,
    mdxDeviceManagementSnapshotEvent: 394,
    prefetchRequested: 395,
    prefetchableCommandExecuted: 396,
    gelDebuggingEvent: 399,
    webLinkTtsPlayEnd: 400,
    clipViewInvalid: 401,
    persistentStorageStateChecked: 403,
    cacheWipeoutEvent: 404,
    playerEvent: 410,
    sfvEffectPipelineStartedEvent: 412,
    sfvEffectPipelinePausedEvent: 429,
    sfvEffectPipelineEndedEvent: 413,
    sfvEffectChosenEvent: 414,
    sfvEffectLoadedEvent: 415,
    sfvEffectUserInteractionEvent: 465,
    sfvEffectFirstFrameProcessedLatencyEvent: 416,
    sfvEffectAggregatedFramesProcessedLatencyEvent: 417,
    sfvEffectAggregatedFramesDroppedEvent: 418,
    sfvEffectPipelineErrorEvent: 430,
    sfvEffectGraphFrozenEvent: 419,
    sfvEffectGlThreadBlockedEvent: 420,
    mdeVideoChangedEvent: 442,
    mdePlayerPerformanceMetrics: 472,
    mdeExporterEvent: 497,
    genericClientExperimentEvent: 423,
    homePreloadTaskScheduled: 424,
    homePreloadTaskExecuted: 425,
    homePreloadCacheHit: 426,
    polymerPropertyChangedInObserver: 427,
    applicationStarted: 431,
    networkCronetRttBatch: 432,
    networkCronetRttSummary: 433,
    repeatChapterLoopEvent: 436,
    seekCancellationEvent: 462,
    lockModeTimeoutEvent: 483,
    externalVideoShareToYoutubeAttempt: 501,
    parentCodeEvent: 502,
    offlineTransferStarted: 4,
    musicOfflineMixtapePreferencesChanged: 16,
    mangoDailyNewVideosNotificationAttempt: 40,
    mangoDailyNewVideosNotificationError: 77,
    dtwsPlaybackStarted: 112,
    dtwsTileFetchStarted: 113,
    dtwsTileFetchCompleted: 114,
    dtwsTileFetchStatusChanged: 145,
    dtwsKeyframeDecoderBufferSent: 115,
    dtwsTileUnderflowedOnNonkeyframe: 116,
    dtwsBackfillFetchStatusChanged: 143,
    dtwsBackfillUnderflowed: 117,
    dtwsAdaptiveLevelChanged: 128,
    blockingVisitorIdTimeout: 277,
    liteSocial: 18,
    mobileJsInvocation: 297,
    biscottiBasedDetection: 439,
    coWatchStateChange: 440,
    embedsVideoDataDidChange: 441,
    shortsFirst: 443,
    cruiseControlEvent: 445,
    qoeClientLoggingContext: 446,
    atvRecommendationJobExecuted: 447,
    tvhtml5UserFeedback: 448,
    producerProjectCreated: 449,
    producerProjectOpened: 450,
    producerProjectDeleted: 451,
    producerProjectElementAdded: 453,
    producerProjectElementRemoved: 454,
    tvhtml5ShowClockEvent: 455,
    deviceCapabilityCheckMetrics: 456,
    youtubeClearcutEvent: 461,
    offlineBrowseFallbackEvent: 463,
    getCtvTokenEvent: 464,
    startupDroppedFramesSummary: 466,
    screenshotEvent: 468,
    miniAppPlayEvent: 469,
    elementsDebugCounters: 470,
    fontLoadEvent: 471,
    webKillswitchReceived: 473,
    webKillswitchExecuted: 474,
    cameraOpenEvent: 475,
    manualSmoothnessMeasurement: 476,
    tvhtml5AppQualityEvent: 477,
    polymerPropertyAccessEvent: 479,
    miniAppSdkUsage: 480,
    cobaltTelemetryEvent: 481,
    crossDevicePlayback: 482,
    channelCreatedWithObakeImage: 484,
    channelEditedWithObakeImage: 485,
    offlineDeleteEvent: 486,
    crossDeviceNotificationTransfer: 487,
    androidIntentEvent: 488,
    unpluggedAmbientInterludesCounterfactualEvent: 489,
    keyPlaysPlayback: 490,
    shortsCreationFallbackEvent: 493,
    vssData: 491,
    castMatch: 494,
    miniAppPerformanceMetrics: 495,
    userFeedbackEvent: 496,
    kidsGuestSessionMismatch: 498,
    musicSideloadedPlaylistMigrationEvent: 499,
    sleepTimerSessionFinishEvent: 500,
    watchEpPromoConflict: 503
};
const pi = ["client.name", "client.version"];

function qi(a) {
    if (!a.errorMetadata || !a.errorMetadata.kvPairs) return a;
    a.errorMetadata.kvPairs = a.errorMetadata.kvPairs.filter(b => b.key ? pi.includes(b.key) : !1);
    return a
};
var ri = Hh("ServiceWorkerLogsDatabase", {
    L: {
        SWHealthLog: {
            K: 1
        }
    },
    shared: !0,
    upgrade: (a, b) => {
        b(1) && Wg(a, "SWHealthLog", {
            keyPath: "id",
            autoIncrement: !0
        }).h.createIndex("swHealthNewRequest", ["interface", "timestamp"], {
            unique: !1
        })
    },
    version: 1
});

function si(a, b) {
    return r(function*() {
        var c = yield oh(ri(), b), d = Q("INNERTUBE_CONTEXT_CLIENT_NAME", 0);
        const e = Object.assign({}, a);
        e.clientError && (e.clientError = qi(e.clientError));
        e.interface = d;
        return Yg(c, "SWHealthLog", e)
    })
};
w("ytNetworklessLoggingInitializationOptions", t.ytNetworklessLoggingInitializationOptions || {
    isNwlInitialized: !1
});

function ti(a, b, c, d) {
    !Q("VISITOR_DATA") && b !== "visitor_id" && Math.random() < .01 && Bf(new jf("Missing VISITOR_DATA when sending innertube request.", b, c, d));
    if (!a.isReady()) throw a = new jf("innertube xhrclient not ready", b, c, d), Af(a), a;
    c = {
        headers: d.headers || {},
        method: "POST",
        postParams: c,
        postBody: d.postBody,
        postBodyFormat: d.postBodyFormat || "JSON",
        onTimeout: () => {
            d.onTimeout()
        },
        onFetchTimeout: d.onTimeout,
        onSuccess: (h, l) => {
            if (d.onSuccess) d.onSuccess(l)
        },
        onFetchSuccess: h => {
            if (d.onSuccess) d.onSuccess(h)
        },
        onError: (h, l) => {
            if (d.onError) d.onError(l)
        },
        onFetchError: h => {
            if (d.onError) d.onError(h)
        },
        timeout: d.timeout,
        withCredentials: !0,
        compress: d.compress
    };
    c.headers["Content-Type"] || (c.headers["Content-Type"] = "application/json");
    let e = "";
    var f = a.config_.Ca;
    f && (e = f);
    var g = a.config_.Ea || !1;
    f = Yh(g, e, d);
    Object.assign(c.headers, f);
    (f = c.headers.Authorization) && !e && g && (c.headers["x-origin"] = window.location.origin);
    b = `/${"youtubei"}/${a.config_.innertubeApiVersion}/${b}`;
    g = {
        alt: "json"
    };
    let k = a.config_.Da && f;
    k = k && f.startsWith("Bearer");
    k || (g.key = a.config_.innertubeApiKey);
    a = If(`${e}${b}`, g || {}, !0);
    try {
        Rf(a,
            c)
    } catch (h) {
        if (h.name === "InvalidAccessError") Bf(Error("An extension is blocking network request."));
        else throw h;
    }
}
var ui = class {
    constructor(a) {
        this.config_ = null;
        a ? this.config_ = a : Sh() && (this.config_ = Th())
    }
    isReady() {
        !this.config_ && Sh() && (this.config_ = Th());
        return !!this.config_
    }
};
let vi = 0;
w("ytDomDomGetNextId", u("ytDomDomGetNextId") || (() => ++vi));
w("ytEventsEventsListeners", t.ytEventsEventsListeners || {});
w("ytEventsEventsCounter", t.ytEventsEventsCounter || {
    count: 0
});
t.ytPubsubPubsubInstance || new L;
var wi = Symbol("injectionDeps"),
    xi = class {
        constructor() {
            this.name = "INNERTUBE_TRANSPORT_TOKEN"
        }
        toString() {
            return `InjectionToken(${this.name})`
        }
    },
    yi = class {
        constructor() {
            this.key = Rh
        }
    };

function zi(a) {
    var b = {
        ba: Ai,
        la: Bi.h
    };
    a.i.set(b.ba, b);
    const c = a.j.get(b.ba);
    if (c) try {
        c.Gb(a.resolve(b.ba))
    } catch (d) {
        c.Cb(d)
    }
}

function Ci(a, b, c, d = !1) {
    if (c.indexOf(b) > -1) throw Error(`Deps cycle for: ${b}`);
    if (a.h.has(b)) return a.h.get(b);
    if (!a.i.has(b)) {
        if (d) return;
        throw Error(`No provider for: ${b}`);
    }
    d = a.i.get(b);
    c.push(b);
    if (d.la !== void 0) var e = d.la;
    else if (d.Na) e = d[wi] ? Di(a, d[wi], c) : [], e = d.Na(...e);
    else if (d.Ma) {
        e = d.Ma;
        const f = e[wi] ? Di(a, e[wi], c) : [];
        e = new e(...f)
    } else throw Error(`Could not resolve providers for: ${b}`);
    c.pop();
    d.Nb || a.h.set(b, e);
    return e
}

function Di(a, b, c) {
    return b ? b.map(d => d instanceof yi ? Ci(a, d.key, c, !0) : Ci(a, d, c)) : []
}
var Ei = class {
    constructor() {
        this.i = new Map;
        this.j = new Map;
        this.h = new Map
    }
    resolve(a) {
        return a instanceof yi ? Ci(this, a.key, [], !0) : Ci(this, a, [])
    }
};
let Fi;

function Gi() {
    Fi || (Fi = new Ei);
    return Fi
};
let Hi = window;

function Ii() {
    let a, b;
    return "h5vcc" in Hi && ((a = Hi.h5vcc.traceEvent) == null ? 0 : a.traceBegin) && ((b = Hi.h5vcc.traceEvent) == null ? 0 : b.traceEnd) ? 1 : "performance" in Hi && Hi.performance.mark && Hi.performance.measure ? 2 : 0
}

function Ji(a) {
    const b = Ii();
    switch (b) {
        case 1:
            Hi.h5vcc.traceEvent.traceBegin("YTLR", a);
            break;
        case 2:
            Hi.performance.mark(`${a}-start`);
            break;
        case 0:
            break;
        default:
            Ea(b, "unknown trace type")
    }
}

function Ki(a) {
    var b = Ii();
    switch (b) {
        case 1:
            Hi.h5vcc.traceEvent.traceEnd("YTLR", a);
            break;
        case 2:
            b = `${a}-start`;
            const c = `${a}-end`;
            Hi.performance.mark(c);
            Hi.performance.measure(a, b, c);
            break;
        case 0:
            break;
        default:
            Ea(b, "unknown trace type")
    }
};
var Li = S("web_enable_lifecycle_monitoring") && Ii() !== 0,
    Mi = S("web_enable_lifecycle_monitoring");

function Ni(a) {
    let b;
    return (b = a.priority) != null ? b : 0
}

function Oi(a) {
    var b = Array.from(a.h.keys()).sort((c, d) => Ni(a.h[d]) - Ni(a.h[c]));
    for (const c of b) b = a.h[c], b.jobId === void 0 || b.V || (a.scheduler.P(b.jobId), ng(b.Z, 10))
}
var Pi = class {
    constructor(a) {
        this.scheduler = qg();
        this.i = new Ce;
        this.h = a;
        for (let b = 0; b < this.h.length; b++) {
            const c = this.h[b];
            a = () => {
                c.Z();
                this.h[b].V = !0;
                this.h.every(e => e.V === !0) && this.i.resolve()
            };
            const d = ng(a, Ni(c));
            this.h[b] = Object.assign({}, c, {
                Z: a,
                jobId: d
            })
        }
    }
    cancel() {
        for (const a of this.h) a.jobId === void 0 || a.V || this.scheduler.P(a.jobId), a.V = !0;
        this.i.resolve()
    }
};

function Qi(a, b, c) {
    Mi && console.groupCollapsed && console.groupEnd && (console.groupCollapsed(`[${a.constructor.name}] '${a.state}' to '${b}'`), console.log("with message: ", c), console.groupEnd())
}

function Ri(a, b) {
    const c = b.filter(e => Si(a, e) === 10),
        d = b.filter(e => Si(a, e) !== 10);
    return a.l.Lb ? (...e) => r(function*() {
        yield Ti(c, ...e);
        Ui(a, d, ...e)
    }) : (...e) => {
        Vi(c, ...e);
        Ui(a, d, ...e)
    }
}

function Si(a, b) {
    let c, d;
    return (d = (c = a.j) != null ? c : b.priority) != null ? d : 0
}

function Ti(a, ...b) {
    return r(function*() {
        qg();
        for (const c of a) {
            let d;
            og(() => {
                Wi(c.name);
                const e = c.callback(...b);
                typeof(e == null ? void 0 : e.then) === "function" ? d = e.then(() => {
                    Xi(c.name)
                }): Xi(c.name)
            });
            d && (yield d)
        }
    })
}

function Ui(a, b, ...c) {
    b = b.map(d => ({
        Z: () => {
            Wi(d.name);
            d.callback(...c);
            Xi(d.name)
        },
        priority: Si(a, d)
    }));
    b.length && (a.i = new Pi(b))
}

function Vi(a, ...b) {
    qg();
    for (const c of a) og(() => {
        Wi(c.name);
        c.callback(...b);
        Xi(c.name)
    })
}

function Wi(a) {
    Li && a && Ji(a)
}

function Xi(a) {
    Li && a && Ki(a)
}
var Yi = class {
    constructor() {
        this.state = "none";
        this.plugins = [];
        this.j = void 0;
        this.l = {};
        Li && Ji(this.state)
    }
    get currentState() {
        return this.state
    }
    install(a) {
        this.plugins.push(a);
        return this
    }
    transition(a, b) {
        Li && Ki(this.state);
        var c = this.transitions.find(d => Array.isArray(d.from) ? d.from.find(e => e === this.state && d.O === a) : d.from === this.state && d.O === a);
        if (c) {
            this.i && (Oi(this.i), this.i = void 0);
            Qi(this, a, b);
            this.state = a;
            Li && Ji(this.state);
            c = c.action.bind(this);
            const d = this.plugins.filter(e => e[a]).map(e => e[a]);
            c(Ri(this, d), b)
        } else throw Error(`no transition specified from ${this.state} to ${a}`);
    }
};

function Zi() {
    $i || ($i = new aj);
    return $i
}
var aj = class extends Yi {
        constructor() {
            super();
            this.h = null;
            this.j = 10;
            this.transitions = [{
                    from: "none",
                    O: "application_navigating",
                    action: this.m
                }, {
                    from: "application_navigating",
                    O: "none",
                    action: this.s
                }, {
                    from: "application_navigating",
                    O: "application_navigating",
                    action: () => {}
                },
                {
                    from: "none",
                    O: "none",
                    action: () => {}
                }
            ]
        }
        m(a, b) {
            this.h = mg(() => {
                this.currentState === "application_navigating" && this.transition("none")
            }, 5E3);
            a(b == null ? void 0 : b.event)
        }
        s(a, b) {
            this.h && (sg.P(this.h), this.h = null);
            a(b == null ? void 0 : b.event)
        }
    },
    $i;
let bj = [];
w("yt.logging.transport.getScrapedGelPayloads", function() {
    return bj
});

function cj(a, b) {
    const c = dj(b);
    if (a.h[c]) return a.h[c];
    const d = Object.keys(a.store) || [];
    if (d.length <= 1 && dj(b) === d[0]) return d;
    const e = [];
    for (let g = 0; g < d.length; g++) {
        const k = d[g].split("/");
        if (ej(b.auth, k[0])) {
            var f = b.isJspb;
            ej(f === void 0 ? "undefined" : f ? "true" : "false", k[1]) && ej(b.cttAuthInfo, k[2]) && (f = b.tier, f = f === void 0 ? "undefined" : JSON.stringify(f), ej(f, k[3]) && e.push(d[g]))
        }
    }
    return a.h[c] = e
}

function ej(a, b) {
    return a === void 0 || a === "undefined" ? !0 : a === b
}
var fj = class {
    constructor() {
        this.store = {};
        this.h = {}
    }
    storePayload(a, b) {
        a = dj(a);
        this.store[a] ? this.store[a].push(b) : (this.h = {}, this.store[a] = [b]);
        return a
    }
    smartExtractMatchingEntries(a) {
        if (!a.keys.length) return [];
        const b = cj(this, a.keys.splice(0, 1)[0]),
            c = [];
        for (let d = 0; d < b.length; d++) this.store[b[d]] && a.sizeLimit && (this.store[b[d]].length <= a.sizeLimit ? (c.push(...this.store[b[d]]), delete this.store[b[d]]) : c.push(...this.store[b[d]].splice(0, a.sizeLimit)));
        (a == null ? 0 : a.sizeLimit) && c.length < (a == null ? void 0 :
            a.sizeLimit) && (a.sizeLimit -= c.length, c.push(...this.smartExtractMatchingEntries(a)));
        return c
    }
    extractMatchingEntries(a) {
        a = cj(this, a);
        const b = [];
        for (let c = 0; c < a.length; c++) this.store[a[c]] && (b.push(...this.store[a[c]]), delete this.store[a[c]]);
        return b
    }
    getSequenceCount(a) {
        a = cj(this, a);
        let b = 0;
        for (let c = 0; c < a.length; c++) {
            let d;
            b += ((d = this.store[a[c]]) == null ? void 0 : d.length) || 0
        }
        return b
    }
};
fj.prototype.getSequenceCount = fj.prototype.getSequenceCount;
fj.prototype.extractMatchingEntries = fj.prototype.extractMatchingEntries;
fj.prototype.smartExtractMatchingEntries = fj.prototype.smartExtractMatchingEntries;
fj.prototype.storePayload = fj.prototype.storePayload;

function dj(a) {
    return [a.auth === void 0 ? "undefined" : a.auth, a.isJspb === void 0 ? "undefined" : a.isJspb, a.cttAuthInfo === void 0 ? "undefined" : a.cttAuthInfo, a.tier === void 0 ? "undefined" : a.tier].join("/")
};

function gj(a, b) {
    if (a) return a[b.name]
};
/*

 SPDX-License-Identifier: Apache-2.0
*/
const hj = T("initial_gel_batch_timeout", 2E3),
    ij = T("gel_queue_timeout_max_ms", 6E4),
    jj = Math.pow(2, 16) - 1,
    kj = T("gel_min_batch_size", 5);
let lj = void 0;
class mj {
    constructor() {
        this.l = this.h = this.i = 0;
        this.j = !1
    }
}
const nj = new mj,
    oj = new mj,
    pj = new mj,
    qj = new mj;
let rj, sj = !0,
    tj = 1;
const uj = new Map,
    vj = t.ytLoggingTransportTokensToCttTargetIds_ || {},
    wj = t.ytLoggingTransportTokensToJspbCttTargetIds_ || {};
let xj = {};

function yj() {
    let a = u("yt.logging.ims");
    a || (a = new fj, w("yt.logging.ims", a));
    return a
}

function zj(a, b) {
    if (a.endpoint === "log_event") {
        Aj();
        var c = Bj(a),
            d = Cj(a.payload) || "";
        a: {
            if (S("enable_web_tiered_gel")) {
                var e = oi[d || ""];
                var f, g;
                if (Gi().resolve(new yi) == null) var k = void 0;
                else {
                    let h;
                    k = (h = u("yt.gcf.config.hotConfigGroup")) != null ? h : Q("RAW_HOT_CONFIG_GROUP");
                    k = k == null ? void 0 : (f = k.loggingHotConfig) == null ? void 0 : (g = f.eventLoggingConfig) == null ? void 0 : g.payloadPolicies
                }
                if (f = k)
                    for (g = 0; g < f.length; g++)
                        if (f[g].payloadNumber === e) {
                            e = f[g];
                            break a
                        }
            }
            e = void 0
        }
        f = 200;
        if (e) {
            if (e.enabled === !1 && !S("web_payload_policy_disabled_killswitch")) return;
            f = Dj(e.tier);
            if (f === 400) {
                Ej(a, b);
                return
            }
        }
        xj[c] = !0;
        e = {
            cttAuthInfo: c,
            isJspb: !1,
            tier: f
        };
        yj().storePayload(e, a.payload);
        Fj(b, c, e, d === "gelDebuggingEvent")
    }
}

function Fj(a, b, c, d = !1) {
    a && (lj = new a);
    a = T("tvhtml5_logging_max_batch_ads_fork") || T("tvhtml5_logging_max_batch") || T("web_logging_max_batch") || 100;
    const e = W(),
        f = Gj(!1, c.tier),
        g = f.l;
    d && (f.j = !0);
    d = 0;
    c && (d = yj().getSequenceCount(c));
    const k = () => {
        Hj({
            writeThenSend: !0
        }, S("flush_only_full_queue") ? b : void 0, !1, c.tier)
    };
    d >= 1E3 ? k() : d >= a ? rj || (rj = Ij(() => {
        k();
        rj = void 0
    }, 0)) : e - g >= 10 && (Jj(!1, c.tier), f.l = e)
}

function Ej(a, b) {
    if (a.endpoint === "log_event") {
        Aj();
        var c = Bj(a),
            d = new Map;
        d.set(c, [a.payload]);
        var e = Cj(a.payload) || "";
        b && (lj = new b);
        return new y((f, g) => {
            lj && lj.isReady() ? Kj(d, lj, f, g, {
                bypassNetworkless: !0
            }, !0, e === "gelDebuggingEvent") : f()
        })
    }
}

function Bj(a) {
    var b = "";
    if (a.dangerousLogToVisitorSession) b = "visitorOnlyApprovedKey";
    else if (a.cttAuthInfo) {
        b = a.cttAuthInfo;
        const c = {};
        b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId);
        vj[a.cttAuthInfo.token] = c;
        b = a.cttAuthInfo.token
    }
    return b
}

function Hj(a = {}, b, c = !1, d) {
    new y((e, f) => {
        const g = Gj(c, d),
            k = g.j;
        g.j = !1;
        Lj(g.i);
        Lj(g.h);
        g.h = 0;
        lj && lj.isReady() ? d === void 0 && S("enable_web_tiered_gel") ? Mj(e, f, a, b, c, 300, k) : Mj(e, f, a, b, c, d, k) : (Jj(c, d), e())
    })
}

function Mj(a, b, c = {}, d, e = !1, f = 200, g = !1) {
    var k = lj,
        h = new Map;
    const l = new Map,
        n = {
            isJspb: e,
            cttAuthInfo: d,
            tier: f
        },
        p = {
            isJspb: e,
            cttAuthInfo: d
        };
    if (d !== void 0) e ? (b = S("enable_web_tiered_gel") ? yj().smartExtractMatchingEntries({
        keys: [n, p],
        sizeLimit: 1E3
    }) : yj().extractMatchingEntries(p), h.set(d, b), Nj(h, k, a, c, g)) : (h = S("enable_web_tiered_gel") ? yj().smartExtractMatchingEntries({
        keys: [n, p],
        sizeLimit: 1E3
    }) : yj().extractMatchingEntries(p), l.set(d, h), Kj(l, k, a, b, c, !1, g));
    else if (e) {
        for (const q of Object.keys(xj)) b = S("enable_web_tiered_gel") ?
            yj().smartExtractMatchingEntries({
                keys: [n, p],
                sizeLimit: 1E3
            }) : yj().extractMatchingEntries({
                isJspb: !0,
                cttAuthInfo: q
            }), b.length > 0 && h.set(q, b), (S("web_fp_via_jspb_and_json") && c.writeThenSend || !S("web_fp_via_jspb_and_json")) && delete xj[q];
        Nj(h, k, a, c, g)
    } else {
        for (const q of Object.keys(xj)) d = S("enable_web_tiered_gel") ? yj().smartExtractMatchingEntries({
            keys: [{
                isJspb: !1,
                cttAuthInfo: q,
                tier: f
            }, {
                isJspb: !1,
                cttAuthInfo: q
            }],
            sizeLimit: 1E3
        }) : yj().extractMatchingEntries({
            isJspb: !1,
            cttAuthInfo: q
        }), d.length > 0 && l.set(q,
            d), (S("web_fp_via_jspb_and_json") && c.writeThenSend || !S("web_fp_via_jspb_and_json")) && delete xj[q];
        Kj(l, k, a, b, c, !1, g)
    }
}

function Jj(a = !1, b = 200) {
    const c = () => {
            Hj({
                writeThenSend: !0
            }, void 0, a, b)
        },
        d = Gj(a, b);
    var e = d === qj || d === pj ? 5E3 : ij;
    S("web_gel_timeout_cap") && !d.h && (e = Ij(() => {
        c()
    }, e), d.h = e);
    Lj(d.i);
    e = Q("LOGGING_BATCH_TIMEOUT", T("web_gel_debounce_ms", 1E4));
    S("shorten_initial_gel_batch_timeout") && sj && (e = hj);
    e = Ij(() => {
        T("gel_min_batch_size") > 0 ? yj().getSequenceCount({
            cttAuthInfo: void 0,
            isJspb: a,
            tier: b
        }) >= kj && c() : c()
    }, e);
    d.i = e
}

function Kj(a, b, c, d, e = {}, f, g) {
    const k = Math.round(W());
    let h = a.size;
    const l = Oj(g);
    for (const [n, p] of a) {
        a = n;
        g = p;
        const q = Ba({
            context: Uh(b.config_ || Th())
        });
        if (!ia(g) && !S("throw_err_when_logevent_malformed_killswitch")) {
            d();
            break
        }
        q.events = g;
        (g = vj[a]) && Pj(q, a, g);
        delete vj[a];
        const m = a === "visitorOnlyApprovedKey";
        Qj(q, k, m);
        Rj(e);
        const v = A => {
            S("start_client_gcf") && sg.h(() => r(function*() {
                yield Sj(A)
            }));
            h--;
            h || c()
        };
        let z = 0;
        const C = () => {
            z++;
            if (e.bypassNetworkless && z === 1) try {
                ti(b, l, q, Tj({
                    writeThenSend: !0
                }, m, v, C, f)), sj = !1
            } catch (A) {
                Af(A), d()
            }
            h--;
            h || c()
        };
        try {
            ti(b, l, q, Tj(e, m, v, C, f)), sj = !1
        } catch (A) {
            Af(A), d()
        }
    }
}

function Nj(a, b, c, d = {}, e) {
    const f = Math.round(W()),
        g = {
            value: a.size
        };
    var k = new Map([...a]);
    for (const [C] of k) {
        var h = C,
            l = a.get(h);
        k = new bf;
        var n = b.config_ || Th(),
            p = new We,
            q = new Pe;
        J(q, 1, n.ja);
        J(q, 2, n.ia);
        Fd(q, 16, n.Ba);
        J(q, 17, n.innertubeContextClientVersion);
        if (n.Y) {
            var m = n.Y,
                v = new Ne;
            m.coldConfigData && J(v, 1, m.coldConfigData);
            m.appInstallData && J(v, 6, m.appInstallData);
            m.coldHashData && J(v, 3, m.coldHashData);
            m.hotHashData && J(v, 5, m.hotHashData);
            I(q, Ne, 62, v)
        }
        if ((m = t.devicePixelRatio) && m != 1) {
            if (m != null && typeof m !==
                "number") throw Error(`Value of float/double field must be a number, found ${typeof m}: ${m}`);
            od(q, 65, m)
        }
        m = Of();
        m !== "" && J(q, 54, m);
        m = Pf();
        if (m.length > 0) {
            v = new Se;
            for (let A = 0; A < m.length; A++) {
                const M = new Qe;
                J(M, 1, m[A].key);
                qd(M, 2, Re, Nc(m[A].value));
                yd(v, 15, Qe, M)
            }
            I(p, Se, 5, v)
        }
        Vh(p);
        Wh(n, q);
        S("start_client_gcf") && Xh(q);
        Q("DELEGATED_SESSION_ID") && !S("pageid_as_header_web") && (n = new Ve, J(n, 3, Q("DELEGATED_SESSION_ID")));
        !S("fill_delegate_context_in_gel_killswitch") && (m = Q("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT")) &&
            (v = ud(p, Ve, 3) || new Ve, n = p, m = J(v, 18, m), I(n, Ve, 3, m));
        n = q;
        m = Q("DEVICE", "");
        for (const [A, M] of Object.entries(Hf(m))) m = A, v = M, m === "cbrand" ? J(n, 12, v) : m === "cmodel" ? J(n, 13, v) : m === "cbr" ? J(n, 87, v) : m === "cbrver" ? J(n, 88, v) : m === "cos" ? J(n, 18, v) : m === "cosver" ? J(n, 19, v) : m === "cplatform" && Fd(n, 42, kg(v));
        p.j(q);
        I(k, We, 1, p);
        if (q = wj[h]) a: {
            if (Bd(q, 1)) p = 1;
            else if (q.getPlaylistId()) p = 2;
            else break a;I(k, af, 4, q);q = ud(k, We, 1) || new We;n = ud(q, Ve, 3) || new Ve;m = new Ue;J(m, 2, h);Fd(m, 1, p);yd(n, 12, Ue, m);I(q, Ve, 3, n)
        }
        delete wj[h];
        h = h ===
            "visitorOnlyApprovedKey";
        Uj() || Ed(k, f);
        !h && (p = Q("EVENT_ID")) && (q = Vj(), n = new $e, J(n, 1, p), Ed(n, q), I(k, $e, 5, n));
        Rj(d);
        if (S("jspb_serialize_with_worker")) {
            if (!ni)
                if (p = Q("WORKER_SERIALIZATION_URL")) {
                    if (p = p.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue) {
                        if (qa === void 0)
                            if (q = null, (n = t.trustedTypes) && n.createPolicy) {
                                try {
                                    q = n.createPolicy("goog#html", {
                                        createHTML: na,
                                        createScript: na,
                                        createScriptURL: na
                                    })
                                } catch (A) {
                                    t.console && t.console.error(A.message)
                                }
                                qa = q
                            } else qa = q;
                        p = (q = qa) ? q.createScriptURL(p) : p;
                        p = new ua(p,
                            va)
                    } else p = null;
                    ni = p
                } else ni = null;
            p = ni || void 0;
            mi || p === void 0 || (mi = new Worker(p instanceof ua && p.constructor === ua ? p.h : "type_error:TrustedResourceUrl", void 0));
            if ((p = mi) && d.writeThenSend) {
                uj.set(tj, {
                    client: b,
                    resolve: c,
                    networklessOptions: d,
                    isIsolated: !1,
                    useVSSEndpoint: e,
                    dangerousLogToVisitorSession: h,
                    requestsOutstanding: g
                });
                a = p;
                b = a.postMessage;
                c = Wd(k);
                b.call(a, {
                    op: "gelBatchToSerialize",
                    batchRequest: c,
                    clientEvents: l,
                    key: tj
                });
                tj++;
                break
            }
        }
        if (l) {
            p = [];
            for (q = 0; q < l.length; q++) try {
                p.push(new Ze(l[q]))
            } catch (A) {
                Af(new jf("Transport failed to deserialize " +
                    String(l[q])))
            }
            l = p
        } else l = [];
        for (const A of l) yd(k, 3, Ze, A);
        l = {
            startTime: W(),
            ticks: {},
            infos: {}
        };
        try {
            Vd = !0;
            var z = JSON.stringify(Wd(k), bd)
        } finally {
            Vd = !1
        }
        k = z;
        l.ticks.geljspc = W();
        S("log_jspb_serialize_latency") && Math.random() < .001 && fi("meta_logging_csi_event", {
            timerName: "gel_jspb_serialize",
            Ob: l
        });
        Wj(k, b, c, d, e, h, g)
    }
}

function Wj(a, b, c, d = {}, e, f, g = {
    value: 0
}) {
    e = Oj(e);
    d = Tj(d, f, k => {
        S("start_client_gcf") && sg.h(() => r(function*() {
            yield Sj(k)
        }));
        g.value--;
        g.value || c()
    }, () => {
        g.value--;
        g.value || c()
    }, !1);
    d.headers["Content-Type"] = "application/json+protobuf";
    d.postBodyFormat = "JSPB";
    d.postBody = a;
    ti(b, e, "", d);
    sj = !1
}

function Rj(a) {
    S("always_send_and_write") && (a.writeThenSend = !1)
}

function Tj(a, b, c, d, e) {
    a = {
        retry: !0,
        onSuccess: c,
        onError: d,
        networklessOptions: a,
        dangerousLogToVisitorSession: b,
        qb: !!e,
        headers: {},
        postBodyFormat: "",
        postBody: "",
        compress: S("compress_gel") || S("compress_gel_lr")
    };
    Uj() && (a.headers["X-Goog-Request-Time"] = JSON.stringify(Math.round(W())));
    return a
}

function Qj(a, b, c) {
    Uj() || (a.requestTimeMs = String(b));
    S("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
    !c && (b = Q("EVENT_ID")) && (c = Vj(), a.serializedClientEventId = {
        serializedEventId: b,
        clientCounter: String(c)
    })
}

function Vj() {
    let a = Q("BATCH_CLIENT_COUNTER") || 0;
    a || (a = Math.floor(Math.random() * jj / 2));
    a++;
    a > jj && (a = 1);
    P("BATCH_CLIENT_COUNTER", a);
    return a
}

function Pj(a, b, c) {
    let d;
    if (c.videoId) d = "VIDEO";
    else if (c.playlistId) d = "PLAYLIST";
    else return;
    a.credentialTransferTokenTargetId = c;
    a.context = a.context || {};
    a.context.user = a.context.user || {};
    a.context.user.credentialTransferTokens = [{
        token: b,
        scope: d
    }]
}

function Aj() {
    var a;
    (a = u("yt.logging.transport.enableScrapingForTest")) || (a = Nf("il_payload_scraping"), a = (a !== void 0 ? String(a) : "") !== "enable_il_payload_scraping");
    a || (bj = [], w("yt.logging.transport.enableScrapingForTest", !0), w("yt.logging.transport.scrapedPayloadsForTesting", bj), w("yt.logging.transport.payloadToScrape", "visualElementShown visualElementHidden visualElementAttached screenCreated visualElementGestured visualElementStateChanged".split(" ")), w("yt.logging.transport.getScrapedPayloadFromClientEventsFunction"),
        w("yt.logging.transport.scrapeClientEvent", !0))
}

function Uj() {
    return S("use_request_time_ms_header") || S("lr_use_request_time_ms_header")
}

function Ij(a, b) {
    return S("transport_use_scheduler") === !1 ? Kf(a, b) : S("logging_avoid_blocking_during_navigation") || S("lr_logging_avoid_blocking_during_navigation") ? mg(() => {
        Zi().currentState === "none" ? a() : Zi().install({
            none: {
                callback: a
            }
        })
    }, b) : mg(a, b)
}

function Lj(a) {
    S("transport_use_scheduler") ? sg.P(a) : window.clearTimeout(a)
}

function Sj(a) {
    return r(function*() {
        var b, c = a == null ? void 0 : (b = a.responseContext) == null ? void 0 : b.globalConfigGroup;
        b = gj(c, Le);
        const d = c == null ? void 0 : c.hotHashData,
            e = gj(c, Ke);
        c = c == null ? void 0 : c.coldHashData;
        const f = Gi().resolve(new yi);
        f && (d && (b ? yield Ph(f, d, b): yield Ph(f, d)), c && (e ? yield Qh(f, c, e): yield Qh(f, c)))
    })
}

function Gj(a, b = 200) {
    return a ? b === 300 ? qj : oj : b === 300 ? pj : nj
}

function Cj(a) {
    a = Object.keys(a);
    for (const b of a)
        if (oi[b]) return b
}

function Dj(a) {
    switch (a) {
        case "DELAYED_EVENT_TIER_UNSPECIFIED":
            return 0;
        case "DELAYED_EVENT_TIER_DEFAULT":
            return 100;
        case "DELAYED_EVENT_TIER_DISPATCH_TO_EMPTY":
            return 200;
        case "DELAYED_EVENT_TIER_FAST":
            return 300;
        case "DELAYED_EVENT_TIER_IMMEDIATE":
            return 400;
        default:
            return 200
    }
}

function Oj(a = !1) {
    return a && S("vss_through_gel_video_stats") ? "video_stats" : "log_event"
};
const Xj = t.ytLoggingGelSequenceIdObj_ || {};

function Yj(a, b, c, d = {}) {
    const e = {},
        f = Math.round(d.timestamp || W());
    e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
    e[a] = b;
    a = u("_lact", window);
    a = a == null ? -1 : Math.max(Date.now() - a, 0);
    e.context = {
        lastActivityMs: String(d.timestamp || !isFinite(a) ? -1 : a)
    };
    d.sequenceGroup && !S("web_gel_sequence_info_killswitch") && (a = e.context, b = d.sequenceGroup, Xj[b] = b in Xj ? Xj[b] + 1 : 0, a.sequence = {
        index: Xj[b],
        groupKey: b
    }, d.endOfSequence && delete Xj[d.sequenceGroup]);
    (d.sendIsolatedPayload ? Ej : zj)({
        endpoint: "log_event",
        payload: e,
        cttAuthInfo: d.cttAuthInfo,
        dangerousLogToVisitorSession: d.dangerousLogToVisitorSession
    }, c)
}

function Zj(a = !1) {
    Hj(void 0, void 0, a)
};
let ak = [];

function Y(a, b, c = {}) {
    let d = ui;
    Q("ytLoggingEventsDefaultDisabled", !1) && ui === ui && (d = null);
    Yj(a, b, d, c)
};
var bk = new Set,
    ck = 0,
    dk = 0,
    ek = 0,
    fk = [];
const gk = ["PhantomJS", "Googlebot", "TO STOP THIS SECURITY SCAN go/scan"];

function hk(a) {
    ik(a)
}

function jk(a) {
    ik(a, "WARNING")
}

function ik(a, b = "ERROR") {
    var c = {};
    c.name = Q("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
    c.version = Q("INNERTUBE_CONTEXT_CLIENT_VERSION");
    kk(a, c, b)
}

function kk(a, b, c = "ERROR") {
    if (a) {
        a.hasOwnProperty("level") && a.level && (c = a.level);
        if (S("console_log_js_exceptions")) {
            var d = [];
            d.push(`Name: ${a.name}`);
            d.push(`Message: ${a.message}`);
            a.hasOwnProperty("params") && d.push(`Error Params: ${JSON.stringify(a.params)}`);
            a.hasOwnProperty("args") && d.push(`Error args: ${JSON.stringify(a.args)}`);
            d.push(`File name: ${a.fileName}`);
            d.push(`Stacktrace: ${a.stack}`);
            window.console.log(d.join("\n"), a)
        }
        if (!(ck >= 5)) {
            var e = Ga(a);
            d = e.message || "Unknown Error";
            const p =
                e.name || "UnknownError";
            var f = e.stack || a.i || "Not available";
            if (f.startsWith(`${p}: ${d}`)) {
                var g = f.split("\n");
                g.shift();
                f = g.join("\n")
            }
            g = e.lineNumber || "Not available";
            e = e.fileName || "Not available";
            let q = 0;
            if (a.hasOwnProperty("args") && a.args && a.args.length)
                for (var k = 0; k < a.args.length && !(q = dg(a.args[k], `params.${k}`, b, q), q >= 500); k++);
            else if (a.hasOwnProperty("params") && a.params) {
                const m = a.params;
                if (typeof a.params === "object")
                    for (k in m) {
                        if (!m[k]) continue;
                        const v = `params.${k}`,
                            z = fg(m[k]);
                        b[v] = z;
                        q += v.length +
                            z.length;
                        if (q > 500) break
                    } else b.params = fg(m)
            }
            if (fk.length)
                for (k = 0; k < fk.length && !(q = dg(fk[k], `params.context.${k}`, b, q), q >= 500); k++);
            navigator.vendor && !b.hasOwnProperty("vendor") && (b["device.vendor"] = navigator.vendor);
            b = {
                message: d,
                name: p,
                lineNumber: g,
                fileName: e,
                stack: f,
                params: b,
                sampleWeight: 1
            };
            d = Number(a.columnNumber);
            isNaN(d) || (b.lineNumber = `${b.lineNumber}:${d}`);
            if (a.level === "IGNORED") var h = 0;
            else a: {
                a = Xf();
                for (h of a.F)
                    if (b.message && b.message.match(h.Fa)) {
                        h = h.weight;
                        break a
                    }
                for (var l of a.D)
                    if (l.callback(b)) {
                        h =
                            l.weight;
                        break a
                    }
                h = 1
            }
            b.sampleWeight = h;
            h = b;
            for (var n of Uf)
                if (n.U[h.name]) {
                    l = n.U[h.name];
                    for (const m of l)
                        if (l = h.message.match(m.u)) {
                            h.params["params.error.original"] = l[0];
                            a = m.groups;
                            b = {};
                            for (d = 0; d < a.length; d++) b[a[d]] = l[d + 1], h.params[`params.error.${a[d]}`] = l[d + 1];
                            h.message = n.aa(b);
                            break
                        }
                }
            h.params || (h.params = {});
            n = Xf();
            h.params["params.errorServiceSignature"] = `msg=${n.F.length}&cb=${n.D.length}`;
            h.params["params.serviceWorker"] = "true";
            t.document && t.document.querySelectorAll && (h.params["params.fscripts"] =
                String(document.querySelectorAll("script:not([nonce])").length));
            ta("sample").constructor !== ra && (h.params["params.fconst"] = "true");
            window.yterr && typeof window.yterr === "function" && window.yterr(h);
            h.sampleWeight === 0 || bk.has(h.message) || lk(h, c)
        }
    }
}

function lk(a, b = "ERROR") {
    if (b === "ERROR") {
        ag.A("handleError", a);
        if (S("record_app_crashed_web") && ek === 0 && a.sampleWeight === 1) {
            ek++;
            var c = {
                appCrashType: "APP_CRASH_TYPE_BREAKPAD"
            };
            S("report_client_error_with_app_crash_ks") || (c.systemHealth = {
                crashData: {
                    clientError: {
                        logMessage: {
                            message: a.message
                        }
                    }
                }
            });
            Y("appCrashed", c)
        }
        dk++
    } else b === "WARNING" && ag.A("handleWarning", a);
    c = {};
    b: {
        for (e of gk) {
            var d = Ta();
            if (d && d.toLowerCase().indexOf(e.toLowerCase()) >= 0) {
                var e = !0;
                break b
            }
        }
        e = !1
    }
    if (e) c = void 0;
    else {
        d = {
            stackTrace: a.stack
        };
        a.fileName && (d.filename = a.fileName);
        e = a.lineNumber && a.lineNumber.split ? a.lineNumber.split(":") : [];
        e.length !== 0 && (e.length !== 1 || isNaN(Number(e[0])) ? e.length !== 2 || isNaN(Number(e[0])) || isNaN(Number(e[1])) || (d.lineNumber = Number(e[0]), d.columnNumber = Number(e[1])) : d.lineNumber = Number(e[0]));
        e = {
            level: "ERROR_LEVEL_UNKNOWN",
            message: a.message,
            errorClassName: a.name,
            sampleWeight: a.sampleWeight
        };
        b === "ERROR" ? e.level = "ERROR_LEVEL_ERROR" : b === "WARNING" && (e.level = "ERROR_LEVEL_WARNNING");
        d = {
            isObfuscated: !0,
            browserStackInfo: d
        };
        c.pageUrl = window.location.href;
        c.kvPairs = [];
        Q("FEXP_EXPERIMENTS") && (c.experimentIds = Q("FEXP_EXPERIMENTS"));
        var f = Q("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS");
        const h = xf.EXPERIMENT_FLAGS;
        if ((!h || !h.web_disable_gel_stp_ecatcher_killswitch) && f)
            for (var g of Object.keys(f)) c.kvPairs.push({
                key: g,
                value: String(f[g])
            });
        if (g = a.params)
            for (var k of Object.keys(g)) c.kvPairs.push({
                key: `client.${k}`,
                value: String(g[k])
            });
        k = Q("SERVER_NAME");
        g = Q("SERVER_VERSION");
        k && g && (c.kvPairs.push({
                key: "server.name",
                value: k
            }),
            c.kvPairs.push({
                key: "server.version",
                value: g
            }));
        c = {
            errorMetadata: c,
            stackTrace: d,
            logMessage: e
        }
    }
    if (c && (Y("clientError", c), b === "ERROR" || S("errors_flush_gel_always_killswitch"))) a: {
        if (S("web_fp_via_jspb")) {
            b = ak;
            ak = [];
            if (b)
                for (const h of b) Yj(h.M, h.payload, ui, h.options);
            Zj(!0);
            if (!S("web_fp_via_jspb_and_json")) break a
        }
        Zj()
    }
    try {
        bk.add(a.message)
    } catch (h) {}
    ck++
}

function mk(a, ...b) {
    a.args || (a.args = []);
    a.args.push(...b)
};

function nk(a) {
    return r(function*() {
        var b = yield t.fetch(a.i);
        if (b.status !== 200) return Promise.reject("Server error when retrieving AmbientData");
        b = yield b.text();
        if (!b.startsWith(")]}'\n")) return Promise.reject("Incorrect JSPB formatting");
        a: {
            b = JSON.parse(b.substring(5));
            for (let c = 0; c < b.length; c++)
                if (b[c][0] === "yt.sw.adr") {
                    b = new tf(b[c]);
                    break a
                }
            b = null
        }
        return b ? b : Promise.reject("AmbientData missing from response")
    })
}

function ok(a = !1) {
    const b = pk.h;
    return r(function*() {
        if (a || !b.h) b.h = nk(b).then(b.j).catch(c => {
            delete b.h;
            ik(c)
        });
        return b.h
    })
}
var pk = class {
    constructor() {
        this.i = qk("/sw.js_data")
    }
    j(a) {
        const b = ud(a, sf, 2);
        if (b) {
            var c = Ad(b, 5);
            c && (t.__SAPISID = c);
            zd(b, 10) != null ? P("EOM_VISITOR_DATA", Ad(b, 10)) : zd(b, 7) != null && P("VISITOR_DATA", Ad(b, 7));
            if (Lc(ld(b, 4)) != null) {
                c = String;
                var d = Lc(ld(b, 4));
                P("SESSION_INDEX", c(d != null ? d : 0))
            }
            zd(b, 8) != null && P("DELEGATED_SESSION_ID", Ad(b, 8));
            zd(b, 12) != null && P("USER_SESSION_ID", Ad(b, 12));
            zd(b, 11) != null && P("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT", Ad(b, 11))
        }
        return a
    }
};

function rk(a, b) {
    b.encryptedTokenJarContents && (a.h[b.encryptedTokenJarContents] = b, typeof b.expirationSeconds === "string" && setTimeout(() => {
        delete a.h[b.encryptedTokenJarContents]
    }, Number(b.expirationSeconds) * 1E3))
}
var sk = class {
    constructor() {
        this.h = {}
    }
    handleResponse(a, b) {
        if (!b) throw Error("request needs to be passed into ConsistencyService");
        let c, d;
        b = ((c = b.G.context) == null ? void 0 : (d = c.request) == null ? void 0 : d.consistencyTokenJars) || [];
        let e;
        if (a = (e = a.responseContext) == null ? void 0 : e.consistencyTokenJar) {
            for (const f of b) delete this.h[f.encryptedTokenJarContents];
            rk(this, a)
        }
    }
};
let tk = Date.now().toString();

function uk() {
    if (window.crypto && window.crypto.getRandomValues) try {
        var a = Array(16),
            b = new Uint8Array(16);
        window.crypto.getRandomValues(b);
        for (var c = 0; c < a.length; c++) a[c] = b[c];
        return a
    } catch (d) {}
    a = Array(16);
    for (b = 0; b < 16; b++) {
        c = Date.now();
        for (let d = 0; d < c % 23; d++) a[b] = Math.random();
        a[b] = Math.floor(Math.random() * 256)
    }
    if (tk)
        for (b = 1, c = 0; c < tk.length; c++) a[b % 16] = a[b % 16] ^ a[(b - 1) % 16] / 4 ^ tk.charCodeAt(c), b++;
    return a
};
var vk;
let wk = t.ytLoggingDocDocumentNonce_;
if (!wk) {
    const a = uk(),
        b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    wk = b.join("")
}
vk = wk;
var xk = {
    Ra: 0,
    Oa: 1,
    Qa: 2,
    bb: 3,
    Sa: 4,
    mb: 5,
    cb: 6,
    jb: 7,
    hb: 8,
    ib: 9,
    0: "DEFAULT",
    1: "CHAT",
    2: "CONVERSATIONS",
    3: "MINIPLAYER",
    4: "DIALOG",
    5: "VOZ",
    6: "MUSIC_WATCH_TABS",
    7: "SHARE",
    8: "PUSH_NOTIFICATIONS",
    9: "RICH_GRID_WATCH"
};
let yk = 1;

function zk(a) {
    return new Ak({
        trackingParams: a
    })
}

function Bk(a) {
    const b = yk++;
    return new Ak({
        veType: a,
        veCounter: b,
        elementIndex: void 0,
        dataElement: void 0,
        youtubeData: void 0,
        jspbYoutubeData: void 0,
        loggingDirectives: void 0
    })
}
var Ak = class {
    constructor(a) {
        this.h = a
    }
    getAsJson() {
        const a = {};
        this.h.trackingParams !== void 0 ? a.trackingParams = this.h.trackingParams : (a.veType = this.h.veType, this.h.veCounter !== void 0 && (a.veCounter = this.h.veCounter), this.h.elementIndex !== void 0 && (a.elementIndex = this.h.elementIndex));
        this.h.dataElement !== void 0 && (a.dataElement = this.h.dataElement.getAsJson());
        this.h.youtubeData !== void 0 && (a.youtubeData = this.h.youtubeData);
        this.h.isCounterfactual && (a.isCounterfactual = !0);
        return a
    }
    getAsJspb() {
        const a = new Ye;
        this.h.trackingParams !== void 0 ? a.setTrackingParams(this.h.trackingParams) : (this.h.veType !== void 0 && Dd(a, 2, this.h.veType), this.h.veCounter !== void 0 && Dd(a, 6, this.h.veCounter), this.h.elementIndex !== void 0 && Dd(a, 3, this.h.elementIndex), this.h.isCounterfactual && od(a, 5, !0));
        if (this.h.dataElement !== void 0) {
            var b = this.h.dataElement.getAsJspb();
            I(a, Ye, 7, b)
        }
        this.h.youtubeData !== void 0 && I(a, Me, 8, this.h.jspbYoutubeData);
        return a
    }
    toString() {
        return JSON.stringify(this.getAsJson())
    }
    isClientVe() {
        return !this.h.trackingParams &&
            !!this.h.veType
    }
    getLoggingDirectives() {
        return this.h.loggingDirectives
    }
};

function Ck(a = 0) {
    return Q("client-screen-nonce-store", {})[a]
}

function Dk(a, b = 0) {
    let c = Q("client-screen-nonce-store");
    c || (c = {}, P("client-screen-nonce-store", c));
    c[b] = a
}

function Ek(a = 0) {
    return a === 0 ? "ROOT_VE_TYPE" : `${"ROOT_VE_TYPE"}.${a}`
}

function Fk(a = 0) {
    return Q(Ek(a))
}

function Gk(a = 0) {
    return (a = Fk(a)) ? new Ak({
        veType: a,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    }) : null
}

function Hk() {
    let a = Q("csn-to-ctt-auth-info");
    a || (a = {}, P("csn-to-ctt-auth-info", a));
    return a
}

function Ik() {
    return Object.values(Q("client-screen-nonce-store", {})).filter(a => a !== void 0)
}

function Z(a = 0) {
    a = Ck(a);
    if (!a && !Q("USE_CSN_FALLBACK", !0)) return null;
    a || (a = "UNDEFINED_CSN");
    return a ? a : null
}

function Jk(a) {
    for (const b of Object.values(xk))
        if (Z(b) === a) return !0;
    return !1
}

function Kk(a, b, c) {
    const d = Hk();
    (c = Z(c)) && delete d[c];
    b && (d[a] = b)
}

function Lk(a) {
    return Hk()[a]
}

function Mk(a, b, c = 0, d) {
    if (a !== Ck(c) || b !== Q(Ek(c)))
        if (Kk(a, d, c), Dk(a, c), P(Ek(c), b), b = () => {
                setTimeout(() => {
                    a && Y("foregroundHeartbeatScreenAssociated", {
                        clientDocumentNonce: vk,
                        clientScreenNonce: a
                    })
                }, 0)
            }, "requestAnimationFrame" in window) try {
            window.requestAnimationFrame(b)
        } catch (e) {
            b()
        } else b()
};

function Nk() {
    var a = Q("INNERTUBE_CONTEXT");
    if (!a) return ik(Error("Error: No InnerTubeContext shell provided in ytconfig.")), {};
    a = Ba(a);
    S("web_no_tracking_params_in_shell_killswitch") || delete a.clickTracking;
    a.client || (a.client = {});
    var b = a.client;
    b.utcOffsetMinutes = -Math.floor((new Date).getTimezoneOffset());
    var c = Of();
    c ? b.experimentsToken = c : delete b.experimentsToken;
    sk.h || (sk.h = new sk);
    b = sk.h.h;
    c = [];
    let d = 0;
    for (var e in b) c[d++] = b[e];
    a.request = Object.assign({}, a.request, {
        consistencyTokenJars: c
    });
    a.user = Object.assign({}, a.user);
    if (e = Q("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT")) a.user.serializedDelegationContext = e;
    return a
};

function Ok(a) {
    var b = a;
    if (a = Q("INNERTUBE_HOST_OVERRIDE")) {
        a = String(a);
        var c = String,
            d = b.match(La);
        b = d[5];
        var e = d[6];
        d = d[7];
        var f = "";
        b && (f += b);
        e && (f += "?" + e);
        d && (f += "#" + d);
        b = a + c(f)
    }
    return b
};

function Pk(a) {
    const b = {
        "Content-Type": "application/json"
    };
    Q("EOM_VISITOR_DATA") ? b["X-Goog-EOM-Visitor-Id"] = Q("EOM_VISITOR_DATA") : Q("VISITOR_DATA") && (b["X-Goog-Visitor-Id"] = Q("VISITOR_DATA"));
    b["X-Youtube-Bootstrap-Logged-In"] = Q("LOGGED_IN", !1);
    Q("DEBUG_SETTINGS_METADATA") && (b["X-Debug-Settings-Metadata"] = Q("DEBUG_SETTINGS_METADATA"));
    a !== "cors" && ((a = Q("INNERTUBE_CONTEXT_CLIENT_NAME")) && (b["X-Youtube-Client-Name"] = a), (a = Q("INNERTUBE_CONTEXT_CLIENT_VERSION")) && (b["X-Youtube-Client-Version"] = a), (a =
        Q("CHROME_CONNECTED_HEADER")) && (b["X-Youtube-Chrome-Connected"] = a), (a = Q("DOMAIN_ADMIN_STATE")) && (b["X-Youtube-Domain-Admin-State"] = a));
    return b
};
var Qk = class {
    constructor() {
        this.h = {}
    }
    get(a) {
        if (Object.prototype.hasOwnProperty.call(this.h, a)) return this.h[a]
    }
    set(a, b) {
        this.h[a] = b
    }
    remove(a) {
        delete this.h[a]
    }
};
new class {
    constructor() {
        this.mappings = new Qk
    }
    get(a) {
        a: {
            var b = this.mappings.get(a.toString());
            switch (b.type) {
                case "mapping":
                    a = b.value;
                    break a;
                case "factory":
                    b = b.value();
                    this.mappings.set(a.toString(), {
                        type: "mapping",
                        value: b
                    });
                    a = b;
                    break a;
                default:
                    a = Ea(b, void 0)
            }
        }
        return a
    }
};
var Rk = class {},
    Sk = class extends Rk {};
const Tk = {
    GET_DATASYNC_IDS: function(a) {
        return () => new a
    }(class extends Sk {})
};
class ai extends Zh {
    constructor(a) {
        super(arguments);
        this.csn = a
    }
}
const ii = new $h,
    Uk = [];
let Wk = Vk,
    Xk = 0;
const Yk = new Map,
    Zk = new Map,
    $k = new Map;

function al(a, b, c, d, e, f, g, k) {
    const h = Wk(),
        l = new Ak({
            veType: b,
            youtubeData: f,
            jspbYoutubeData: void 0
        });
    f = bl({}, h);
    e && (f.cttAuthInfo = e);
    e = {
        csn: h,
        pageVe: l.getAsJson()
    };
    S("expectation_logging") && k && k.screenCreatedLoggingExpectations && (e.screenCreatedLoggingExpectations = k.screenCreatedLoggingExpectations);
    c && c.visualElement ? (e.implicitGesture = {
        parentCsn: c.clientScreenNonce,
        gesturedVe: c.visualElement.getAsJson()
    }, g && (e.implicitGesture.gestureType = g)) : c && jk(new jf("newScreen() parent element does not have a VE - rootVe",
        b));
    d && (e.cloneCsn = d);
    a ? Yj("screenCreated", e, a, f) : Y("screenCreated", e, f);
    fi(ii, new ai(h));
    Yk.clear();
    Zk.clear();
    $k.clear();
    return h
}

function cl(a, b, c, d, e = !1) {
    dl(a, b, c, [d], e)
}

function dl(a, b, c, d, e = !1) {
    const f = bl({
        cttAuthInfo: Lk(b) || void 0
    }, b);
    for (const k of d) {
        var g = k.getAsJson();
        (Aa(g) || !g.trackingParams && !g.veType) && jk(Error("Child VE logged with no data"));
        if (S("no_client_ve_attach_unless_shown")) {
            const h = el(k, b);
            if (g.veType && !Zk.has(h) && !$k.has(h) && !e) {
                if (!S("il_attach_cache_limit") || Yk.size < 1E3) {
                    Yk.set(h, [a, b, c, k]);
                    return
                }
                S("il_attach_cache_limit") && Yk.size > 1E3 && jk(new jf("IL Attach cache exceeded limit"))
            }
            g = el(c, b);
            Yk.has(g) ? fl(c, b) : $k.set(g, !0)
        }
    }
    d = d.filter(k => {
        k.csn !==
            b ? (k.csn = b, k = !0) : k = !1;
        return k
    });
    c = {
        csn: b,
        parentVe: c.getAsJson(),
        childVes: xa(d, k => k.getAsJson())
    };
    b === "UNDEFINED_CSN" ? gl("visualElementAttached", f, c) : a ? Yj("visualElementAttached", c, a, f) : Y("visualElementAttached", c, f)
}

function hl(a, b, c, d, e) {
    il(a, b, c, e)
}

function il(a, b, c, d) {
    jl(c, b);
    const e = bl({
        cttAuthInfo: Lk(b) || void 0
    }, b);
    c = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 1
    };
    d && (c.clientData = d);
    b === "UNDEFINED_CSN" ? gl("visualElementShown", e, c) : a ? Yj("visualElementShown", c, a, e) : Y("visualElementShown", c, e)
}

function kl(a, b, c, d = !1) {
    const e = d ? 16 : 8;
    d = bl({
        cttAuthInfo: Lk(b) || void 0,
        endOfSequence: d
    }, b);
    c = {
        csn: b,
        ve: c.getAsJson(),
        eventType: e
    };
    b === "UNDEFINED_CSN" ? gl("visualElementHidden", d, c) : a ? Yj("visualElementHidden", c, a, d) : Y("visualElementHidden", c, d)
}

function ll(a, b, c, d) {
    var e = void 0;
    jl(c, b);
    e = e || "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";
    const f = bl({
        cttAuthInfo: Lk(b) || void 0
    }, b);
    c = {
        csn: b,
        ve: c.getAsJson(),
        gestureType: e
    };
    d && (c.clientData = d);
    b === "UNDEFINED_CSN" ? gl("visualElementGestured", f, c) : a ? Yj("visualElementGestured", c, a, f) : Y("visualElementGestured", c, f)
}

function Vk() {
    let a;
    a = uk();
    const b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    return b.join("")
}

function gl(a, b, c) {
    Uk.push({
        M: a,
        payload: c,
        vb: void 0,
        options: b
    });
    Xk || (Xk = ji())
}

function ki(a) {
    if (Uk) {
        for (const b of Uk) b.payload && (b.payload.csn = a.csn, Y(b.M, b.payload, b.options));
        Uk.length = 0
    }
    Xk = 0
}

function el(a, b) {
    return `${a.getAsJson().veType}${a.getAsJson().veCounter}${b}`
}

function jl(a, b) {
    if (S("no_client_ve_attach_unless_shown")) {
        var c = el(a, b);
        Zk.set(c, !0);
        fl(a, b)
    }
}

function fl(a, b) {
    a = el(a, b);
    Yk.has(a) && (b = Yk.get(a) || [], cl(b[0], b[1], b[2], b[3], !0), Yk.delete(a))
}

function bl(a, b) {
    S("log_sequence_info_on_gel_web") && (a.sequenceGroup = b);
    return a
};
w("ytLoggingLatencyUsageStats_", t.ytLoggingLatencyUsageStats_ || {});
const ml = window;
class nl {
    constructor() {
        this.timing = {};
        this.clearResourceTimings = () => {};
        this.webkitClearResourceTimings = () => {};
        this.mozClearResourceTimings = () => {};
        this.msClearResourceTimings = () => {};
        this.oClearResourceTimings = () => {}
    }
}
var ol = ml.performance || ml.mozPerformance || ml.msPerformance || ml.webkitPerformance || new nl;
la(ol.clearResourceTimings || ol.webkitClearResourceTimings || ol.mozClearResourceTimings || ol.msClearResourceTimings || ol.oClearResourceTimings || bb, ol);
const pl = ["type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.BrowseResponse", "type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.PlayerResponse"];

function ql(a) {
    var b = {
            sb: {}
        },
        c = gg();
    if (Bi.h !== void 0) {
        const d = Bi.h;
        a = [b !== d.m, a !== d.l, c !== d.j, !1, !1, !1, void 0 !== d.i];
        if (a.some(e => e)) throw new jf("InnerTubeTransportService is already initialized", a);
    } else Bi.h = new Bi(b, a, c)
}

function rl(a, b) {
    return r(function*() {
        var c, d = a == null ? void 0 : (c = a.da) == null ? void 0 : c.sessionIndex;
        let e;
        c = ((e = gj(a == null ? void 0 : a.command, Xe)) == null ? void 0 : e.signal) === "GET_ACCOUNT_MENU" ? !0 : !1;
        d = yield qb(ig(0, {
            sessionIndex: d,
            ha: c
        }));
        return Promise.resolve(Object.assign({}, Pk(b), d))
    })
}

function sl(a, b, c, d = () => {}) {
    return r(function*() {
        var e;
        if (b == null ? 0 : (e = b.G) == null ? 0 : e.context) {
            e = b.G.context;
            for (var f of []) yield f.Bb(e)
        }
        var g;
        if ((g = a.i) == null ? 0 : g.Kb(b.input, b.G)) return yield a.i.xb(b.input, b.G);
        var k;
        if ((g = (k = b.config) == null ? void 0 : k.Fb) && a.h.has(g)) var h = a.h.get(g);
        else {
            k = JSON.stringify(b.G);
            let q;
            f = (q = (h = b.N) == null ? void 0 : h.headers) != null ? q : {};
            b.N = Object.assign({}, b.N, {
                headers: Object.assign({}, f, c)
            });
            h = Object.assign({}, b.N);
            b.N.method === "POST" && (h = Object.assign({}, h, {
                body: k
            }));
            h = a.l.fetch(b.input, h, b.config);
            g && a.h.set(g, h)
        }
        h = yield h;
        var l;
        let n;
        if (h && "error" in h && ((l = h) == null ? 0 : (n = l.error) == null ? 0 : n.details)) {
            l = h.error.details;
            for (const q of l)(l = q["@type"]) && pl.indexOf(l) > -1 && (delete q["@type"], h = q)
        }
        g && a.h.has(g) && a.h.delete(g);
        let p;
        !h && ((p = a.i) == null ? 0 : p.rb(b.input, b.G)) && (h = yield a.i.wb(b.input, b.G));
        d();
        return h || void 0
    })
}

function tl(a, b, c) {
    var d = {
        da: {
            identity: jg
        }
    };
    let e = () => {};
    b.context || (b.context = Nk());
    return new y(f => r(function*() {
        var g = Ok(c);
        g = Jf(g) ? "same-origin" : "cors";
        if (a.j.Ka) {
            var k, h = d == null ? void 0 : (k = d.da) == null ? void 0 : k.sessionIndex,
                l;
            k = ((l = gj(d == null ? void 0 : d.command, Xe)) == null ? void 0 : l.signal) === "GET_ACCOUNT_MENU" ? !0 : !1;
            l = ig(0, {
                sessionIndex: h,
                ha: k
            });
            g = Object.assign({}, Pk(g), l)
        } else g = yield rl(d, g);
        l = Ok(c);
        k = {};
        S("web_api_key_killswitch") && (Q("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT") && (g == null ? 0 : g.Authorization) || (k.key = Q("INNERTUBE_API_KEY")));
        S("json_condensed_response") && (k.prettyPrint = "false");
        l = If(l, k || {}, !1);
        k = {
            method: "POST",
            mode: Jf(l) ? "same-origin" : "cors",
            credentials: Jf(l) ? "same-origin" : "include"
        };
        h = {};
        const n = {};
        for (const p of Object.keys(h)) h[p] && (n[p] = h[p]);
        Object.keys(n).length > 0 && (k.headers = n);
        f(sl(a, {
            input: l,
            N: k,
            G: b,
            config: d
        }, g, e))
    }))
}
var Bi = class {
    constructor(a, b, c) {
        this.m = a;
        this.l = b;
        this.j = c;
        this.i = void 0;
        this.h = new Map;
        a.ca || (a.ca = {});
        a.ca = Object.assign({}, Tk, a.ca)
    }
};
var Ai = new xi;
let ul;

function vl() {
    if (!ul) {
        const a = Gi();
        ql({
            fetch: (b, c) => qb(fetch(new Request(b, c)))
        });
        zi(a);
        ul = a.resolve(Ai)
    }
    return ul
};

function wl(a) {
    return r(function*() {
        yield xl();
        jk(a)
    })
}

function yl(a) {
    return r(function*() {
        yield xl();
        ik(a)
    })
}

function zl(a) {
    r(function*() {
        var b = yield yh();
        b ? yield si(a, b): (yield ok(), b = {
            timestamp: a.timestamp
        }, b = a.appShellAssetLoadReport ? {
            M: "appShellAssetLoadReport",
            payload: a.appShellAssetLoadReport,
            options: b
        } : a.clientError ? {
            M: "clientError",
            payload: a.clientError,
            options: b
        } : void 0, b && Y(b.M, b.payload))
    })
}

function xl() {
    return r(function*() {
        try {
            yield ok()
        } catch (a) {}
    })
};
var Al = Symbol("trackingData"),
    Bl = new WeakMap;

function Cl() {
    Dl.h || (Dl.h = new Dl);
    return Dl.h
}

function El(a, b, c) {
    const d = Z(c);
    return a.csn === null || d === a.csn || c ? d : (a = new jf("VisibilityLogger called before newScreen", {
        caller: b.tagName,
        previous_csn: a.csn,
        current_csn: d
    }), jk(a), null)
}

function Fl(a) {
    let b;
    return !((b = Gl(a)) == null || !b.loggingDirectives)
}

function Hl(a) {
    a = Gl(a);
    return Math.floor(Number(a && a.loggingDirectives && a.loggingDirectives.visibility && a.loggingDirectives.visibility.types || "")) || 1
}

function Gl(a) {
    let b, c = a.data || ((b = a.props) == null ? void 0 : b.data);
    if (!c && a.isWebComponentWrapper && S("read_data_from_web_component_wrapper")) {
        let d;
        c = (d = Bl.get(a)) == null ? void 0 : d[Al]
    }
    return c
}
var Dl = class {
    constructor() {
        this.m = new Set;
        this.l = new Set;
        this.h = new Map;
        this.client = void 0;
        this.csn = null
    }
    j(a) {
        this.client = a
    }
    s() {
        this.clear();
        this.csn = Z()
    }
    clear() {
        this.m.clear();
        this.l.clear();
        this.h.clear();
        this.csn = null
    }
    A(a, b, c) {
        var d = this.i(a),
            e = a.visualElement ? a.visualElement : d;
        b = this.m.has(e);
        var f = this.h.get(e);
        this.m.add(e);
        this.h.set(e, !0);
        a.impressionLog && !b && a.impressionLog();
        if (d || a.visualElement)
            if (c = El(this, a, c)) {
                var g = Fl(a);
                if (Hl(a) || g) e = a.visualElement ? a.visualElement : zk(d), d = a.interactionLoggingClientData,
                    g || b ? Hl(a) & 4 ? f || (a = this.client, jl(e, c), b = bl({
                        cttAuthInfo: Lk(c) || void 0
                    }, c), f = {
                        csn: c,
                        ve: e.getAsJson(),
                        eventType: 4
                    }, d && (f.clientData = d), c === "UNDEFINED_CSN" ? gl("visualElementShown", b, f) : a ? Yj("visualElementShown", f, a, b) : Y("visualElementShown", f, b)) : Hl(a) & 1 && !b && il(this.client, c, e, d) : il(this.client, c, e, d)
            }
    }
    v(a, b, c) {
        var d = this.i(a);
        const e = a.visualElement ? a.visualElement : d;
        b = this.l.has(e);
        const f = this.h.get(e);
        this.l.add(e);
        this.h.set(e, !1);
        if (f === !1) return !0;
        if (!d && !a.visualElement) return !1;
        c = El(this,
            a, c);
        if (!c || !Hl(a) && Fl(a)) return !1;
        d = a.visualElement ? a.visualElement : zk(d);
        Hl(a) & 8 ? kl(this.client, c, d) : Hl(a) & 2 && !b && (a = this.client, b = bl({
            cttAuthInfo: Lk(c) || void 0
        }, c), d = {
            csn: c,
            ve: d.getAsJson(),
            eventType: 2
        }, c === "UNDEFINED_CSN" ? gl("visualElementHidden", b, d) : a ? Yj("visualElementHidden", d, a, b) : Y("visualElementHidden", d, b));
        return !0
    }
    i(a) {
        const b = Gl(a);
        let c, d;
        if (S("il_use_view_model_logging_context") && (b == null ? 0 : (c = b.context) == null ? 0 : (d = c.loggingContext) == null ? 0 : d.loggingDirectives)) return b.context.loggingContext.loggingDirectives.trackingParams ||
            "";
        let e, f;
        if (b == null ? 0 : (e = b.rendererContext) == null ? 0 : (f = e.loggingContext) == null ? 0 : f.loggingDirectives) return b.rendererContext.loggingContext.loggingDirectives.trackingParams || "";
        if (b == null ? 0 : b.loggingDirectives) return b.loggingDirectives.trackingParams || "";
        let g;
        return ((g = a.veContainer) == null ? 0 : g.trackingParams) ? a.veContainer.trackingParams : (b == null ? void 0 : b.trackingParams) || ""
    }
};

function Il() {
    Jl.h || (Jl.h = new Jl)
}

function Kl(a) {
    Il();
    R(Cl().A).bind(Cl())(a, void 0, 8)
}

function Ll(a) {
    Il();
    R(Cl().v).bind(Cl())(a, void 0, 8)
}
var Jl = class {
    j(a) {
        R(Cl().j).bind(Cl())(a)
    }
    clear() {
        R(Cl().clear).bind(Cl())()
    }
};

function Ml() {
    Nl.h || (Nl.h = new Nl);
    return Nl.h
}

function Ol(a, b, c = {}) {
    a.i.add(c.layer || 0);
    a.m = () => {
        Pl(a, b, c);
        const d = Gk(c.layer);
        if (d) {
            for (const e of a.A) Ql(a, e[0], e[1] || d, c.layer);
            for (const e of a.C) Rl(a, e[0], e[1])
        }
    };
    Z(c.layer) || a.m();
    if (c.fa)
        for (const d of c.fa) Sl(a, d, c.layer);
    else ik(Error("Delayed screen needs a data promise."))
}

function Pl(a, b, c = {}) {
    var d = void 0;
    c.layer || (c.layer = 0);
    d = c.Ga !== void 0 ? c.Ga : c.layer;
    const e = Z(d);
    d = Gk(d);
    let f;
    d && (c.parentCsn !== void 0 ? f = {
        clientScreenNonce: c.parentCsn,
        visualElement: d
    } : e && e !== "UNDEFINED_CSN" && (f = {
        clientScreenNonce: e,
        visualElement: d
    }));
    let g;
    const k = Q("EVENT_ID");
    e === "UNDEFINED_CSN" && k && (g = {
        servletData: {
            serializedServletEventId: k
        }
    });
    S("combine_ve_grafts") && e && Tl(a, e);
    S("no_client_ve_attach_unless_shown") && d && e && fl(d, e);
    let h;
    try {
        h = al(a.client, b, f, c.ea, c.cttAuthInfo, g, c.ub, c.loggingExpectations)
    } catch (p) {
        mk(p, {
            Hb: b,
            rootVe: d,
            Ab: void 0,
            tb: e,
            zb: f,
            ea: c.ea
        });
        ik(p);
        return
    }
    Mk(h, b, c.layer, c.cttAuthInfo);
    e && e !== "UNDEFINED_CSN" && d && !Jk(e) && kl(a.client, e, d, !0);
    a.h[a.h.length - 1] && !a.h[a.h.length - 1].csn && (a.h[a.h.length - 1].csn = h || "");
    Il();
    R(Cl().s).bind(Cl())();
    const l = Gk(c.layer);
    e && e !== "UNDEFINED_CSN" && l && (S("web_mark_root_visible") || S("music_web_mark_root_visible")) && R(hl)(void 0, h, l, void 0, void 0, void 0);
    a.i.delete(c.layer || 0);
    a.m = void 0;
    let n;
    (n = a.W.get(c.layer)) == null || n.forEach((p, q) => {
        p ? Ql(a, q, p, c.layer) : l &&
            Ql(a, q, l, c.layer)
    });
    Ul(a)
}

function Vl(a) {
    var b = 28631,
        c = {
            layer: 8
        };
    R(() => {
        [28631].includes(b) || (jk(new jf("createClientScreen() called with a non-page VE", b)), b = 83769);
        c.isHistoryNavigation || a.h.push({
            rootVe: b,
            key: c.key || ""
        });
        a.A = [];
        a.C = [];
        c.fa ? Ol(a, b, c) : Pl(a, b, c)
    })()
}

function Sl(a, b, c = 0) {
    R(() => {
        b.then(d => {
            a.i.has(c) && a.m && a.m();
            const e = Z(c),
                f = Gk(c);
            if (e && f) {
                var g;
                (d == null ? 0 : (g = d.response) == null ? 0 : g.trackingParams) && cl(a.client, e, f, zk(d.response.trackingParams));
                var k;
                (d == null ? 0 : (k = d.playerResponse) == null ? 0 : k.trackingParams) && cl(a.client, e, f, zk(d.playerResponse.trackingParams))
            }
        })
    })()
}

function Ql(a, b, c, d = 0) {
    R(() => {
        if (a.i.has(d)) return a.A.push([b, c]), !0;
        const e = Z(d),
            f = c || Gk(d);
        if (e && f) {
            if (S("combine_ve_grafts")) {
                const g = a.l.get(f.toString());
                g ? g.push(b) : (a.v.set(f.toString(), f), a.l.set(f.toString(), [b]));
                a.J || (a.J = mg(() => {
                    Tl(a, e)
                }, 1200))
            } else cl(a.client, e, f, b);
            return !0
        }
        return !1
    })()
}

function Wl(a, b) {
    return R(() => {
        const c = zk(b);
        Ql(a, c, void 0, 8);
        return c
    })()
}

function Tl(a, b) {
    if (b === void 0) {
        const c = Ik();
        for (let d = 0; d < c.length; d++) c[d] !== void 0 && Tl(a, c[d])
    } else a.l.forEach((c, d) => {
        (d = a.v.get(d)) && dl(a.client, b, d, c)
    }), a.l.clear(), a.v.clear(), a.J = void 0
}

function Xl(a, b, c = 0) {
    (c = Z(c)) && ll(a.client, c, b)
}

function Yl(a, b, c, d = 0) {
    if (!b) return !1;
    d = Z(d);
    if (!d) return !1;
    ll(a.client, d, zk(b), c);
    return !0
}

function Zl(a, b) {
    const c = b.getScreenLayer && b.getScreenLayer();
    b.visualElement ? Xl(a, b.visualElement, c) : (Il(), b = R(Cl().i).bind(Cl())(b), Yl(a, b, void 0, c))
}

function Rl(a, b, c, d = 0) {
    const e = Z(d);
    b = b || Gk(d);
    e && b && (a = a.client, d = bl({
        cttAuthInfo: Lk(e) || void 0
    }, e), c = {
        csn: e,
        ve: b.getAsJson(),
        clientData: c
    }, e === "UNDEFINED_CSN" ? gl("visualElementStateChanged", d, c) : a ? Yj("visualElementStateChanged", c, a, d) : Y("visualElementStateChanged", c, d))
}

function Ul(a) {
    for (var b = 0; b < a.s.length; b++) {
        var c = a.s[b];
        try {
            c()
        } catch (d) {
            ik(d)
        }
    }
    a.s.length = 0;
    for (b = 0; b < a.H.length; b++) {
        c = a.H[b];
        try {
            c()
        } catch (d) {
            ik(d)
        }
    }
}
var Nl = class {
    constructor() {
        this.A = [];
        this.C = [];
        this.h = [];
        this.s = [];
        this.H = [];
        this.l = new Map;
        this.v = new Map;
        this.i = new Set;
        this.W = new Map
    }
    j(a) {
        this.client = a
    }
    clickCommand(a, b, c = 0) {
        return Yl(this, a.clickTrackingParams, b, c)
    }
    stateChanged(a, b, c = 0) {
        this.visualElementStateChanged(zk(a), b, c)
    }
    visualElementStateChanged(a, b, c = 0) {
        c === 0 && this.i.has(c) ? this.C.push([a, b]) : Rl(this, a, b, c)
    }
};
const $l = {
        granted: "GRANTED",
        denied: "DENIED",
        unknown: "UNKNOWN"
    },
    am = RegExp("^(?:[a-z]+:)?//", "i");

function bm(a) {
    var b = a.data;
    a = b.type;
    b = b.data;
    a === "notifications_register" ? (O("IDToken", b), cm()) : a === "notifications_check_registration" && dm(b)
}

function em() {
    return self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    }).then(a => {
        if (a)
            for (const b of a) b.postMessage({
                type: "update_unseen_notifications_count_signal"
            })
    })
}

function fm(a) {
    const b = [];
    a.forEach(c => {
        b.push({
            key: c.key,
            value: c.value
        })
    });
    return b
}

function gm(a) {
    return r(function*() {
        const b = fm(a.payload.chrome.extraUrlParams),
            c = {
                recipientId: a.recipientId,
                endpoint: a.payload.chrome.endpoint,
                extraUrlParams: b
            },
            d = rf(df);
        return hm().then(e => tl(e, c, d).then(f => {
            f.json().then(g => g && g.endpointUrl ? im(a, g.endpointUrl) : Promise.resolve()).catch(g => {
                yl(g);
                Promise.reject(g)
            })
        }))
    })
}

function jm(a, b) {
    var c = Z(8);
    if (c == null || !b) return a;
    a = am.test(a) ? new URL(a) : new URL(a, self.registration.scope);
    a.searchParams.set("parentCsn", c);
    a.searchParams.set("parentTrackingParams", b);
    return a.toString()
}

function im(a, b) {
    a.deviceId && O("DeviceId", a.deviceId);
    a.timestampSec && O("TimestampLowerBound", a.timestampSec);
    const c = a.payload.chrome,
        d = Ml();
    Vl(d);
    var e;
    const f = (e = c.postedEndpoint) == null ? void 0 : e.clickTrackingParams;
    e = c.title;
    const g = {
        body: c.body,
        icon: c.iconUrl,
        data: {
            nav: jm(b, f),
            id: c.notificationId,
            attributionTag: c.attributionTag,
            clickEndpoint: c.clickEndpoint,
            postedEndpoint: c.postedEndpoint,
            clickTrackingParams: f,
            isDismissed: !0
        },
        tag: c.notificationTag || c.title + c.body + c.iconUrl,
        requireInteraction: !0
    };
    return self.registration.showNotification(e, g).then(() => {
        var k;
        ((k = g.data) == null ? 0 : k.postedEndpoint) && km(g.data.postedEndpoint);
        let h;
        if ((h = g.data) == null ? 0 : h.clickTrackingParams) k = {
            screenLayer: 8,
            visualElement: Wl(d, g.data.clickTrackingParams)
        }, Kl(k);
        lm(a.displayCap)
    }).catch(() => {})
}

function km(a) {
    if (!gj(a, cf)) return Promise.reject();
    const b = {
            serializedRecordNotificationInteractionsRequest: gj(a, cf).serializedInteractionsRequest
        },
        c = rf(ef);
    return hm().then(d => tl(d, b, c)).then(d => d)
}

function lm(a) {
    a !== -1 && self.registration.getNotifications().then(b => {
        for (let d = 0; d < b.length - a; d++) {
            b[d].data.isDismissed = !1;
            b[d].close();
            let e;
            if ((e = b[d].data) == null ? 0 : e.clickTrackingParams) {
                let f;
                var c = zk((f = b[d].data) == null ? void 0 : f.clickTrackingParams);
                const g = {
                        screenLayer: 8,
                        visualElement: c
                    },
                    k = Bk(82046),
                    h = Ml();
                Ql(h, k, c, 8);
                c = {
                    screenLayer: 8,
                    visualElement: k
                };
                Kl(c);
                Zl(h, c);
                Ll(g)
            }
        }
    })
}

function dm(a) {
    const b = [mm(a), nf("RegistrationTimestamp").then(nm), om(), pm(), qm()];
    Promise.all(b).catch(() => {
        O("IDToken", a);
        cm();
        return Promise.resolve()
    })
}

function nm(a) {
    return Date.now() - (a || 0) <= 9E7 ? Promise.resolve() : Promise.reject()
}

function mm(a) {
    return nf("IDToken").then(b => a === b ? Promise.resolve() : Promise.reject())
}

function om() {
    return nf("Permission").then(a => Notification.permission === a ? Promise.resolve() : Promise.reject())
}

function pm() {
    return nf("Endpoint").then(a => rm().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function qm() {
    return nf("application_server_key").then(a => sm().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function tm() {
    var a = Notification.permission;
    if ($l[a]) return $l[a]
}

function cm() {
    O("RegistrationTimestamp", 0);
    Promise.all([rm(), um(), vm(), sm()]).then(([a, b, c, d]) => {
        b = b ? gf(b) : null;
        c = c ? gf(c) : null;
        d = d ? Kb(new Uint8Array(d), 4) : null;
        wm(a, b, c, d)
    }).catch(() => {
        wm()
    })
}

function wm(a = null, b = null, c = null, d = null) {
    mf().then(e => {
        e && (O("Endpoint", a), O("P256dhKey", b), O("AuthKey", c), O("application_server_key", d), O("Permission", Notification.permission), Promise.all([nf("DeviceId"), nf("NotificationsDisabled")]).then(([f, g]) => {
            if (f != null) var k = f;
            else {
                f = [];
                var h;
                k = k || Ie.length;
                for (h = 0; h < 256; h++) f[h] = Ie[0 | Math.random() * k];
                k = f.join("")
            }
            xm(k, a != null ? a : void 0, b != null ? b : void 0, c != null ? c : void 0, d != null ? d : void 0, g != null ? g : void 0)
        }))
    })
}

function xm(a, b, c, d, e, f) {
    r(function*() {
        const g = {
                notificationRegistration: {
                    chromeRegistration: {
                        deviceId: a,
                        pushParams: {
                            applicationServerKey: e,
                            authKey: d,
                            p256dhKey: c,
                            browserEndpoint: b
                        },
                        notificationsDisabledInApp: f,
                        permission: tm()
                    }
                }
            },
            k = rf(ff);
        return hm().then(h => tl(h, g, k).then(() => {
            O("DeviceId", a);
            O("RegistrationTimestamp", Date.now());
            O("TimestampLowerBound", Date.now())
        }, l => {
            wl(l)
        }))
    })
}

function rm() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.endpoint) : Promise.resolve(null))
}

function um() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("p256dh")) : Promise.resolve(null))
}

function vm() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("auth")) : Promise.resolve(null))
}

function sm() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.options.applicationServerKey) : Promise.resolve(null))
}

function hm() {
    return r(function*() {
        try {
            return yield ok(!0), vl()
        } catch (a) {
            return yield wl(a), Promise.reject(a)
        }
    })
};
let ym = self.location.origin + "/";

function qk(a) {
    let b = typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope ? Be.registration.scope : ym;
    b.endsWith("/") && (b = b.slice(0, -1));
    return b + a
};
let zm = void 0;

function Am(a) {
    return r(function*() {
        zm || (zm = yield a.open("yt-appshell-assets"));
        return zm
    })
}

function Bm(a, b) {
    return r(function*() {
        const c = yield Am(a), d = b.map(e => Cm(c, e));
        return Promise.all(d)
    })
}

function Dm(a, b) {
    return r(function*() {
        let c;
        try {
            c = yield a.match(b, {
                cacheName: "yt-appshell-assets"
            })
        } catch (d) {}
        return c
    })
}

function Em(a, b) {
    return r(function*() {
        const c = yield Am(a), d = (yield c.keys()).filter(e => !b.includes(e.url)).map(e => c.delete(e));
        return Promise.all(d)
    })
}

function Fm(a, b, c) {
    return r(function*() {
        yield(yield Am(a)).put(b, c)
    })
}

function Gm(a, b) {
    r(function*() {
        yield(yield Am(a)).delete(b)
    })
}

function Cm(a, b) {
    return r(function*() {
        return (yield a.match(b)) ? Promise.resolve() : a.add(b)
    })
};
var Hm = Hh("yt-serviceworker-metadata", {
    L: {
        auth: {
            K: 1
        },
        ["resource-manifest-assets"]: {
            K: 2
        }
    },
    shared: !0,
    upgrade(a, b) {
        b(1) && Wg(a, "resource-manifest-assets");
        b(2) && Wg(a, "auth")
    },
    version: 2
});
let Im = null;

function Jm(a) {
    return oh(Hm(), a)
}

function Km() {
    return r(function*() {
        const a = yield yh();
        if (a) return Lm.h || (Lm.h = new Lm(a)), Lm.h
    })
}

function Mm(a, b) {
    return r(function*() {
        yield X(yield Jm(a.token), ["resource-manifest-assets"], "readwrite", c => {
            const d = c.objectStore("resource-manifest-assets"),
                e = Date.now();
            return V(d.h.put(b, e)).then(() => {
                Im = e;
                let f = !0;
                return ah(d, {
                    query: IDBKeyRange.bound(0, Date.now()),
                    direction: "prev"
                }, g => f ? (f = !1, jh(g)) : d.delete(g.getKey()).then(() => dh(g)))
            })
        })
    })
}

function Nm(a, b) {
    return r(function*() {
        let c = !1,
            d = 0;
        yield X(yield Jm(a.token), ["resource-manifest-assets"], "readonly", e => ah(e.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, f => {
            if (f.cursor.value.includes(b)) c = !0;
            else return d += 1, dh(f)
        }));
        return c ? d : -1
    })
}

function Om(a) {
    return r(function*() {
        Im || (yield X(yield Jm(a.token), ["resource-manifest-assets"], "readonly", b => ah(b.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, c => {
            Im = c.getKey()
        })));
        return Im
    })
}
var Lm = class {
    constructor(a) {
        this.token = a
    }
};

function Pm() {
    return r(function*() {
        const a = yield yh();
        if (a) return Qm.h || (Qm.h = new Qm(a)), Qm.h
    })
}

function Rm(a, b) {
    return r(function*() {
        yield Yg(yield Jm(a.token), "auth", b, "shell_identifier_key")
    })
}

function Sm(a) {
    return r(function*() {
        return (yield(yield Jm(a.token)).get("auth", "shell_identifier_key")) || ""
    })
}

function Tm(a) {
    return r(function*() {
        yield(yield Jm(a.token)).clear("auth")
    })
}
var Qm = class {
    constructor(a) {
        this.token = a
    }
};

function Um() {
    r(function*() {
        const a = yield Pm();
        a && (yield Tm(a))
    })
};
var Vm = class extends K {
    constructor(a) {
        super(a)
    }
    hasUrl() {
        return zd(this, 1) != null
    }
};

function Wm(a) {
    var b;
    void 0 === Ac ? b = 2 : b = 5;
    a = a.o;
    const c = D(a);
    return vd(a, c, Vm, 1, b, !1, !(2 & c))
}
var Xm = function(a, b) {
    return (c, d) => {
        if (Ud.length) {
            const f = Ud.pop();
            Pd(f, d);
            f.h.init(c, void 0, void 0, d);
            c = f
        } else c = new Td(c, d);
        try {
            const f = new a,
                g = f.o;
            Zd(b)(g, c);
            var e = f
        } finally {
            c.h.clear(), c.l = -1, c.i = -1, Ud.length < 100 && Ud.push(c)
        }
        return e
    }
}(class extends K {
    constructor(a) {
        super(a)
    }
}, [0,
    re, [0, qe]
]);

function Ym(a) {
    return r(function*() {
        const b = a.headers.get("X-Resource-Manifest");
        return b ? Promise.resolve(Zm(b)) : Promise.reject(Error("No resource manifest header"))
    })
}

function Zm(a) {
    return Wm(Xm(decodeURIComponent(a))).reduce((b, c) => {
        (c = Ad(c, 1)) && b.push(c);
        return b
    }, [])
};

function $m(a) {
    return r(function*() {
        const b = yield ok();
        if (b && zd(b, 3) != null) {
            var c = yield Pm();
            c && (c = yield Sm(c), zd(b, 3) !== c && (Gm(a.caches, a.h), Um()))
        }
    })
}

function an(a) {
    return r(function*() {
        let b, c;
        try {
            c = yield bn(a.i), b = yield Ym(c), yield Bm(a.caches, b)
        } catch (d) {
            return Promise.reject(d)
        }
        try {
            yield cn(), yield Fm(a.caches, a.h, c)
        } catch (d) {
            return Promise.reject(d)
        }
        if (b) try {
            yield dn(a, b, a.h)
        } catch (d) {}
        return Promise.resolve()
    })
}

function en(a) {
    return r(function*() {
        yield $m(a);
        return an(a)
    })
}

function bn(a) {
    return r(function*() {
        try {
            return yield t.fetch(new Request(a))
        } catch (b) {
            return Promise.reject(b)
        }
    })
}

function cn() {
    return r(function*() {
        var a = yield ok();
        let b;
        a && zd(a, 3) != null && (b = Ad(a, 3));
        return b ? (a = yield Pm()) ? Promise.resolve(Rm(a, b)) : Promise.reject(Error("Could not get AuthMonitor instance")) : Promise.reject(Error("Could not get datasync ID"))
    })
}

function dn(a, b, c) {
    return r(function*() {
        const d = yield Km();
        if (d) try {
            yield Mm(d, b)
        } catch (e) {
            yield wl(e)
        }
        b.push(c);
        try {
            yield Em(a.caches, b)
        } catch (e) {
            yield wl(e)
        }
        return Promise.resolve()
    })
}

function fn(a, b) {
    return r(function*() {
        return Dm(a.caches, b)
    })
}

function gn(a) {
    return r(function*() {
        return Dm(a.caches, a.h)
    })
}
var hn = class {
    constructor() {
        var a = self.caches;
        let b = qk("/app_shell");
        S("service_worker_forward_exp_params") && (b += self.location.search);
        var c = qk("/app_shell_home");
        this.caches = a;
        this.i = b;
        this.h = c
    }
};
var jn = class {
    constructor() {
        const a = this;
        this.stream = new ReadableStream({
            start(b) {
                a.close = () => void b.close();
                a.h = c => {
                    const d = c.getReader();
                    return d.read().then(function k({
                        done: f,
                        value: g
                    }) {
                        if (f) return Promise.resolve();
                        b.enqueue(g);
                        return d.read().then(k)
                    })
                };
                a.i = () => {
                    const c = (new TextEncoder).encode("<script>if (window.fetchInitialData) { window.fetchInitialData(); } else { window.getInitialData = undefined; }\x3c/script>");
                    b.enqueue(c)
                }
            }
        })
    }
};

function kn(a, b) {
    return r(function*() {
        const c = b.request,
            d = yield fn(a.h, c.url);
        if (d) return a.i && zl({
            appShellAssetLoadReport: {
                assetPath: c.url,
                cacheHit: !0
            },
            timestamp: W()
        }), d;
        ln(a, c);
        return mn(b)
    })
}

function nn(a, b) {
    return r(function*() {
        const c = yield on(b);
        if (c.response && (c.response.ok || c.response.type === "opaqueredirect" || c.response.status === 429 || c.response.status === 303 || c.response.status >= 300 && c.response.status < 400)) return c.response;
        const d = yield gn(a.h);
        if (d) return pn(a), qn(d, b);
        rn(a);
        return c.response ? c.response : Promise.reject(c.error)
    })
}

function sn(a, b) {
    b = new URL(b);
    if (!a.config.ra.includes(b.pathname)) return !1;
    if (!b.search) return !0;
    b = new URLSearchParams(b.search);
    for (const c of a.config.ta)
        if (a = b.get(c.key), c.value === void 0 || a === c.value)
            if (b.delete(c.key), !b.toString()) return !0;
    return !1
}

function tn(a, b) {
    return r(function*() {
        const c = yield gn(a.h);
        if (!c) return rn(a), mn(b);
        pn(a);
        var d;
        a: {
            if (c.headers && (d = c.headers.get("date")) && (d = Date.parse(d), !isNaN(d))) {
                d = Math.round(W() - d);
                break a
            }
            d = -1
        }
        if (!(d > -1 && d / 864E5 >= 7)) return qn(c, b);
        d = yield on(b);
        return d.response && d.response.ok ? d.response : qn(c, b)
    })
}

function mn(a) {
    return Promise.resolve(a.preloadResponse).then(b => b && !un(b) ? b : t.fetch(a.request))
}

function ln(a, b) {
    if (a.i) {
        var c = {
            assetPath: b.url,
            cacheHit: !1
        };
        Km().then(d => {
            if (d) {
                var e = Om(d).then(f => {
                    f && (c.currentAppBundleTimestampSec = String(Math.floor(f / 1E3)))
                });
                d = Nm(d, b.url).then(f => {
                    c.appBundleVersionDiffCount = f
                });
                Promise.all([e, d]).catch(f => {
                    wl(f)
                }).finally(() => {
                    zl({
                        appShellAssetLoadReport: c,
                        timestamp: W()
                    })
                })
            } else zl({
                appShellAssetLoadReport: c,
                timestamp: W()
            })
        })
    }
}

function pn(a) {
    a.i && zl({
        appShellAssetLoadReport: {
            assetPath: a.h.h,
            cacheHit: !0
        },
        timestamp: W()
    })
}

function rn(a) {
    a.i && zl({
        appShellAssetLoadReport: {
            assetPath: a.h.h,
            cacheHit: !1
        },
        timestamp: W()
    })
}

function qn(a, b) {
    if (!S("sw_nav_preload_pbj")) return a;
    const c = new jn,
        d = c.h(a.body);
    Promise.resolve(b.preloadResponse).then(e => {
        if (!e || !un(e)) throw Error("no pbj preload response available");
        d.then(() => c.h(e.body)).then(() => void c.close())
    }).catch(() => {
        d.then(() => {
            c.i();
            c.close()
        })
    });
    return new Response(c.stream, {
        status: a.status,
        statusText: a.statusText,
        headers: a.headers
    })
}

function on(a) {
    return r(function*() {
        try {
            return {
                response: yield mn(a)
            }
        } catch (b) {
            return {
                error: b
            }
        }
    })
}

function un(a) {
    return a.headers.get("x-navigation-preload-response-type") === "pbj"
}
var Dn = class {
    constructor() {
        var a = vn;
        var b = {
            xa: wn,
            Ha: xn([yn, /\/signin/, /\/logout/]),
            ra: ["/", "/feed/downloads"],
            ta: zn([{
                key: "feature",
                value: "ytca"
            }]),
            sa: An(S("kevlar_sw_app_wide_fallback") ? Bn : Cn)
        };
        this.h = a;
        this.config = b;
        a = T("app_shell_asset_log_fraction");
        this.i = !0;
        a && (this.i = Math.random() < a)
    }
};
const En = /^\/$/,
    Cn = [En, /^\/feed\/downloads$/],
    Bn = [En, /^\/feed\/\w*/, /^\/results$/, /^\/playlist$/, /^\/watch$/, /^\/channel\/\w*/];

function An(a) {
    return new RegExp(a.map(b => b.source).join("|"))
}
const Fn = /^https:\/\/([\w-]*\.)*youtube\.com.*/;

function xn(a) {
    a = An(a);
    return new RegExp(`${Fn.source}(${a.source})`)
}
const Gn = An([/\.css$/, /\.js$/, /\.ico$/, /\/ytmweb\/_\/js\//, /\/ytmweb\/_\/ss\//, /\/kabuki\/_\/js\//, /\/kabuki\/_\/ss\//, /\/ytmainappweb\/_\/ss\//]),
    wn = new RegExp(`${Fn.source}(${Gn.source})`),
    yn = /purge_shell=1/;

function zn(a = []) {
    const b = [];
    for (const c of Mf) b.push({
        key: c
    });
    for (const c of a) b.push(c);
    return b
}
xn([yn]);
zn();
var In = class {
    constructor() {
        var a = vn,
            b = Hn,
            c = self;
        if (t.URLPattern) {
            var d = [];
            S("service_worker_static_routing_exclude_embed") && d.push({
                condition: {
                    urlPattern: new URLPattern({
                        pathname: "/embed*"
                    })
                },
                source: "network"
            });
            S("service_worker_static_routing_exclude_innertube") && d.push({
                condition: {
                    urlPattern: new URLPattern({
                        pathname: "/youtubei/v1/*"
                    })
                },
                source: "network"
            })
        } else d = [];
        this.h = c;
        this.i = a;
        this.s = b;
        this.C = hf;
        this.j = d
    }
    init() {
        this.h.oninstall = this.v.bind(this);
        this.h.onactivate = this.l.bind(this);
        this.h.onfetch =
            this.m.bind(this);
        this.h.onmessage = this.A.bind(this)
    }
    v(a) {
        this.h.skipWaiting();
        if (S("service_worker_static_routing_registration") && this.j.length > 0 && a.addRoutes) try {
            a.addRoutes(this.j)
        } catch (c) {}
        const b = en(this.i).catch(c => {
            wl(c);
            return Promise.resolve()
        });
        a.waitUntil(b)
    }
    l(a) {
        const b = [this.h.clients.claim()],
            c = this.h.registration;
        c.navigationPreload && (b.push(c.navigationPreload.enable()), S("sw_nav_preload_pbj") && b.push(c.navigationPreload.setHeaderValue("pbj")));
        a.waitUntil(Promise.all(b))
    }
    m(a) {
        const b = this;
        return r(function*() {
            var c = b.s,
                d = !!b.h.registration.navigationPreload;
            const e = a.request;
            if (c.config.Ha.test(e.url)) pk.h && (delete pk.h.h, t.__SAPISID = void 0, P("VISITOR_DATA", void 0), P("SESSION_INDEX", void 0), P("DELEGATED_SESSION_ID", void 0), P("USER_SESSION_ID",
                void 0), P("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT", void 0)), d = a.respondWith, c = c.h, Gm(c.caches, c.h), Um(), c = mn(a), d.call(a, c);
            else if (c.config.xa.test(e.url)) a.respondWith(kn(c, a));
            else if (e.mode === "navigate") {
                const f = new URL(e.url);
                c.config.sa.test(f.pathname) ? a.respondWith(nn(c, a)) : sn(c, e.url) ? a.respondWith(tn(c, a)) : d && a.respondWith(mn(a))
            }
        })
    }
    A(a) {
        const b = a.data;
        this.C.includes(b.type) ? bm(a) : b.type === "refresh_shell" && an(this.i).catch(c => {
            wl(c)
        })
    }
};

function Jn() {
    let a = u("ytglobal.storage_");
    a || (a = new Kn, w("ytglobal.storage_", a));
    return a
}
var Kn = class {
    estimate() {
        return r(function*() {
            const a = navigator;
            let b;
            if ((b = a.storage) == null ? 0 : b.estimate) return a.storage.estimate();
            let c;
            if ((c = a.webkitTemporaryStorage) == null ? 0 : c.queryUsageAndQuota) return Ln()
        })
    }
};

function Ln() {
    const a = navigator;
    return new Promise((b, c) => {
        let d;
        (d = a.webkitTemporaryStorage) != null && d.queryUsageAndQuota ? a.webkitTemporaryStorage.queryUsageAndQuota((e, f) => {
            b({
                usage: e,
                quota: f
            })
        }, e => {
            c(e)
        }) : c(Error("webkitTemporaryStorage is not supported."))
    })
}
w("ytglobal.storageClass_", Kn);

function Mn(a, b) {
    Jn().estimate().then(c => {
        c = Object.assign({}, b, {
            isSw: self.document === void 0,
            isIframe: self !== self.top,
            deviceStorageUsageMbytes: Nn(c == null ? void 0 : c.usage),
            deviceStorageQuotaMbytes: Nn(c == null ? void 0 : c.quota)
        });
        a.h("idbQuotaExceeded", c)
    })
}
class On {
    constructor() {
        var a = Pn;
        this.handleError = Qn;
        this.h = a;
        this.i = !1;
        self.document === void 0 || self.addEventListener("beforeunload", () => {
            this.i = !0
        });
        this.j = Math.random() <= .2
    }
    R(a, b) {
        switch (a) {
            case "IDB_DATA_CORRUPTED":
                S("idb_data_corrupted_killswitch") || this.h("idbDataCorrupted", b);
                break;
            case "IDB_UNEXPECTEDLY_CLOSED":
                this.h("idbUnexpectedlyClosed", b);
                break;
            case "IS_SUPPORTED_COMPLETED":
                S("idb_is_supported_completed_killswitch") || this.h("idbIsSupportedCompleted", b);
                break;
            case "QUOTA_EXCEEDED":
                Mn(this, b);
                break;
            case "TRANSACTION_ENDED":
                this.j && Math.random() <= .1 && this.h("idbTransactionEnded", b);
                break;
            case "TRANSACTION_UNEXPECTEDLY_ABORTED":
                a = Object.assign({},
                    b, {
                        hasWindowUnloaded: this.i
                    }), this.h("idbTransactionAborted", a)
        }
    }
}

function Nn(a) {
    return typeof a === "undefined" ? "-1" : String(Math.ceil(a / 1048576))
};
$f(Xf(), {
    F: [{
        Fa: /Failed to fetch/,
        weight: 500
    }],
    D: []
});
({
    handleError: Qn = hk,
    R: Pn = Y
} = {
    handleError: yl,
    R: function(a, b) {
        return r(function*() {
            yield xl();
            Y(a, b)
        })
    }
});
var Pn, Qn;
for (ug = new On; tg.length > 0;) {
    const a = tg.shift();
    switch (a.type) {
        case "ERROR":
            ug.handleError(a.payload);
            break;
        case "EVENT":
            ug.R(a.eventType, a.payload)
    }
}
pk.h = new pk;
self.onnotificationclick = function(a) {
    a.notification.close();
    const b = a.notification.data;
    b.isDismissed = !1;
    const c = self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    });
    c.then(d => {
        a: {
            var e = b.nav;
            for (const f of d)
                if (f.url === e) {
                    f.focus();
                    break a
                }
            self.clients.openWindow(e)
        }
    });
    a.waitUntil(c);
    a.waitUntil(km(b.clickEndpoint))
};
self.onnotificationclose = function(a) {
    var b = a.notification.data;
    if (b == null ? 0 : b.clickTrackingParams) {
        var c = zk(b.clickTrackingParams);
        a = {
            screenLayer: 8,
            visualElement: c
        };
        if (b.isDismissed) {
            const d = Bk(74726);
            b = Ml();
            Ql(b, d, c, 8);
            c = {
                screenLayer: 8,
                visualElement: d
            };
            Kl(c);
            Zl(b, c)
        }
        Ll(a)
    }
};
self.onpush = function(a) {
    a.waitUntil(nf("NotificationsDisabled").then(b => {
        if (b) return Promise.resolve();
        if (a.data && a.data.text().length) try {
            return gm(a.data.json())
        } catch (c) {
            return Promise.resolve(c.message)
        }
        return Promise.resolve()
    }));
    a.waitUntil(em())
};
self.onpushsubscriptionchange = function() {
    cm()
};
const vn = new hn,
    Hn = new Dn;
(new In).init();