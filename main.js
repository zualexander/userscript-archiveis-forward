// ==UserScript==
// @name         Article re-redirect to archive.is
// @namespace    *
// @version      0.1
// @description  checks if one of the loaded scripts is from the a specific cdn and redirects to the archived page on archive.is
// @author       @zualexander
// @match        *://*/*
// @icon         
// ==/UserScript==

function isMediumScriptLoaded(){
    const regex = new RegExp('^https?:\/\/cdn\-client\.medium\.com*');
    const scripts = document.getElementsByTagName("script");

    for(var i = 0; i < scripts.length; i++) {
        const scriptSrc = scripts[i].getAttribute('src');

       if(scriptSrc && scriptSrc.match(regex)) {
           return true;
       }
    }
    return false;
}

function archivePagePreparation(){
    const header = document.getElementById('HEADER');
    const content = document.getElementById('CONTENT');
    const parent = document.getElementById('SOLID');
    const smallHeaderContainer = document.getElementById('DIVSHARE').nextElementSibling;
    const divAlreadyDialog = document.getElementById('DIVALREADY');
    const hashTagTable = document.getElementById('hashtags');

    // remove elements form header
    header.remove();
    smallHeaderContainer.remove();
    // remove divalready dialog if the page already existed
    if(divAlreadyDialog){
      divAlreadyDialog.remove();
    }
    // switch positions of content and wrapper of it and delete the element
    parent.before(content);
    parent.remove();
    hashTagTable.remove();
    // set width and height of page to 100%
    content.style.width='100%';
    content.style.height='100%';
}


(function() {
    'use strict';
    // if page is archive.is prepare for reading
    if (/archive\.is/.test (location.hostname) ) {
        archivePagePreparation()
    }
    else {
        if(isMediumScriptLoaded()){
            const current_url = document.location;
            const new_url = "https://archive.is/submit/?submitid=iY14UDsQ+OKnK2Lh/AiOcWcXozLVIgJb3fG+2CENicdBmUNMP3Y4iYmVqlGti7zT&url=" + encodeURIComponent(current_url);
            location.assign(new_url);
        }
    }
})();