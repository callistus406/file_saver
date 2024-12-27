import { Request, Response } from "express";
import File from "../model/file.model";
import { asyncWrapper } from "../middlewares/asyncWrapper.mw";

export const uploadFile = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const file = await File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      url: fileUrl,
    });

    return res.status(200).json({
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    console.error(" Error during file upload:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
};

export const listFiles = async (req: Request, res: Response): Promise<any> => {
  try {
    const files = await File.find();
    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve files" });
  }
};

export const downloadFile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    return res.download(file.path, file.originalname);
  } catch (error) {
    return res.status(500).json({ error: "Failed to download file" });
  }
};
