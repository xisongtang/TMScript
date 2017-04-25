// ==UserScript==
// @name         customizer entry
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  add customizer entry in my design
// @author       xishuai
// @match        http://cabinet.qunhequnhe.com/cloud/mydesign
// @match        http*://alpha.kujiale.com/cloud/mydesign
// @match        http*://*.kujiale.com/mydesign
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var ul = document.querySelector('ul.deco-list');
    for (var i = 0; i < ul.children.length; i++) {
        var li = ul.children[i];
        var planId = li.dataset.planid, designId = li.dataset.dsid, isDecoration = li.dataset.isdeco === "true";
        if (!isDecoration) continue;
        var parent = li.querySelector('div.actions');
        var host = window.location.host;
        var url, dUrl;
        if (host.startsWith("beta") || host.startsWith("yun")) {
            url = "/customized?obsdesignid=" + designId;
            dUrl = "/decoration?obsdesignid=" + designId;
        } else {
            url = "/cloud/customized?obsdesignid=" + designId;
            dUrl = "/cloud/decoration?obsdesignid=" + designId;
        }
        var a = document.createElement("a");
        a.href = url;
        a.classList = "ktask-ds fl br3";
        a.target = "_blank";
        a.append("全屋定制");
        parent.appendChild(a);

        a = document.createElement("a");
        a.href = dUrl;
        a.classList = "trans fl br3 mr3";
        a.target = "_blank";
        a.append("硬装工具");
        parent.appendChild(a);
    }
})();