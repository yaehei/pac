// ==UserScript==
// @name   Google Translator Quick Tooltip
// @namespace   for kafan
// @author   for kafan
// @description   Google Translator Quick Tooltip
// @version   1.0
// @include   http://*
// @include   https://*
// @include   //
// @charset   utf-8
// @grant   GM_getValue
// @grant   GM_log
// @grant   GM_xmlhttpRequest
// @grant   GM_setValue
// @grant   GM_deleteValue
// @grant   //
// @run-at   document-idle
// ==/UserScript==

const HREF_NO = 'javascript:void(0)';
var  languagesGoogle = '<option value="auto">检测语言</option><option value="zh-CN">中文(简体)</option><option value="zh-TW">中文(繁体)</option><option value="en">英语</option><option  value="ja">日语</option><option value="ko">韩语</option><option value="de">德语</option><option value="fr">法语</option><option value="ru">俄罗斯语</option><option value="it">意大利语</option><option value="sq">阿尔巴尼亚语</option><option value="ar">阿拉伯语</option><option value="az">阿塞拜疆语</option><option value="ga">爱尔兰语</option><option value="eu">巴斯克语</option><option value="be">白俄罗斯语</option><option value="bg">保加利亚语</option><option value="is">冰岛语</option><option value="pl">波兰语</option><option value="fa">波斯语</option><option value="da">丹麦语</option><option value="nl">荷兰语</option><option value="et">爱沙尼亚语</option><option value="tl">菲律宾语</option><option value="fi">芬兰语</option><option value="ka">格鲁吉亚语</option><option value="ht">海地克里奥尔语</option><option value="gl">加利西亚语</option><option value="ca">加泰罗尼亚语</option><option value="cs">捷克语</option><option value="hr">克罗地亚语</option><option value="lv">拉脱维亚语</option><option value="lt">立陶宛语</option><option value="ro">罗马尼亚语</option><option value="ms">马来西亚语</option><option value="mk">马其顿语</option><option value="mt">马耳他语</option><option value="bn">孟加拉语</option><option value="af">南非语</option><option value="no">挪威语</option><option value="pt">葡萄牙语</option><option value="sv">瑞典语</option><option value="sr">塞尔维亚语</option><option value="sk">斯洛伐克语</option><option  value="sl">斯洛文尼亚语</option><option value="sw">斯瓦希里语</option><option value="th">泰国语</option><option value="tr">土耳其语</option><option value="cy">威尔士语</option><option value="ur">乌尔都语</option><option value="uk">乌克兰语</option><option value="es">西班牙语</option><option value="iw">希伯来语</option><option value="el">希腊语</option><option value="hu">匈牙利语</option><option value="hy">亚美尼亚语</option><option value="yi">意第绪语</option><option value="hi">印地语</option><option value="id">印尼语</option><option value="vi">越南语</option>';
var body = getTag('body')[0];
var imgLookup;
var txtSel = encodeURIComponent(txtSel);
var currentURL;
 
images();
css();
 
document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);
 
function mousedownCleaning(evt)
{
        var divDic = getId('divDic');
        var divLookup = getId('divLookup');
       
        if(divDic)
        {
                if(!clickedInsideID(evt.target,'divDic'))
                        divDic.parentNode.removeChild(divDic);
        }      
       
        if(divLookup)
                divLookup.parentNode.removeChild(divLookup);
}
 
function showLookupIcon(evt)
{
        var divDic = getId('divDic');
        var divLookup = getId('divLookup');
        txtSel = getSelection();
       
        if(!txtSel || txtSel=="")
        {
                if(divDic)
                {
                        if(!clickedInsideID(evt.target,'divDic'))
                                divDic.parentNode.removeChild(divDic);
                }
                if(divLookup)
                        divLookup.parentNode.removeChild(divLookup);
               
                return;
        }
 
        if(divDic)
        {
                if(!clickedInsideID(evt.target,'divDic'))
                        divDic.parentNode.removeChild(divDic);
               
                return;
        }
 
        if(divLookup)
        {
                divLookup.parentNode.removeChild(divLookup);
        }      
       
        divLookup = createElement('div', {id:'divLookup', style:'background-color:transparent; color:#000000; position:absolute; top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX+window.pageXOffset+10)+'px; padding:0px; z-index:10000; border-radius:2px;'});
        divLookup.appendChild(imgLookup.cloneNode(false));
        divLookup.addEventListener('mouseover', lookup, false);
        body.appendChild(divLookup);   
}
 
function lookup(evt)
{
        var divResult = null;
        var divDic = getId('divDic');
        var divLookup = getId('divLookup');
        var top = divLookup.style.top;
        var left = divLookup.style.left;
 
        if(!txtSel || txtSel=="")
        {
                if(divDic = getId('divDic'))
                        divDic.parentNode.removeChild(divDic);
                return;
        }      
 
        if(divDic = getId('divDic'))
        {
                divDic.parentNode.removeChild(divDic);
        }      
        divLookup.parentNode.removeChild(divLookup);
       
        divDic = createElement('div', {id:'divDic', style:'opacity: 0.85; font-size: small; background-color: #EDF4FC; color: Gray; position:absolute; top:'+top+'; left:'+left+'; min-width:165px; min-height:16.5px; max-width:50%; padding:8.5px; text-align:left; z-index:10000; border-radius:15px; box-shadow: -1px 0px 8px 3px #c39b5a'});
        divDic.addEventListener('mousedown', dragHandler, false);
        body.appendChild(divDic);

        divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;color:#8800ff;'}, null, '<img src="data:image/gif;base64,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'+
                                                                                                                                                                          '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'+
                                                                                                                                                                         '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'+
                                                                                                                                                                       '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"/>');
        divDic.appendChild(divResult);         

        var optionLink = createElement('a', {id:'optionsLink', href:HREF_NO, style:'opacity:0.2; position:absolute; bottom:3px; right:13px; font-size:18px; text-decoration:none!important;background:#528DDF;padding:1px;color:#fedcba;border-radius:6px 6px 6px 6px;border:2px solid #EEEEEE;font-weight:bold;width:20px;text-align:center;display:block;'}, 'click options false', '+');
        divDic.appendChild(optionLink);
        optionLink.addEventListener('mouseover', function(e) {e.target.style.opacity =0.8});
        optionLink.addEventListener('mouseout', function(e) {e.target.style.opacity =0.2});

        if( (txtSel+" ").search(/^\s*https?:\/\//) > -1 )
        {
                divResult.innerHTML = '<a href="'+txtSel+'" target="_blank" >'+txtSel+'</a>';
        }
        else if( (txtSel+" ").search(/^\s*\S+(\.\S+)+/) > -1 )
        {
                divResult.innerHTML = '<a style="color:#884aff;" href="http://'+txtSel+'" target="_blank" >'+txtSel+'</a>';
        }
        else
        {
                var sl, tl, lang;
                sl = GM_getValue('from') ? GM_getValue('from') : "auto";
                tl = GM_getValue('to') ? GM_getValue('to') : "auto";
                lang = sl + "|" + tl;
                currentURL = "http://translate.google.cn/?client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang;
                GM_xmlhttpRequest({
                        method: 'GET',
                        url: currentURL,
                        onload: function(resp) {
                                try{
                                        extractResult(resp.responseText);
                                }catch(e){
                                        GM_log(e);
                                }
                        }
                });    
        }
}
 
function quickLookup()
{
        getId('divResult').innerHTML = '正在翻译...'
        currentURL = "http://translate.google.cn/?client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + getId('optSelLangFrom').value + "|" + getId('optSelLangTo').value;
        GM_xmlhttpRequest({
                method: 'GET',
                url: currentURL,
                onload: function(resp) {
                        try{
                                extractResult(resp.responseText);
                        }catch(e){
                                GM_log(e);
                        }
                }
        });    
}
 
function extractResult(html)
{
        var html2 = html.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/)[1];
        html2 = html2.replace(/\<script[^\<]+\<\/script\>/ig, '');
       
        var divExtract = getId('divExtract');
        if(divExtract)
                divExtract.parentNode.removeChild(divExtract);
        if(getId('dict'))
                document.body.removeChild(getId('dict'));
       
        divExtract = document.body.appendChild(createElement('div', {id:'divExtract', style:'display:none; visibility:hidden;'}, null, html2));
 
        var arrs = getTag('a',divExtract)
        for(var i=0; i<arrs.length; i++){
                arrs[i].setAttribute('target','_blank');
                arrs[i].setAttribute('class','gootranslink');
        }
       
        var translation = getId('result_box').textContent;
        var dict = null;;
        if(getId('dict')){
                try{
                        var details_link = getTag('a', getId('dict_head'))[0].cloneNode(true);
                        getId('dict').appendChild(details_link);
                        getId('dict').removeChild(getId('dict_head'));
                        dict = getId('dict').innerHTML;
                }catch(e){
                        dict = null;
                }
        }
       
        getId('divResult').innerHTML = '<a style="color:#884aff;text-decoration:none;font-size:1.2em;font-weight:bold;" href="'+currentURL+'" target="_blank">' + translation + '</a>';
        if(dict)
                getId('divResult').innerHTML += '<br><br><div id="dict" style="background-color:transparent; color:#000000; padding:0; -moz-border-radius:3px; margin:0 auto;overflow:hidden;">'+dict+'</div>'; 
}
 
function getSelection()
{
        var txt = null;
        if (window.getSelection)
        {
                txt = window.getSelection();
        }
        else if (document.getSelection)
        {
                txt = document.getSelection();
        }
        else if (document.selection)
        {
                txt = document.selection.createRange().text;
        }
        return txt;
}
 
function options(evt)
{
        var divOptions = getId('divOpt');
       
        if(!divOptions)
        {
                divOptions = createElement('div', {id:'divOpt', style:'border-top:2px solid #5A91D8;position:relative; padding:5px;'});
                getId('divDic').appendChild(divOptions);
                getId('optionsLink').style.visibility = 'hidden';
 
                divOptions.appendChild(createElement('span', null, null,'From:'));
                divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
                getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "auto";
                getId('optSelLangFrom').addEventListener('change', quickLookup, false);
               
                divOptions.appendChild(createElement('span', null, null,' To:'));
                divOptions.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
                getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "auto";
                getId('optSelLangTo').addEventListener('change', quickLookup, false);
               
                divOptions.appendChild(createElement('br'));
                divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', '保存'));
               
                divOptions.appendChild(createElement('span', null, null,'&nbsp;'));
                divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click resetOptions false', '重置'));
        }
        else
        {
                divOptions.parentNode.removeChild(divOptions);
                getId('optionsLink').style.visibility = 'visible';
        }
}
 
function saveOptions(evt)
{
        var from = getId('optSelLangFrom').value;
        var to = getId('optSelLangTo').value;
       
        GM_setValue('from', from);
        GM_setValue('to', to);
       
        getId('divDic').removeChild(getId('divOpt'));
        getId('optionsLink').style.visibility = 'visible';
}

 function resetOptions(evt)
{
        var from = getId('optSelLangFrom').value;
        var to = getId('optSelLangTo').value;
        
        GM_deleteValue('from', from);
        GM_deleteValue('to', to);
        
        getId('divDic').parentNode.removeChild(getId('divDic'));
        getId('optionsLink').style.visibility = 'visible';
}
 
function css()
{
        var style = createElement('style',{type:"text/css"},null,""+   
       
                'a.gootranslink:link {color: #0000FF !important; text-decoration: underline !important;}'  +  
                'a.gootranslink:visited {color: #0000FF !important; text-decoration: underline !important;}'+
                'a.gootranslink:hover {color: #0000FF !important; text-decoration: underline !important;}'  +
                'a.gootranslink:active {color: #0000FF !important; text-decoration: underline !important;}' +
               
                '#dict table {font-size:13px; line-height:1.5em; margin:0 2px 10px 0;background-color:#D8E5F6; color:black;border:1px solid #AEC9EC;font-style:italic;}'+
                '#dict td {padding-right:29px; vertical-align:top; border:0px; color:black; background-color:#D8E5F6;}'
        );
        getTag('head')[0].appendChild(style);
}
 
function createElement(type, attrArray, evtListener, html)
{
        var node = document.createElement(type);
 
        for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
                node.setAttribute(attr, attrArray[attr]);
        }
 
        if(evtListener){
                var a = evtListener.split(' ');
                node.addEventListener(a[0], eval(a[1]), eval(a[2]));
        }
 
        if(html)
                node.innerHTML = html;
       
        return node;
}
 
function getId(id, parent){
        if(!parent)
                return document.getElementById(id);
        return parent.getElementById(id);      
}
 
function getTag(name, parent){
        if(!parent)
                return document.getElementsByTagName(name);
        return parent.getElementsByTagName(name);
}
 
var savedTarget=null;
var orgCursor=null;
var dragOK=false;
var dragXoffset=0;
var dragYoffset=0;
var didDrag=false;
       
function moveHandler(e){
        if (e == null) return;
        if ( e.button<=1 && dragOK ){
                savedTarget.style.left = e.clientX - dragXoffset + 'px';
                savedTarget.style.top = e.clientY - dragYoffset + 'px';
                return false;
        }
}
 
function dragCleanup(e) {
        document.removeEventListener('mousemove',moveHandler,false);
        document.removeEventListener('mouseup',dragCleanup,false);
        savedTarget.style.cursor=orgCursor;
 
        dragOK=false;
        didDrag=true;
}
 
function dragHandler(e){
 
        var htype='-moz-grabbing';
        if (e == null) return;
        var target = e.target;
        orgCursor=target.style.cursor;
 
        if(target.nodeName!='DIV')
                return;
 
        if (target = clickedInsideID(target, 'divDic')) {
                savedTarget=target;      
                target.style.cursor=htype;
                dragOK=true;
                dragXoffset = e.clientX-target.offsetLeft;
                dragYoffset = e.clientY-target.offsetTop;
               
                target.style.left = e.clientX - dragXoffset + 'px';
                target.style.right = null;
               
                document.addEventListener('mousemove',moveHandler,false);
                document.addEventListener('mouseup',dragCleanup,false);
                return false;
        }
}
 
function clickedInsideID(target, id) {
 
        if (target.getAttribute('id')==id)
                return getId(id);
       
        if (target.parentNode) {
                while (target = target.parentNode) {
                        try{
                                if (target.getAttribute('id')==id)
                                        return getId(id);
                        }catch(e){
                        }
                }
        }
       
        return null;
}

function images()
{
        imgLookup = createElement('img',{border:0});
        imgLookup.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC';
}
 
