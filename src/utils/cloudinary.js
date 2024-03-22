import { v2 as cloudinary } from "cloudinary";

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;     
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            })//file has been uploaded successfully
            console.log("File is uploaded on cloudinary successfully", response.url);
            return response
        
    } catch (error) {
        FileSystem.unlinkSync(localFilePath)//remove the locally save temperary file as the upload option operation got failed
        return null
    }
}

export { uploadOnCloudinary }

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });