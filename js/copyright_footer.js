// Fills the readthedocs theme's empty footer contentinfo slot with a
// copyright notice on every page.
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var slot = document.querySelector('footer div[role="contentinfo"]');
        if (!slot) {
            return;
        }
        var notice = document.createElement("p");
        notice.textContent = "© " + new Date().getFullYear() + " Katie Jergens. All rights reserved.";
        slot.appendChild(notice);
    });
})();
