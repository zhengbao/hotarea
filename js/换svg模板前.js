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


    for (var svgCount = 0; svgCount < areas.length; svgCount++) {


        if (areas.eq(svgCount).attr('shape') === 'poly') {

            $('#svgTemplatePoly').tmpl({ 'imgWidth': imgWidth, 'imgHeight': imgHeight, 'svgPoints': areas.eq(svgCount).attr('coords') }).appendTo('#svg-area');
        } 
        else if (areas.eq(svgCount).attr('shape') === 'rect') {

            var coords = areas.eq(svgCount).attr('coords').split(',');
            var x = coords[0];
            var y = coords[1];
            var rectWidth = coords[2] - coords[0];
            var rectHeight = coords[3] - coords[1];

            $('#svgTemplateRect').tmpl({ 'imgWidth': imgWidth, 'imgHeight': imgHeight, 'x': x, 'y': y, 'rectWidth': rectWidth, 'rectHeight': rectHeight, }).appendTo('#svg-area');

        }


    };









})
