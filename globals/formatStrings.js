module.exports.formatTableName = function(name){
    name = name.toLowerCase();
    name = name.trim().replace(/ & |& | &|&/gi, '_and_');
    name = name.trim().split(' / ').join('_or_').split(' /').join('_or_').split('/ ').join('_or_').split('/').join('_or_');
    name = name.trim().replace(/ - |- | -|-/gi, '_');
    name = name.replace(/ /gi, '_');
    return name;
}


