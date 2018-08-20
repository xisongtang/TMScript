// ==UserScript==
// @name         customizer entry
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  add customizer entry in my design
// @author       xishuai
// @match        */mydesign*
// @match        */*/mydesign*
// @match        */pcenter*
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
            var url, dUrl;
            if (host.startsWith("beta") || host.startsWith("yun")) {
                url = "/customized?obsdesignid=";
                dUrl = "/tool/h5/diy?designid=";
            } else {
                url = "/cloud/customized?obsdesignid=";
                dUrl = "/cloud/tool/h5/diy?designid=";
            }
            url += designId + "&redirecturl=" + encodeURIComponent(href);
            dUrl += designId + "&redirecturl=" + encodeURIComponent(location.href);

            var node = huxing.cloneNode(true);
            node.style.zIndex = 10;
            var a = node.childNodes[0];
            a.innerHTML = "全屋定制";
            a.href = url;
            btn.appendChild(node);

            node = huxing.cloneNode(true);
            node.style.zIndex = 10;
            a = node.childNodes[0];
            a.innerHTML = "DIY h5";
            a.href = dUrl;
            btn.appendChild(node);
        }
    }, 1000);