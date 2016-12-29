'use strict';

var exec = require('child_process').exec;

var holder = document.getElementById('holder');
var body = document.getElementById('main-body');

var directoryPath = document.getElementsByClassName('directory-path')[0];

var consoleArea = document.getElementsByClassName('console-area')[0];

console.log = function(tips) {
    consoleArea.innerHTML += '<p>' + tips + '</p>';
};

body.ondrop = function(event) {
    event.preventDefault();
    return false
}

console.log = function(tips) {
    consoleArea.innerHTML += '<p>' + tips + '</p>';
};

body.ondragover = () => {
    return false;
};
body.ondragleave = body.ondragend = () => {
    return false;
};

holder.ondragover = () => {
    return false;
};
holder.ondragleave = holder.ondragend = () => {
    return false;
};
body.ondrop = function(event){
    event.preventDefault();
    return false
}

holder.ondrop = (e) => {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    globalVars.file.path = file.path
        // console.log('File you dragged here is', file.path);
    directoryPath.innerHTML = file.path;

    // console.log(file.path);
    // console.log(__dirname);
    consoleArea.innerHTML = '';
    cleancssPath.innerHTML = '';
    comparePath.innerHTML = '';
    mainTableTr.innerHTML = '';

    console.log('正在处理 <i class="n-loading-icon"></i>');

    // var rawHtmlFiles = [file.path + '\\*.html'];
    // var allHtmlFiles = [];
    var rawHtmlFiles = [];

    // List all files in a directory in Node.js recursively in a synchronous fashion
    var allfiles = walkSync(file.path);
    // console.log(allfiles);

    allfiles.filter(function(el) {
        // return (path.extname(el) === '.html')
        if (path.extname(el) === '.html' && path.normalize(el).indexOf('--diff') === -1) {
            // path.normalize(el).indexOf('compare')
            rawHtmlFiles.push(el)
        }
    })

    for (var aa = 0; aa < rawHtmlFiles.length; aa++) {
        rawHtmlFiles[aa] = path.normalize(file.path + '\\' + rawHtmlFiles[aa]);
        // console.log(rawHtmlFiles[aa]);
    }


    // console.log(rawHtmlFiles);
    var options = {
        // ignore       : ['node_modules', /\.as/],
        // ignore: ["node_modules", ".manage-area-main .tc-g", ".panel-title .unit", ".cos-overview .tc-15-page", ".douhaio", ".main-data-panel"],
        ignore: ['node_modules', /.*:hover/, /.*:active/, /.*:focus/, /.*:visited/,/.*:after/,/.*:before/],
        // ignore: ['node_modules'],
        // media        : ['(min-width: 700px) handheld and (orientation: landscape)'],
        // csspath: '*',
        // raw          : 'h1 { color: green }',
        stylesheets: [],
        // stylesheets  : ['\\css\\statistics.import.css', '\\css\\key.css'],
        ignoreSheets: [/http(s)?/],
        // ignoreSheets : [/fonts.googleapis/],
        // timeout      : 1000,
        htmlroot: file.path
            // report       : false,
            // uncssrc      : '.uncssrc'
    };


    var allCssFiles = [];
    var rawCssFiles = [];
    allCssFiles = fs.readdirSync(file.path + '\\css\\');

    allCssFiles.filter(function(item) {
        // console.log(item);
        if (path.extname(item) === '.css') {
            // rawCssFiles.push( file.path + '\\css\\' + item)
            rawCssFiles.push(path.normalize(item))
        }
    })

    for (var l = 0; l < rawCssFiles.length; l++) {
        options.stylesheets.push('\\css\\' + rawCssFiles[l])
    }


    // get all ignores
    // var ignoresSelectors = [];
    // console.log('正在查找ignore');
    // for (var bb = 0; bb < rawCssFiles.length; bb++) {
    //     var rs = fs.createReadStream(file.path + '\\css\\' + rawCssFiles[bb], 'utf8');

    //     var cssSelectors = '';

    //     rs.on('data', (chunk) => {
    //         cssSelectors = chunk;
    //         console.log(cssSelectors);

    //         var ignoreArea = '';
    //         console.log(cssSelectors);
    //         ignoreArea = cssSelectors.toString().match(/ruce-ignoretag-start\*\/*\s+([.\s]+.*)+\/\*ruce-ignoretag-end/g);

    //         if (ignoreArea) {
    //             ignoreArea = ignoreArea.toString().replace(/ruce-ignoretag-start\*\//, '').replace(/\/\*ruce-ignoretag-end/, '');
    //             // console.log(ignoreArea);

    //             var ignoreTags = ignoreArea.match(/\s+(.*)\s+{/g);
    //             // console.log(ignoreTags);



    //             for (var cc = 0; cc < ignoreTags.length; cc++) {
    //                 // console.log(ignoreTags[cc]);
    //                 options.ignore.push(ignoreTags[cc].toString().replace(/[\n\t]+/, '').replace(/\s+{/, ''))
    //             }
    //         }
    //     });

    // }
    // console.log('正在处理');
    for (var bb = 0; bb < rawCssFiles.length; bb++) {
        var rs = fs.createReadStream(file.path + '\\css\\' + rawCssFiles[bb], 'utf8');

        var cssSelectors = '';

        // console.log(fs.readFileSync(file.path + '\\css\\' + rawCssFiles[bb], 'utf8'));

        rs.on('data', (chunk) => {
            cssSelectors = chunk;

            var ignoreArea = '';
            // var tmp1 = cssSelectors.toString().replace(/\s+/g,'');
            // 删掉 【不必要】 的空格
            // console.log(cssSelectors);
            // console.log(cssSelectors.toString().replace(/\n/g,''));
            var tmp1 = cssSelectors.toString().replace(/\n/g, '  ').replace(/\s{2,}/g, '');
            // console.log(JSON.stringify(cssSelectors));
            // var tmp1 = cssSelectors.toString().replace(/\s+/g,'');
            // var tmp1 = cssSelectors.toString().replace(/[\n\t]+/g,'');
            // var tmp1 = JSON.stringify(cssSelectors).replace(/\n/g,'');

            // console.log(tmp1);
            // 下面这一步很卡 ↓↓↓↓↓
            ignoreArea = tmp1.match(/ruce-ignore-start\*\/.*?\/\*ruce-ignore-end/g);

            // var reg = new RegExp("ruce-ignore-start\*\/\s+([.\s]+.*)+\/\*ruce-ignore-end", "img");
            // tmp1 = tmp1.match(reg);
            // ignoreArea = tmp1.match(/ruce-ignore-start\*\/.+?\/\*ruce-ignore-end/);

            // console.log(ignoreArea);

            if (ignoreArea) {
                for (var dd = 0; dd < ignoreArea.length; dd++) {
                    if (ignoreArea[dd]) {
                        // console.log(ignoreArea[dd]);
                        ignoreArea[dd] = ignoreArea[dd].toString().replace(/ruce-ignore-start\*\//, '').replace(/\/\*ruce-ignore-end/, '');
                        // console.log(ignoreArea[dd]);


                        var ignoreTags = ignoreArea[dd].split(/{.*?}/g);
                        // var ignoreTags = ignoreArea[dd].match(/^(.*?){|}(.*){/g);
                        // console.log(ignoreTags);

                        for (var cc = 0; cc < ignoreTags.length; cc++) {
                            var thisTagsList = ignoreTags[cc].toString().replace(/\/\*.*\*\//g, '').split(',');

                            for (var ee = 0; ee < thisTagsList.length; ee++) {
                                if (thisTagsList[ee]) {
                                    // console.log(thisTagsList[ee]);
                                    // console.log(thisTagsList[ee].replace(/\s+?$/g, ''));
                                    options.ignore.push(thisTagsList[ee].replace(/\s+?$/g, ''));
                                }
                            }
                            // console.log(ignoreTags[cc]);
                            // console.log(ignoreTags[cc].toString().replace(/[\n\t]+/, '').replace(/\s+{/, '').replace(/{/, '').replace(/}/, ''));

                        }
                        console.log(options.ignore);
                    }
                }
            }
        });
    }


    // console.log(options.ignore);
    // console.log(ignoresSelectors);
    // get all ignores



    // console.log(options);
    uncss(rawHtmlFiles, options, function(error, output) {
        // console.log(rawHtmlFiles);
        // console.log(options);
        // console.log(error);
        // console.log(output);
        consoleArea.innerHTML = '';
        console.log('去除多余样式 完成');
        var rawStrArr = output.split('/*** uncss> filename: ').filter(function(n) {
            return n !== ''
        });
        // console.log(rawStrArr);

        fs.exists(file.path + '\\ruce-cleancss\\', function(exists) {
            if (!exists) {
                fs.mkdirSync(file.path + '\\ruce-cleancss\\');
            }

            for (var m = 0; m < rawStrArr.length; m++) {
                // 从output里面提取文件名
                // var b = a.match(/^(.*)\s\*\*\*/g);
                // console.log(rawStrArr[m]);
                var fileName = rawStrArr[m].toString().match(/^(.*)\s\*\*\*/g).toString().replace(/\s\*\*\*/g, '').match(/[\w\.-]+\.css/g);
                // var fileName = rawStrArr[m].toString().match(/^(.*)\s\*\*\*/g).toString().replace(/\s\*\*\*/g, '').match(/\/(.+)\.css/g);

                // console.log(fileName);

                var fixData = rawStrArr[m].replace(/^(.+)\.css\s\*\*\*\/\s+/g, '');

                // console.log(fixData);

                // fs.closeSync(fs.openSync(filepath, 'w'));
                fs.writeFileSync(file.path + '\\' + fileName, fixData);
                fs.renameSync(file.path + '\\' + fileName, file.path + '\\ruce-cleancss\\' + fileName, function(thisErr) {
                    // console.log(thisErr);
                });

                var prettyArgs = {};

                prettyArgs.source = (function() {
                    var sourceData = '';
                    sourceData = fs.readFileSync(file.path + '\\css\\' + fileName, 'utf8')
                    return sourceData;
                })();
                prettyArgs.sourcelabel = '原文件';
                prettyArgs.readmethod = 'file';
                prettyArgs.diff = (function() {
                    var diffData = '';
                    diffData = fs.readFileSync(file.path + '\\ruce-cleancss\\' + fileName, 'utf8')
                    return diffData;
                })();
                prettyArgs.difflabel = '处理后的文件';
                prettyArgs.output = file.path + '\\ruce-compare\\',
                    prettyArgs.diffview = 'sidebyside'

                // console.log(prettydiff.api(prettyArgs));
                var prettydiffOutput = prettydiff.api(prettyArgs);

                // console.log(prettydiffOutput.toString().replace(/role='heading'/g, 'role=\'heading\ style=\'display:none\''));

                fs.writeFileSync(file.path + '\\' + fileName + '--diff.html', prettydiffOutput.toString().replace(/role="heading"/g, 'role="heading"\sstyle="display:none;"'));

                if (!fs.existsSync(file.path + '\\ruce-compare\\')) {
                    fs.mkdirSync(file.path + '\\ruce-compare\\');
                }


                fs.renameSync(file.path + '\\' + fileName + '--diff.html', file.path + '\\ruce-compare\\' + fileName + '--diff.html');

                comparePath.innerHTML = file.path + '\\ruce-compare';
            }

            cleancssPath.innerHTML = file.path + '\\ruce-cleancss';
            console.log('对比样式文件处理前后差异  完成');






            // 把文件填充到table里
            var tabOriginFile = fs.readdirSync(file.path + '/css/').filter(function(curfile) {
                // console.log(file.path);
                // console.log(curfile);
                // console.log(file.path + '/css/' + curfile);
                // console.log(fs.statSync(file.path + '/css/' + curfile).isFile());
                return fs.statSync(file.path + '/css/' + curfile).isFile()
            });


            var tabCleancssFile = fs.readdirSync(file.path + '/ruce-cleancss/');
            var tabCompareFile = fs.readdirSync(file.path + '/ruce-compare/');
            // console.log(tabOriginFile);
            // console.log(tabCleancssFile);
            // console.log(tabCompareFile);

            for (var j = 0; j < tabOriginFile.length; j++) {

                // console.log(j);
                // console.log(tabCompareFile[j]);

                // if (fs.statSync(file.path + '\\css\\' + tabOriginFile[j]).isFile()) {

                mainTableTr.innerHTML += '<tr><td><div><span class="text-overflow"><a href="javascript:void(0);" class="file-name" filepath="' + file.path + '\\css\\' + tabOriginFile[j] + '">' + file.path + '\\css\\' + tabOriginFile[j] + '</a></span></div></td><td><div><span class="text-overflow"><a href="javascript:void(0);" class="file-name" filepath="' + file.path + '\\ruce-cleancss\\' + tabCleancssFile[j] + '">' + file.path + '\\ruce-cleancss\\' + tabCleancssFile[j] + '</a></span></div></td><td><div><span class="text-overflow"><a href="javascript:void(0);" class="file-name" filepath="' + file.path + '\\ruce-compare\\' + tabCompareFile[j] + '">' + file.path + '\\ruce-compare\\' + tabCompareFile[j] + '</a></span></div></td></tr>';
            }




        })
    })

    // var curFile = fs.openSync(file.path + '\\test\\' + fileName, 'w');
    // var curFile = file.path + '\\test\\' + fileName;

    // console.log(fixData);

    // console.log(curFile);

    // fs.writeFile(curFile, fixData, function(err) {
    //     console.log(err);
    // })


    // fs.createReadStream(rawStrArr[m]).pipe(curFile);

    // fs.writeFileSync(curFile, rawStrArr[m]);

    // console.log(curFile);
    // var curFileStream = fs.open(curFile,'w', function(err, fd) {
    //     console.log(err);
    //     console.log(fd);
    //     curFileStream.write(rawStrArr[m].toString());
    // });
    // rs.pipe(curFile);

    // rs.push(output);

    // var file = fs.createWriteStream(file.path + '/example.txt');
    // file.write('hello, ');
    // rs.pipe(file);


    // console.log(rs);



    // fs.writeFile(file.path + '/jajajdpoajsopd.js', rs, function(err) {
    //     if (err) {
    //         return console.log('err ' + err);
    //     }
    //     // console.log("write config file finished");
    // });


    // exec('cd ' + __dirname + ' \&\& gulp cleancss --' + file.path, function(err, stdout, stderr) {
    //     // console.log('err:  ' + 　err);
    //     // console.log('stdout' + stdout);


    //     cleancssPath.innerHTML = file.path + '\\cleancss';

    //     // console.log('gulp cleancss ' + file.path + ' 完成');
    //     console.log('去除多余样式 [cleancss] 完成');

    //     // exec('cd ' + __dirname + ' \&\& gulp conflict --' + file.path, function(err, stdout, stderr) {
    //     // //     console.log('err:  ' + 　err);
    //     // //     console.log('stdout' + stdout);
    //     //     console.log('gulp conflict ' + file.path + ' 完成');
    //     // });

    //     // $ prettydiff source:"./css/certificate.import.css" diff:"./css/link-intercept.css" readmethod:"file"

    //     // console.log(path.parse(file.path).root);

    //     // console.log(path.parse(file.path).root.replace('\\', ' ') + ' && cd ' + file.path + ' && prettydiff ' + 'source:.\\css\\ sourcelabel:"原文件" readmethod:"directory" diff:.\\cleancss\\ difflabel:"处理后的文件" output:compare diffview:sidebyside');

    //     exec(path.parse(file.path).root.replace('\\', ' ') + ' && cd ' + file.path + ' && prettydiff ' + 'source:.\\css\\ sourcelabel:"原文件" readmethod:"directory" diff:.\\cleancss\\ difflabel:"处理后的文件" output:compare diffview:sidebyside', function(err, stdout, stderr) {
    //         // console.log(err);
    //         // console.log(stdout);
    //         // console.log(stderr);
    //         // console.log(path.parse(file.path).root.replace('\\', ' ') + ' && cd ' + file.path + ' && prettydiff ' + 'source:.\\css\\ readmethod:"directory" diff:.\\cleancss\\ output:.\\compare\\');

    //         // console.log(err);
    //         // console.log(stdout);

    //         // prettyDiffDom.innerHTML = stdout;
    //         // console.log('prettydiff' + ' 完成');


    //         var compareResuleFiles = fs.readdirSync(file.path + '/compare/');
    //         // console.log(compareResuleFiles);
    //         for (var i = 0; i < compareResuleFiles.length; i++) {
    //             // console.log(       compareResuleFiles[i]                            );
    //             // console.log(       compareResuleFiles[i].replace(/__.*/, '')                            );

    //             (function(i) {
    //                 // console.log(path.parse(file.path).root.replace('\\', ' ') + ' && cd ' + file.path + ' && prettydiff ' + 'source:.\\css\\' + compareResuleFiles[i].replace(/__.*/, '') + ' readmethod:"file" diff:.\\cleancss\\' + compareResuleFiles[i].replace(/__.*/, ''));

    //                 // todo:  删除没有修改的文件
    //                 // exec(path.parse(file.path).root.replace('\\', ' ') + ' && cd ' + file.path + ' && prettydiff ' + 'source:.\\css\\' + compareResuleFiles[i].replace(/__.*/, '') + ' readmethod:"file" diff:.\\cleancss\\' + compareResuleFiles[i].replace(/__.*/, '')),
    //                 //     function(err, stdout, stderr) {
    //                 //         console.log('err');
    //                 //         console.log(stdout);
    //                 //         console.log(stderr);
    //                 //     }



    //                 fs.renameSync(file.path + '/compare/' + compareResuleFiles[i], file.path + '/compare/' + (compareResuleFiles[i].replace(/^.*__/, '')))

    //             })(i)

    //         }

    //         comparePath.innerHTML = file.path + '\\compare';
    //         // console.log('prettydiff' + ' 完成');
    //         console.log('对比样式文件处理前后差异 [prettydiff]   完成');


    //         // 把文件填充到table里
    //         var tabOriginFile = fs.readdirSync(file.path + '/css/').filter(function(curfile) {
    //             // console.log(file.path);
    //             // console.log(curfile);
    //             // console.log(file.path + '/css/' + curfile);
    //             // console.log(fs.statSync(file.path + '/css/' + curfile).isFile());
    //             return fs.statSync(file.path + '/css/' + curfile).isFile()
    //         });



    //         var tabCleancssFile = fs.readdirSync(file.path + '/cleancss/');
    //         var tabCompareFile = fs.readdirSync(file.path + '/compare/');
    //         // console.log(tabOriginFile);
    //         // console.log(tabCleancssFile);
    //         // console.log(tabCompareFile);

    //         for (var j = 0; j < tabOriginFile.length; j++) {

    //             // console.log(j);
    //             // console.log(tabCompareFile[j]);

    //             // if (fs.statSync(file.path + '\\css\\' + tabOriginFile[j]).isFile()) {

    //             mainTableTr.innerHTML += '<tr><td><div><span class="text-overflow"><a href="javascript:void(0);" class="file-name" filepath="' + file.path + '\\css\\' + tabOriginFile[j] + '">' + file.path + '\\css\\' + tabOriginFile[j] + '</a></span></div></td><td><div><span class="text-overflow"><a href="javascript:void(0);" class="file-name" filepath="' + file.path + '\\cleancss\\' + tabCleancssFile[j] + '">' + file.path + '\\cleancss\\' + tabCleancssFile[j] + '</a></span></div></td><td><div><span class="text-overflow"><a href="javascript:void(0);" class="file-name" filepath="' + file.path + '\\compare\\' + tabCompareFile[j] + '">' + file.path + '\\compare\\' + tabCompareFile[j] + '</a></span></div></td></tr>';
    //         }


    //         // }


    //     });

    // });


    return false;
};

directoryPath.onclick = function() {
    exec('explorer ' + directoryPath.innerHTML)
}


cleancssPath.onclick = function() {
    exec('explorer ' + cleancssPath.innerHTML)
}



comparePath.onclick = function() {
    exec('explorer ' + comparePath.innerHTML)
}





mainTableTr.onclick = function(index) {
    var tgFile = event.target;
    var attredTag;

    // console.log(tgFile);
    // console.log(tgFile.nodeName == 'A');

    attredTag = tgFile.nodeName === 'A' ? tgFile : tgFile.getElementsByTagName('a')[0];

    var curFilePath = attredTag.getAttribute('filepath');

    // console.log('explorer ' + curFilePath);
    exec('explorer ' + curFilePath)
}


var bypass = document.getElementsByClassName('bypass')[0];

bypass.onclick = function() {
    exec('explorer ' + 'http://km.oa.com/group/c2xd2/articles/show/268119')
}
