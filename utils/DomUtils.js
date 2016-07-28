/**
 * Created by Administrator on 2016/7/25 0025.
 */
var utils=(function(){
    function listToArray(likeArray){
        var arr=[]
        try{
          arr=[].slice.call(likeArray)
        }catch(e){
            for(var i=0;i<likeArray.length;i++){
               arr.push(likeArray[i])
            }
        }
        return arr;
    }

    function toJSON(str){
        return window.JSON?JSON.parse(str):eval("("+str+")")
    }
    function getWin(attr){
         return document.documentElement[attr]||document.body[attr]
    }
    function setCss(ele,attr,value){
        if(attr=="opacity"){
            ele.style.opacity=value
            ele.style.fliter='alpha(opacity='+value*100+')'
            return
        }
        var reg=/(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|legt)?))/
        value=reg.test(attr)?value+'px':value
        ele.style[attr]=value
    }
    function getCss(ele,attr){
        var res=null
        if(/MSIE [6-8]\.0/.test(window.navigator.userAgent)){
            if(attr==='opacity')
            {
               res= ele.currentStyle['filter']
                var reg=/^alpha\(opacity\s*=\s*(\d+)\)$/
                res=reg.exec(reg)[1]/100
            }else{
                res=ele.currentStyle[attr]
            }

        }else{
            res=window.getComputedStyle(ele,null)[attr]
        }
        var reg=/[px|rem|pt|em]/
        if(reg.test(res)){
           res= res.repalce(reg,function(){})
        }
        return res
    }
    function offset(ele){
        var l=ele.offsetLeft
        var t=ele.offsetTop
        var par=ele.offsetParent
        while(par&&par!==document.body){
            var reg=/MSIE [6-8]\.0/
            if(!reg.test(window.navigator.userAgent)){
                l+=par.clientLeft
                t+=par.clientTop
            }
            l+=par.offsetLeft
            t+=par.offsetTop
            par=par.offsetParent
        }
        return {l:l,t:t}
    }
    function  getChild(ele,tagName){
        var children=ele.childNodes
        var arr=[]
        if(typeof tagName==="undefined"){
            for(var i=0;i<children.length;i++){
                if(children[i].nodeType===1){
                    arr.push(children[i])
                }
            }
        }
        else if(typeof tagName==='string'){
            for(var i=0;i<children.length;i++){
                if(children[i].nodeType===1&&children[i].nodeName.toLowerCase()===tagName.toLowerCase()){
                    arr.push(children[i])
                }
            }
        }
        else{
            throw  new error('the second argument error')
        }
        return arr
    }
    function pre(ele){
        if(ele.previousElementSibling){
            return ele.previousElementSibling
        }
        var pre=ele.previousSibling
        while(pre){
            if(pre.nodeType===1)
            {
                return pre
            }
            pre=pre.previousSibling
        }
    }
    function preAll(ele){
        var arr=[]
        var previous=pre(ele)
        while(previous){
            arr.push(previous)
            previous=pre(previous)
        }
        return arr
    }
    function next(ele){
        if(window.getComputedStyle){
            return ele.nextElementSibling
        }
        var ns=ele.nextSibling
        while(ns){
            if(ns.nodeType===1){
                return ns
            }
        }
    }
    function nextAll(ele){
        var arr=[]
        var ns=next(ele)
        while(ns){
            arr.push(ns)
            ns=next(ns)
        }
        return arr
    }
    function getByClass(ele,strClass){
        if('getComputedStyle' in window){
            return listToArray(ele.getElementsByClassName(strClass))
        }
        var arr=[]
        var arrClass=strClass.replace(/(^\s+|\s+$)/,"").split(/\s+/g)
        var nodelist=ele.getElementsByTagName('*');
        for(var i=0;i<nodelist.length;i++){
            var child=nodelist[i];
            for(var j=0;j<arrClass.length;j++){
                if(child.className.indexOf(arrClass[j])!=-1)
                {
                    arr.push(child)
                }
            }
        }
        return arr
    }
    function hasClass(ele,strClass){
        return ele.className.indexOf(strClass)==-1?false:true
    }
    function addClass(ele,strClass){
        var arrClass=strClass.replace(/(^\s*|\s*$)/,'').split(/\s+/g)
        for(var i=0;i<arrClass.length;i++){
            if(!hasClass(ele,arrClass[i])){
                ele.className+=' '+arrClass[i]
            }
        }
    }
    function removeClass(ele,strClass){
        var arrClass=strClass.replace(/(^\s*|\s*$)/,'').split(/\s+/g)
        console.log(arrClass)
        for(var i=0;i<arrClass.length;i++){
            if(hasClass(ele,arrClass[i])){
                var reg=new RegExp(arrClass[i])
                console.log(reg)
                ele.className=ele.className.replace(reg,"")
            }
        }
    }
    function firstChild(ele){
        var childAll=getChild(ele)
        if(childAll){
            return childAll[0]
        }
    }
    function lastChild(ele){
        var childAll=getChild(ele)
        if(childAll){
            return childAll[childAll.length-1]
        }
    }
    function prepend(context,ele){
       var first= firstChild(context)
        if (fir) {
            context.insertBefore(curEle, fir);
        } else {
            context.appendChild(curEle);
        }
    }
    function inserAfter(curEle,oldEle){
       var n=next(oldEle)
        if(n){
            n.parentNode.insertBefore(curEle,n)
        }else{
            oldEle.parentNode.appendChild(curEle)
        }
    }
    return {
        listToArray:listToArray,
        toJSON:toJSON,
        setCss:setCss,
        getCss:getCss,
        getWin:getWin,
        offset:offset,
        getChild:getChild,
        pre:pre,
        preAll:preAll,
        next:next,
        nextAll:nextAll,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        firstChild:firstChild,
        lastChild:lastChild,
        prepend:prepend,
        insertAfter:inserAfter
    }
})()