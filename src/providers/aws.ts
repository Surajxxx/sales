import AWS from "aws-sdk";

/*
* @author Suraj Dubey
* @description AWS Cloud Storage Service
*/

AWS.config.update({
  accessKeyId: "AKIAY3L35MCRVFM24Q7U",
  secretAccessKey: "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",
  region: "ap-south-1",
});

// creating file uploading service
export const uploadFile = async (file: any) => {
  return new Promise(function (resolve, reject) {
    //this function will upload file to aws and return the link
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    const uploadParams: any = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "LoadingImages/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err: any, data: any) {
      if (err) {
        return reject({ error: err });
      }
      console.log(" file uploaded successfully ");
      console.log(data);
      return resolve(data.Location);
    });
  });
};
