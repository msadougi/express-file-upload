createFileName = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return Math.floor(Date.now() / 1000) + '-' + text;
};
getFileExtension = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
};
fileUpload = async (req, file, dir, formats, size) => {
    this.fileUploadName = file;
    this.fileFormats = formats;
    this.dirUpload = dir;

    if(!req.files) return {status:false,msg:'Files empty error'};
    var getFile = req.files[(this.fileUploadName)];
    if(getFile === undefined || getFile == null || getFile.length <= 0) return {status:false,msg:'File empty'};

    let getFileName = getFile.name;
    let getFileSize = getFile.size;
    let getFileExt = getFileExtension(getFileName);
    let newFileName = createFileName(30) + '.' + getFileExt;

    if((this.fileFormats).find((format) => format === getFileExt.toString()) == undefined) return {status:false,msg:'File format error'};
    if(getFileSize > size) return {status:false,msg:'File size error'};

    let uploadResult = await getFile.mv((this.dirUpload) + newFileName);

    if(uploadResult) return {status:false,msg:'File upload error'};
    
    return {status:true,msg:'File upload',dir:(this.dirUpload),file:newFileName};
};

module.exports.fileUpload = fileUpload

/*
how to use?
1. install npm package (express-fileupload)
2. require (express-fileupload) and (upload.js)
3. use this code => let result = await upload.fileUpload(req, 'fileNameTest', './public/', ['png', 'PNG', 'jpg', 'JPG', 'gif', 'GIF', 'jpeg', 'JPEG'],'104857600');
*/