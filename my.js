+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
            s = o.data("bs.carousel"),
            n = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
            r = "string" == typeof e ? e : n.slide;
            s || o.data("bs.carousel", s = new i(this, n)), "number" == typeof e ? s.to(e) : r ? s[r]() : n.interval && s.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e).on("keydown.bs.carousel", t.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.2.0", i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, i.prototype.keydown = function(t) {
        switch (t.which) {
            case 37:
            this.prev();
            break;
            case 39:
            this.next();
            break;
            default:
            return
        }
        t.preventDefault()
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.to = function(e) {
        var i = this,
        o = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            i.to(e)
        }) : o == e ? this.pause().cycle() : this.slide(e > o ? "next" : "prev", t(this.$items[e]))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function(e, i) {
        var o = this.$element.find(".item.active"),
        s = i || o[e](),
        n = this.interval,
        r = "next" == e ? "left" : "right",
        a = "next" == e ? "first" : "last",
        l = this;
        if (!s.length) {
            if (!this.options.wrap) return;
            s = this.$element.find(".item")[a]()
        }
        if (s.hasClass("active")) return this.sliding = !1;
        var h = s[0],
        p = t.Event("slide.bs.carousel", {
            relatedTarget: h,
            direction: r
        });
        if (this.$element.trigger(p), !p.isDefaultPrevented()) {
            if (this.sliding = !0, n && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = t(this.$indicators.children()[this.getItemIndex(s)]);
                c && c.addClass("active")
            }
            var d = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, o.addClass(r), s.addClass(r), o.one("bsTransitionEnd", function() {
                s.removeClass([e, r].join(" ")).addClass("active"), o.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(d)
                }, 0)
            }).emulateTransitionEnd(1e3 * o.css("transition-duration").slice(0, -1))) : (o.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(d)), n && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o, this
    }, t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(i) {
        var o, s = t(this),
        n = t(s.attr("data-target") || (o = s.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (n.hasClass("carousel")) {
            var r = t.extend({}, n.data(), s.data()),
            a = s.attr("data-slide-to");
            a && (r.interval = !1), e.call(n, r), a && n.data("bs.carousel").to(a), i.preventDefault()
        }
    }), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery)

function parseURL(url) {
    var parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

function moveleft() {

    $(".str_move").animate({
        left: "-=1000"
    },
    10000,
    "linear",
    function() {
        if (parseInt($(this).css("left")) < -10000) {
            $(this).css("left", "0");
        }
        moveleft();
    });

}

$(document).ready(function() {

    //бегущие строки
    moveleft();


    //попап контейнер
    $('body').append('<section data-level="true" data-popup="popup" class="popup login reg scrolling active" id="popup_static" ></section>');

    //попап закрытие
    $(document).on('click', '.popup-close, .close_btn', function() {
        $('#popup_static').hide();
        $('.popup_hide').show();
        $('#popup_static').empty();
        return false;
    })


    //попап открытие
    $(document).on('click', '.open_popup', function() {
        $('#popup_static').show();
        if ($('[data-nav=menu]').length) {
            $('body').removeClass('menu-open')
        }
        if ($('.pushy').length) {
            $('body').removeClass('pushy-open-left')
        }
        $('#popup_static').load(this.href);
        $('.popup_hide').hide();

        return false;
    })

    //подсказки
    $('.showhint').focus(function() {
        $('#' + this.id + '_hint').css('opacity', "1");
    })

    $('.showhint').focusout(function() {
        $('#' + this.id + '_hint').css('opacity', "0");
    })



    $('._profile, ._status').click(function(e) {
        e.preventDefault();
        $('#bonuses_menu').toggle();
    });


    //FAQ разворачивание пунктов
    $("a.faq-item__title").click(function() {
        if ($(this).hasClass('collapsed')) {
            $("a.faq-item__title").addClass('collapsed');
            $("a.faq-item__title").siblings("div.collapse").removeClass('in');
            $(this).removeClass("collapsed");
            $(this).siblings("div.collapse").addClass("in");
        } else {
            $(this).addClass("collapsed");
            $(this).siblings("div.collapse").removeClass("in");
        }

    });
});

$(window).load(function() {


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
    $(document).on('click', '.show_popup', function() {
        $('#popup_static').show();
        if ($('[data-nav=menu]').length) {
            $('body').removeClass('menu-open')
        }
        if ($('.pushy').length) {
            $('body').removeClass('pushy-open-left')
        }

        $('#popup_static').load($(this).data('href'));
        $('.popup_hide').hide();

        return false;
    });
});

//Плавный скролл к якорю ссылки
$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 50
    }, 500);
});
//Преобразование секунд в дату
$(window).load(function() {
    String.prototype.toHHMMSS = function() {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var days = Math.floor(sec_num / 86400);
        var hours = Math.floor((sec_num - (days * 86400)) / 3600);
        var minutes = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60);
        var seconds = sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);

        if (days < 10) {
            days = "0" + days;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return days + '.' + hours + ':' + minutes + ':' + seconds;
    }
});

jQuery(function($) {

  $(document).ready(function() {
  $("#bookmarkme").click(function() {
    if (window.sidebar) { // Mozilla Firefox Bookmark
      window.sidebar.addPanel(location.href,document.title,"");
    } else if(window.external) { // IE Favorite
      window.external.AddFavorite(location.href,document.title); }
    else if(window.opera && window.print) { // Opera Hotlist
      this.title=document.title;
      return true;
    }
  });
});