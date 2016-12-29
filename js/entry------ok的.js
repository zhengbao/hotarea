'use strict';

var exec = require('child_process').exec;

var inputHolder = document.getElementById('imageurl');
// var saveBtn = document.getElementById('save-map-code');

var saveBtn = $('#save-map-code');
// var rightText = $('#right-text-list');
var previewBtn = $('#preview-code');
var rightText = $('#right-text');
var customMapName = $('#custom-map-name');


var imgPath = '';

inputHolder.ondrop = (e) => {
    var file = e.dataTransfer.files[0];

    imgPath = file.path;
    console.log(file.path);
}

saveBtn.click(function() {
    ls.setItem('hotCode', $('#areaText').val());
    // console.log(ls.getItem('hotCode') );
    $('.save-tips').show();


    // $('#imagemap4posis').hide();
    $('#imagemap4posis').css('width', '65%');


    $('#add-right-item').show();
    var areaLen = $('#areaText').val().match(/area/g).length;

    for (var i = 0; i < areaLen; i++) {
        textItems += '<div class="right-side vertical-list" style="display: none;"><div class="head vertical-item-body"><span>第' + (i + 1) + '个热点图的内容' + '</span></div></div>';
    };

    var wrappedText = '';
    wrappedText = '<div style="display: block;"><div class="right-bg-img"></div><div class="right-side vertical-list" style="display: inline-block;"><div class="head vertical-item-body"><span>默认内容</span></div></div>' + textItems + '</div>';

    rightText.val(wrappedText)


})


// var canvasFactory = (function() {
//     var canvasItem = function(positionInfo, type) {
//     };

//     return canvasItem;

// })()
var textItems = '';
// var canvasCounter = 0;
// var countingCanvas = function(){
//     return canvasCounter++;
// }

previewBtn.click(function() {

    $('#setting-wrap').hide();
    $('#preview-wrap').show();

    $('#created-code').html($('#areaText').val().replace('url/to/your/image.jpg', imgPath).replace('\[\.\.\.\]', '').replace('id="Map"', 'id="' + customMapName.val() + '"') + rightText.val());

    var canvasIdName = customMapName.val() + '-canvas';

    $('#preview-wrap [name="Map"]').append('<canvas id="' + canvasIdName + '"></canvas>');

    var canvasCss = {};
    canvasCss.position = 'absolute';
    canvasCss.left = '0';
    canvasCss.top = '0';
    canvasCss.right = '0';
    canvasCss.bottom = '0';
    canvasCss.zIndex = '12';

    // 用这种方式指定canvas宽高可能造成拉伸变形，不推荐
    // canvasCss.width = '650px';
    // canvasCss.height = '380px';

    // console.log($('#created-code > img').width());

    $('#' + canvasIdName).css(canvasCss).attr('width','650px').attr('height', '380px');

    updateCtx()

})

function updateCtx(){

    var mapArea = $('#preview-wrap [name="Map"] area');
    var canvasIdName = customMapName.val() + '-canvas';

    var c = document.getElementById(canvasIdName);
    var ctx = c.getContext("2d");

    var fixedCoords = [];
    for (var j = 0; j < mapArea.length; j++) {

        var coordsArr = mapArea.eq(j).attr('coords').split(',');

        for (var k = 0; k < coordsArr.length; k++) {
            fixedCoords.push(coordsArr[k])
        };
    
    };

    ctx.beginPath();
    ctx.lineWidth="6";
    ctx.strokeStyle="red";
    ctx.rect(fixedCoords[0],fixedCoords[1],fixedCoords[2]-fixedCoords[0],fixedCoords[3]-fixedCoords[1]);  
    console.log(fixedCoords[0],fixedCoords[1],fixedCoords[2]-fixedCoords[0],fixedCoords[3]-fixedCoords[1])
    ctx.stroke();
    // 绿色矩形
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="green";
    ctx.rect(fixedCoords[4],fixedCoords[5],fixedCoords[6]-fixedCoords[4],fixedCoords[7]-fixedCoords[5]);  
    console.log(fixedCoords[4],fixedCoords[5],fixedCoords[6]-fixedCoords[4],fixedCoords[7]-fixedCoords[5])
    ctx.stroke();
    // 蓝色矩形
    ctx.beginPath();
    ctx.lineWidth="10";
    ctx.strokeStyle="blue";
    ctx.rect(fixedCoords[8],fixedCoords[9],fixedCoords[10]-fixedCoords[8],fixedCoords[11]-fixedCoords[9]);  
    console.log(fixedCoords[8],fixedCoords[9],fixedCoords[10]-fixedCoords[8],fixedCoords[11]-fixedCoords[9])
    ctx.stroke();

}





// canvas相关   
// event:  hover  click  clearCanvas
// shape:  rect   poly





// var canvasActive = function() {

//     initCanvas: function(t) {
//         var i = $("#" + this.imgId),
//             e = i.parent(),
//             n = "canvas" + Math.ceil(1e3 * Math.random());
//         e.append($('<canvas id="' + n + '"></canvas>'));
//         var s = $("#" + n);
//         this.canvasCss.left = i.position().left + "px", this.canvasCss.top = i.position().top + "px", this.canvasCss.zIndex && (this.canvasCss.zIndex += 1), s.css(this.canvasCss).attr({ width: i.width() + "px", height: i.height() + "px" });
//         var a = s[0];
//         this[t + "Canvas"] = a, this[t + "RenderArea"] = a.getContext("2d");
//         var o = this.canvasOpt;
//         for (var r in o) this[t + "RenderArea"][r] = o[r]
//     },
//     renderCanvas: function(t, i, e) {
//         if (!this.hasCanvas) return !1;
//         var n = t.attr("coords"),
//             s = t.attr("shape");
//         this[s + "Render"] ? this[s + "Render"](i, n, e) : ""
//     },
//     rectRender: function(t) {
//         if (!this.hasCanvas) return !1;
//         var i = t.split(","),
//             e = parseInt(i[0]),
//             n = parseInt(i[1]),
//             s = parseInt(i[2]) - e,
//             a = parseInt(i[3]) - n;
//         this.canvasRenderArea.fillRect(e, n, s, a)
//     },
//     circRender: function(t) {
//         if (!this.hasCanvas) return !1;
//         var i = t.split(","),
//             e = i[0],
//             n = i[1],
//             s = i[2],
//             a = this.canvasRenderArea;
//         a.beginPath(), a.arc(e, n, s, 0, 2 * Math.PI), a.fill(), a.closePath()
//     },
//     polyRender: function(t, i, e) {
//         if (!this.hasCanvas) return !1;
//         var n = i.split(",");
//         t.beginPath(), t.moveTo(n[0], n[1]);
//         for (var s = 2; s < n.length; s += 2) t.lineTo(n[s], n[s + 1]);
//         t.lineTo(n[0], n[1]);
//         for (var a = 0; a < e.length; a++) t[e[a]]();
//         t.closePath()
//     },
//     clearCanvas: function(t) {
//         if (!this.hasCanvas) return !1;
//         var i = $(this[t + "Canvas"]);
//         this[t + "RenderArea"].clearRect(0, 0, i.width(), i.height())
//     }
// }
