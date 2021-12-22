
const path = require('path')

module.exports = (multer)=>{
    const profiles_storage = multer.diskStorage({
        destination: function(req, file, cb) {
         cb(null, 'uploads/profiles/');
       },
      // By default, multer removes file extensions so let's add them back
      filename: function(req, file, cb) {
         cb(null, file.fieldname + '-'+ req.session.user_name+'-' + Date.now() + path.extname(file.originalname));
       }
    });
    const upload_profile = multer({ storage : profiles_storage})

    return {
        name: 'profile',
        multer: upload_profile
    }
}
