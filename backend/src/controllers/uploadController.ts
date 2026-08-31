import { Request, Response } from 'express';
import cloudinary from '../lib/cloudinary';
import { Readable } from 'stream';

export const uploadMediaToCloudinary = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file provided for upload.' });
    }

    const { folder = 'general' } = req.body;
    const isPdf = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');
    const resourceType = isPdf ? 'raw' : 'auto';

    const uploadPromise = new Promise<{ secure_url: string; public_id: string; format: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `cgec_website/${folder}`,
          resource_type: resourceType,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Cloudinary returned an empty response.'));
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format || (isPdf ? 'pdf' : 'jpg'),
          });
        }
      );

      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);
      stream.pipe(uploadStream);
    });

    const result = await uploadPromise;

    return res.status(200).json({
      message: 'File successfully uploaded to Cloudinary',
      url: result.secure_url,
      publicId: result.public_id,
      storage: 'cloudinary',
      originalName: file.originalname,
      size: file.size,
    });

  } catch (error: any) {
    console.error('❌ Cloudinary upload failed:', error.message || error);
    return res.status(500).json({
      message: `Cloudinary upload failed: ${error.message || error}`,
      error: error.message || 'Upload error',
    });
  }
};
