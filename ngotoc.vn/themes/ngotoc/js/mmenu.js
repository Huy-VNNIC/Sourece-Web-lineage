/*
 * jQuery mmenu v5.5.3
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
! function(e) {
    function n() {
        e[t].glbl || (l = {
            $wndw: e(window),
            $html: e("html"),
            $body: e("body")
        }, a = {}, i = {}, r = {}, e.each([a, i, r], function(e, n) {
            n.add = function(e) {
                e = e.split(" ");
                for (var t = 0, s = e.length; s > t; t++) n[e[t]] = n.mm(e[t])
            }
        }), a.mm = function(e) {
            return "mm-" + e
        }, a.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"), a.umm = function(e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, i.mm = function(e) {
            return "mm-" + e
        }, i.add("parent sub"), r.mm = function(e) {
            return e + ".mm"
        }, r.add("transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend click keydown"), e[t]._c = a, e[t]._d = i, e[t]._e = r, e[t].glbl = l)
    }
    var t = "mmenu",
        s = "5.5.3";
    if (!(e[t] && e[t].version > s)) {
        e[t] = function(e, n, t) {
            this.$menu = e, this._api = ["bind", "init", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"], this.opts = n, this.conf = t, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
            var s = this.$pnls.children();
            return this._initAddons(), this.init(s), "function" == typeof this.___debug && this.___debug(), this
        }, e[t].version = s, e[t].addons = {}, e[t].uniqueId = 0, e[t].defaults = {
            extensions: [],
            navbar: {
                add: !0,
                title: "Menu",
                titleLink: "panel"
            },
            onClick: {
                setSelected: !0
            },
            slidingSubmenus: !0
        }, e[t].configuration = {
            classNames: {
                divider: "Divider",
                inset: "Inset",
                panel: "Panel",
                selected: "Selected",
                spacer: "Spacer",
                vertical: "Vertical"
            },
            clone: !1,
            openingInterval: 25,
            panelNodetype: "ul, ol, div",
            transitionDuration: 400
        }, e[t].prototype = {
            init: function(e) {
                e = e.not("." + a.nopanel), e = this._initPanels(e), this.trigger("init", e), this.trigger("update")
            },
            update: function() {
                this.trigger("update")
            },
            setSelected: function(e) {
                this.$menu.find("." + a.listview).children().removeClass(a.selected), e.addClass(a.selected), this.trigger("setSelected", e)
            },
            openPanel: function(n) {
                var s = n.parent();
                if (s.hasClass(a.vertical)) {
                    var i = s.parents("." + a.subopened);
                    if (i.length) return this.openPanel(i.first());
                    s.addClass(a.opened)
                } else {
                    if (n.hasClass(a.current)) return;
                    var r = this.$pnls.children("." + a.panel),
                        l = r.filter("." + a.current);
                    r.removeClass(a.highest).removeClass(a.current).not(n).not(l).not("." + a.vertical).addClass(a.hidden), e[t].support.csstransitions || l.addClass(a.hidden), n.hasClass(a.opened) ? n.nextAll("." + a.opened).addClass(a.highest).removeClass(a.opened).removeClass(a.subopened) : (n.addClass(a.highest), l.addClass(a.subopened)), n.removeClass(a.hidden).addClass(a.current), setTimeout(function() {
                        n.removeClass(a.subopened).addClass(a.opened)
                    }, this.conf.openingInterval)
                }
                this.trigger("openPanel", n)
            },
            closePanel: function(e) {
                var n = e.parent();
                n.hasClass(a.vertical) && (n.removeClass(a.opened), this.trigger("closePanel", e))
            },
            closeAllPanels: function() {
                this.$menu.find("." + a.listview).children().removeClass(a.selected).filter("." + a.vertical).removeClass(a.opened);
                var e = this.$pnls.children("." + a.panel),
                    n = e.first();
                this.$pnls.children("." + a.panel).not(n).removeClass(a.subopened).removeClass(a.opened).removeClass(a.current).removeClass(a.highest).addClass(a.hidden), this.openPanel(n)
            },
            togglePanel: function(e) {
                var n = e.parent();
                n.hasClass(a.vertical) && this[n.hasClass(a.opened) ? "closePanel" : "openPanel"](e)
            },
            getInstance: function() {
                return this
            },
            bind: function(e, n) {
                this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(n)
            },
            trigger: function() {
                var e = this,
                    n = Array.prototype.slice.call(arguments),
                    t = n.shift();
                if (this.cbck[t])
                    for (var s = 0, a = this.cbck[t].length; a > s; s++) this.cbck[t][s].apply(e, n)
            },
            _initMenu: function() {
                this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function() {
                    e(this).attr("id", a.mm(e(this).attr("id")))
                })), this.$menu.contents().each(function() {
                    3 == e(this)[0].nodeType && e(this).remove()
                }), this.$pnls = e('<div class="' + a.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.parent().addClass(a.wrapper);
                var n = [a.menu];
                this.opts.slidingSubmenus || n.push(a.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && n.push(this.opts.extensions), this.$menu.addClass(n.join(" "))
            },
            _initPanels: function(n) {
                var t = this,
                    s = this.__findAddBack(n, "ul, ol");
                this.__refactorClass(s, this.conf.classNames.inset, "inset").addClass(a.nolistview + " " + a.nopanel), s.not("." + a.nolistview).addClass(a.listview);
                var r = this.__findAddBack(n, "." + a.listview).children();
                this.__refactorClass(r, this.conf.classNames.selected, "selected"), this.__refactorClass(r, this.conf.classNames.divider, "divider"), this.__refactorClass(r, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(n, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
                var l = e(),
                    d = n.add(n.find("." + a.panel)).add(this.__findAddBack(n, "." + a.listview).children().children(this.conf.panelNodetype)).not("." + a.nopanel);
                this.__refactorClass(d, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || d.addClass(a.vertical), d.each(function() {
                    var n = e(this),
                        s = n;
                    n.is("ul, ol") ? (n.wrap('<div class="' + a.panel + '" />'), s = n.parent()) : s.addClass(a.panel);
                    var i = n.attr("id");
                    n.removeAttr("id"), s.attr("id", i || t.__getUniqueId()), n.hasClass(a.vertical) && (n.removeClass(t.conf.classNames.vertical), s.add(s.parent()).addClass(a.vertical)), l = l.add(s)
                });
                var o = e("." + a.panel, this.$menu);
                l.each(function() {
                    var n = e(this),
                        s = n.parent(),
                        r = s.children("a, span").first();
                    if (s.is("." + a.panels) || (s.data(i.sub, n), n.data(i.parent, s)), !s.children("." + a.next).length && s.parent().is("." + a.listview)) {
                        var l = n.attr("id"),
                            d = e('<a class="' + a.next + '" href="#' + l + '" data-target="#' + l + '" />').insertBefore(r);
                        r.is("span") && d.addClass(a.fullsubopen)
                    }
                    if (!n.children("." + a.navbar).length && !s.hasClass(a.vertical)) {
                        if (s.parent().is("." + a.listview)) var s = s.closest("." + a.panel);
                        else var r = s.closest("." + a.panel).find('a[href="#' + n.attr("id") + '"]').first(),
                            s = r.closest("." + a.panel);
                        var o = e('<div class="' + a.navbar + '" />');
                        if (s.length) {
                            var l = s.attr("id");
                            switch (t.opts.navbar.titleLink) {
                                case "anchor":
                                    _url = r.attr("href");
                                    break;
                                case "panel":
                                case "parent":
                                    _url = "#" + l;
                                    break;
                                case "none":
                                default:
                                    _url = !1
                            }
                            o.append('<a class="' + a.btn + " " + a.prev + '" href="#' + l + '" data-target="#' + l + '" />').append(e('<a class="' + a.title + '"' + (_url ? ' href="' + _url + '"' : "") + " />").text(r.text())).prependTo(n), t.opts.navbar.add && n.addClass(a.hasnavbar)
                        } else t.opts.navbar.title && (o.append('<a class="' + a.title + '">' + t.opts.navbar.title + "</a>").prependTo(n), t.opts.navbar.add && n.addClass(a.hasnavbar))
                    }
                });
                var c = this.__findAddBack(n, "." + a.listview).children("." + a.selected).removeClass(a.selected).last().addClass(a.selected);
                c.add(c.parentsUntil("." + a.menu, "li")).filter("." + a.vertical).addClass(a.opened).end().not("." + a.vertical).each(function() {
                    e(this).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened)
                }), c.children("." + a.panel).not("." + a.vertical).addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened);
                var h = o.filter("." + a.opened);
                return h.length || (h = l.first()), h.addClass(a.opened).last().addClass(a.current), l.not("." + a.vertical).not(h.last()).addClass(a.hidden).end().appendTo(this.$pnls), l
            },
            _initAnchors: function() {
                var n = this;
                l.$body.on(r.click + "-oncanvas", "a[href]", function(s) {
                    var i = e(this),
                        r = !1,
                        l = n.$menu.find(i).length;
                    for (var d in e[t].addons)
                        if (r = e[t].addons[d].clickAnchor.call(n, i, l)) break;
                    if (!r && l) {
                        var o = i.attr("href");
                        if (o.length > 1 && "#" == o.slice(0, 1)) try {
                            var c = e(o, n.$menu);
                            c.is("." + a.panel) && (r = !0, n[i.parent().hasClass(a.vertical) ? "togglePanel" : "openPanel"](c))
                        } catch (h) {}
                    }
                    if (r && s.preventDefault(), !r && l && i.is("." + a.listview + " > li > a") && !i.is('[rel="external"]') && !i.is('[target="_blank"]')) {
                        n.__valueOrFn(n.opts.onClick.setSelected, i) && n.setSelected(e(s.target).parent());
                        var p = n.__valueOrFn(n.opts.onClick.preventDefault, i, "#" == o.slice(0, 1));
                        p && s.preventDefault(), n.__valueOrFn(n.opts.onClick.close, i, p) && n.close()
                    }
                })
            },
            _initAddons: function() {
                for (var n in e[t].addons) e[t].addons[n].add.call(this), e[t].addons[n].add = function() {};
                for (var n in e[t].addons) e[t].addons[n].setup.call(this)
            },
            __api: function() {
                var n = this,
                    t = {};
                return e.each(this._api, function() {
                    var e = this;
                    t[e] = function() {
                        var s = n[e].apply(n, arguments);
                        return "undefined" == typeof s ? t : s
                    }
                }), t
            },
            __valueOrFn: function(e, n, t) {
                return "function" == typeof e ? e.call(n[0]) : "undefined" == typeof e && "undefined" != typeof t ? t : e
            },
            __refactorClass: function(e, n, t) {
                return e.filter("." + n).removeClass(n).addClass(a[t])
            },
            __findAddBack: function(e, n) {
                return e.find(n).add(e.filter(n))
            },
            __filterListItems: function(e) {
                return e.not("." + a.divider).not("." + a.hidden)
            },
            __transitionend: function(e, n, t) {
                var s = !1,
                    a = function() {
                        s || n.call(e[0]), s = !0
                    };
                e.one(r.transitionend, a), e.one(r.webkitTransitionEnd, a), setTimeout(a, 1.1 * t)
            },
            __getUniqueId: function() {
                return a.mm(e[t].uniqueId++)
            }
        }, e.fn[t] = function(s, a) {
            return n(), s = e.extend(!0, {}, e[t].defaults, s), a = e.extend(!0, {}, e[t].configuration, a), this.each(function() {
                var n = e(this);
                if (!n.data(t)) {
                    var i = new e[t](n, s, a);
                    n.data(t, i.__api())
                }
            })
        }, e[t].support = {
            touch: "ontouchstart" in window || navigator.msMaxTouchPoints,
            csstransitions: function() {
                if ("undefined" != typeof Modernizr && "undefined" != typeof Modernizr.csstransitions) return Modernizr.csstransitions;
                var e = document.body || document.documentElement,
                    n = e.style,
                    t = "transition";
                if ("string" == typeof n[t]) return !0;
                var s = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
                t = t.charAt(0).toUpperCase() + t.substr(1);
                for (var a = 0; a < s.length; a++)
                    if ("string" == typeof n[s[a] + t]) return !0;
                return !1
            }()
        };
        var a, i, r, l
    }
}(jQuery);
/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(e) {
    var t = "mmenu",
        o = "offCanvas";
    e[t].addons[o] = {
        setup: function() {
            if (this.opts[o]) {
                var s = this.opts[o],
                    i = this.conf[o];
                a = e[t].glbl, this._api = e.merge(this._api, ["open", "close", "setPage"]), ("top" == s.position || "bottom" == s.position) && (s.zposition = "front"), "string" != typeof i.pageSelector && (i.pageSelector = "> " + i.pageNodetype), a.$allMenus = (a.$allMenus || e()).add(this.$menu), this.vars.opened = !1;
                var r = [n.offcanvas];
                "left" != s.position && r.push(n.mm(s.position)), "back" != s.zposition && r.push(n.mm(s.zposition)), this.$menu.addClass(r.join(" ")).parent().removeClass(n.wrapper), this.setPage(a.$page), this._initBlocker(), this["_initWindow_" + o](), this.$menu[i.menuInjectMethod + "To"](i.menuWrapperSelector)
            }
        },
        add: function() {
            n = e[t]._c, s = e[t]._d, i = e[t]._e, n.add("offcanvas slideout blocking modal background opening blocker page"), s.add("style"), i.add("resize")
        },
        clickAnchor: function(e) {
            if (!this.opts[o]) return !1;
            var t = this.$menu.attr("id");
            if (t && t.length && (this.conf.clone && (t = n.umm(t)), e.is('[href="#' + t + '"]'))) return this.open(), !0;
            if (a.$page) {
                var t = a.$page.first().attr("id");
                return t && t.length && e.is('[href="#' + t + '"]') ? (this.close(), !0) : !1
            }
        }
    }, e[t].defaults[o] = {
        position: "left",
        zposition: "back",
        blockUI: !0,
        moveBackground: !0
    }, e[t].configuration[o] = {
        pageNodetype: "div",
        pageSelector: null,
        noPageSelector: [],
        wrapPageIfNeeded: !0,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, e[t].prototype.open = function() {
        if (!this.vars.opened) {
            var e = this;
            this._openSetup(), setTimeout(function() {
                e._openFinish()
            }, this.conf.openingInterval), this.trigger("open")
        }
    }, e[t].prototype._openSetup = function() {
        var t = this,
            r = this.opts[o];
        this.closeAllOthers(), a.$page.each(function() {
            e(this).data(s.style, e(this).attr("style") || "")
        }), a.$wndw.trigger(i.resize + "-" + o, [!0]);
        var p = [n.opened];
        r.blockUI && p.push(n.blocking), "modal" == r.blockUI && p.push(n.modal), r.moveBackground && p.push(n.background), "left" != r.position && p.push(n.mm(this.opts[o].position)), "back" != r.zposition && p.push(n.mm(this.opts[o].zposition)), this.opts.extensions && p.push(this.opts.extensions), a.$html.addClass(p.join(" ")), setTimeout(function() {
            t.vars.opened = !0
        }, this.conf.openingInterval), this.$menu.addClass(n.current + " " + n.opened)
    }, e[t].prototype._openFinish = function() {
        var e = this;
        this.__transitionend(a.$page.first(), function() {
            e.trigger("opened")
        }, this.conf.transitionDuration), a.$html.addClass(n.opening), this.trigger("opening")
    }, e[t].prototype.close = function() {
        if (this.vars.opened) {
            var t = this;
            this.__transitionend(a.$page.first(), function() {
                t.$menu.removeClass(n.current).removeClass(n.opened), a.$html.removeClass(n.opened).removeClass(n.blocking).removeClass(n.modal).removeClass(n.background).removeClass(n.mm(t.opts[o].position)).removeClass(n.mm(t.opts[o].zposition)), t.opts.extensions && a.$html.removeClass(t.opts.extensions), a.$page.each(function() {
                    e(this).attr("style", e(this).data(s.style))
                }), t.vars.opened = !1, t.trigger("closed")
            }, this.conf.transitionDuration), a.$html.removeClass(n.opening), this.trigger("close"), this.trigger("closing")
        }
    }, e[t].prototype.closeAllOthers = function() {
        a.$allMenus.not(this.$menu).each(function() {
            var o = e(this).data(t);
            o && o.close && o.close()
        })
    }, e[t].prototype.setPage = function(t) {
        var s = this,
            i = this.conf[o];
        t && t.length || (t = a.$body.find(i.pageSelector), i.noPageSelector.length && (t = t.not(i.noPageSelector.join(", "))), t.length > 1 && i.wrapPageIfNeeded && (t = t.wrapAll("<" + this.conf[o].pageNodetype + " />").parent())), t.each(function() {
            e(this).attr("id", e(this).attr("id") || s.__getUniqueId())
        }), t.addClass(n.page + " " + n.slideout), a.$page = t, this.trigger("setPage", t)
    }, e[t].prototype["_initWindow_" + o] = function() {
        a.$wndw.off(i.keydown + "-" + o).on(i.keydown + "-" + o, function(e) {
            return a.$html.hasClass(n.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var e = 0;
        a.$wndw.off(i.resize + "-" + o).on(i.resize + "-" + o, function(t, o) {
            if (1 == a.$page.length && (o || a.$html.hasClass(n.opened))) {
                var s = a.$wndw.height();
                (o || s != e) && (e = s, a.$page.css("minHeight", s))
            }
        })
    }, e[t].prototype._initBlocker = function() {
        var t = this;
        this.opts[o].blockUI && (a.$blck || (a.$blck = e('<div id="' + n.blocker + '" class="' + n.slideout + '" />')), a.$blck.appendTo(a.$body).off(i.touchstart + "-" + o + " " + i.touchmove + "-" + o).on(i.touchstart + "-" + o + " " + i.touchmove + "-" + o, function(e) {
            e.preventDefault(), e.stopPropagation(), a.$blck.trigger(i.mousedown + "-" + o)
        }).off(i.mousedown + "-" + o).on(i.mousedown + "-" + o, function(e) {
            e.preventDefault(), a.$html.hasClass(n.modal) || (t.closeAllOthers(), t.close())
        }))
    };
    var n, s, i, a
}(jQuery);