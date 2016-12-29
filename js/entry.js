'use strict';

var exec = require('child_process').exec;

var inputHolder = document.getElementById('imageurl');

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

var textItems = '';


var imgWidth = 0;
var imgHeight = 0;



saveBtn.click(function() {
    ls.setItem('hotCode', $('#areaText').val());

    $('.save-tips').show();

    $('#imagemap4posis').css('width', '65%');

    $('#add-right-item').show();
    var areaLen = $('#areaText').val().match(/area/g).length;

    for (var i = 0; i < areaLen; i++) {
        textItems += '<div class="right-side vertical-list" style="display: none;"><div class="head vertical-item-body"><span>第' + (i + 1) + '个热点图的内容' + '</span></div></div>';
    };

    var wrappedText = '';
    wrappedText = '<div style="display: block;"><div class="right-bg-img"></div><div class="right-side vertical-list" style="display: inline-block;"><div class="head vertical-item-body"><span>默认内容</span></div></div>' + textItems + '</div>';

    rightText.val(wrappedText)



    imgWidth = $('#mapContainer').width();
    imgHeight = $('#mapContainer').height();



})





previewBtn.click(function() {

    $('#setting-wrap').hide();
    $('#preview-wrap').show();

    $('#created-code').html('<div class="left-side">' + $('#areaText').val().replace('url/to/your/image.jpg', imgPath).replace('\[\.\.\.\]', '').replace('id="Map"', 'id="' + customMapName.val() + '"') + '</div><div class="right-bg">' + rightText.val() + '</div>');


    var areas = $('#' + customMapName.val() + ' area');

    $('.left-side').append('<div id="svg-area"></div>');


 
    $('#svgTemplate').tmpl({ 'imgWidth': imgWidth, 'imgHeight': imgHeight}).appendTo('#svg-area');


    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // $(g).attr('width', imgWidth).attr('height', imgHeight);

    // $('#svg-area svg')[0].appendChild(g);


    var gHtml = '';
    // gHtml = '<polygon points="10,23,84,22,84,31,198,35,203,18,275,20,279,163,10,153" style="fill:rgba(255,184,0,0.2);stroke:rgba(255,184,0,1);stroke-width:2;fill-rule:evenodd;"></polygon><rect x="320" y="44" width="142" height="102" style="fill:rgba(255,184,0,0.2);stroke:rgba(255,184,0,1);stroke-width:2;stroke-opacity:0.9"></rect><rect x="222" y="240" width="220" height="122" style="fill:rgba(255,184,0,0.2);stroke:rgba(255,184,0,1);stroke-width:2;stroke-opacity:0.9"></rect>';

    for (var svgCount = 0; svgCount < areas.length; svgCount++) {

        if (areas.eq(svgCount).attr('shape') === 'poly') {
            // $('#svgTemplatePoly').tmpl({ 'svgPoints': areas.eq(svgCount).attr('coords') }).wrap('<div></div>').parent().html()
             gHtml += $('#svgTemplatePoly').tmpl({ 'svgPoints': areas.eq(svgCount).attr('coords') }).wrap('<div></div>').parent().html()
        } 
        else if (areas.eq(svgCount).attr('shape') === 'rect') {

            var coords = areas.eq(svgCount).attr('coords').split(',');
            var x = coords[0];
            var y = coords[1];
            var rectWidth = coords[2] - coords[0];
            var rectHeight = coords[3] - coords[1];

            gHtml +=  $('#svgTemplateRect').tmpl({'x': x, 'y': y, 'rectWidth': rectWidth, 'rectHeight': rectHeight }).wrap('<div></div>').parent().html();
        }


    };

     $(g).html(gHtml);

    $('#svg-area svg').append($(g));


})
