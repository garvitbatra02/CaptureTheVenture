const multer=require("multer");

const multerconfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/');
    },
    filename:(req,file,callback)=>{
        const ext=file.mimetype.split('/')[1];
        callback(null,`image-${Date.now()}.${ext}`);
    }
})
const isImage=(req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true);
    }
    else{
        callback(new Error('only Image is Allowed..'));
    }
};
const upload=multer({
   storage:multerconfig,
   fileFilter:isImage
})

exports.uploadImage=upload.single('photo')

exports.upload=(req,res)=>{
    console.log(req.file);

    res.status(200).json({
        success:'Success'
    })
}