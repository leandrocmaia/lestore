import { NextApiRequest, NextApiResponse } from "next";
import { File, IncomingForm } from "formidable";
import aws from "aws-sdk";
import { uuid } from "uuidv4";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};

export const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Uploading image...");

  const form = new IncomingForm();

  const fileUrl: string = await new Promise(function (resolve, reject) {
    form.parse(req, async function (err, fields, files) {
      const fileUrl = await saveFile(files.product_photo as File);
      resolve(fileUrl);
    });
  });

  res.status(200).json({ url: fileUrl });
};

const saveFile = async (file: File) => {
  aws.config.logger = console;
  const s3 = new aws.S3({
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    region: process.env.S3_UPLOAD_REGION,
  });

  const binaryFile = fs.readFileSync(file.filepath);
  console.log(binaryFile);
  console.log(process.env.S3_UPLOAD_BUCKET);
  const post = await s3
    .upload(
      {
        Body: binaryFile,
        Key: uuid(),
        Bucket: process.env.S3_UPLOAD_BUCKET || "",
      },
      (error, data) => {
        console.log(error);
        console.log("Uploaded");
      }
    )
    .promise();
  return post.Location;
};
export default upload;
