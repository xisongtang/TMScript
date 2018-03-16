// ==UserScript==
// @name         customizer entry
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  add customizer entry in my design
// @author       xishuai
// @match        */mydesign*
// @match        */*/mydesign*
// @grant        none
// ==/UserScript==

setTimeout(
    function () {
        'use strict';
        var btns = document.querySelectorAll('.list-btn');
        const reg = /.*designid\/(.*)\?.*/;
        console.log(btns.length);
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            var href = btn.querySelector("a").href;
            var regres = reg.exec(href);
            if (!regres) continue;
            var designId = regres[1];
            var huxing = btn.querySelector('.modify-huxing');
            var host = window.location.host;
            var url;
            if (host.startsWith("beta") || host.startsWith("yun")) {
                url = "/customized?obsdesignid=";
            } else {
                url = "/cloud/customized?obsdesignid=";
            }
            url += designId + "&redirecturl=" + encodeURIComponent(href);
            var node = huxing.cloneNode(true);
            node.style.zIndex = 10;
            var a = node.childNodes[0];
            a.innerHTML = "全屋定制";
            a.href = url;
            btn.appendChild(node);
        }
    }, 1000);