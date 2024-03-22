import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
       cb(null, file.originalname)//check to log file
       //at the end of project change originalname because may be same name many file which can be override
    }
  })
  
  export const upload = multer(
    {
         storage: storage
    }
)