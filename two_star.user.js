// ==UserScript==
// @name         TwoStar
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  hotfix分支需要两个star才能merge
// @author       xishuai
// @match        gitlab.qunhequnhe.com/tool-frontend/custom/*/merge_requests/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function getCurrentStarNum() {
        const starEle = document.getElementsByClassName("award-control-text")[0];
        return +starEle.innerHTML.trim();
    }
    function check(starNum) {
        const mergeButton = document.getElementsByClassName("qa-merge-button")[0];
        const branchEle = document.getElementsByClassName("js-target-branch")[0];
        const branchStr = branchEle.innerHTML.trim();
        const expr = /(\w+)(\/\d+\.\d+\.\d+)?/;
        const branchPrefix = expr.exec(branchStr)[1];
        let disable = false;
        if (branchPrefix === "hotfix" || branchPrefix == "master") {
            if (starNum < 2) {
                disable = true;
            }
        } else if (branchPrefix === "develop" || branchPrefix == "release") {
            if (starNum < 1) {
                disable = true;
            }
        }

        const currentDisabled = mergeButton.disabled;
        if (currentDisabled !== disable) {
            if (disable) {
                mergeButton.disabled = true;
                mergeButton.title = "点赞数不够"
            } else {
                mergeButton.disabled = false;
                mergeButton.title = null;
            }
        }
    }
    function progress() {
        const starNum = getCurrentStarNum();
        check(starNum);
        requestAnimationFrame(progress);
    }
    requestAnimationFrame(progress)
})();