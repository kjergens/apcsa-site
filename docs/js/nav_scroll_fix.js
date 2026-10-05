// The readthedocs theme's bundled theme.js scrolls the active sidebar link
// to the top of the nav on every page load (Element.scrollIntoView() with
// no options defaults to aligning to the top). That's disorienting when
// navigating a long table of contents. This patches it to only scroll the
// minimum distance needed to bring the active link into view.
(function () {
    if (!window.SphinxRtdTheme || !window.SphinxRtdTheme.Navigation) {
        return;
    }

    var nav = window.SphinxRtdTheme.Navigation;
    var originalReset = nav.reset;

    nav.reset = function () {
        var originalScrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function () {
            originalScrollIntoView.call(this, { block: "nearest" });
        };
        try {
            originalReset.apply(this, arguments);
        } finally {
            Element.prototype.scrollIntoView = originalScrollIntoView;
        }
    };
})();
