import { Router } from 'express';
import multer from 'multer';
import { uploadFile, listFiles, downloadFile } from '../controllers/file.controller';

const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', listFiles);
router.get('/download/:id', downloadFile);

export default router;
