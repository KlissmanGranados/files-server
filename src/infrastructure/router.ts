import { Router, Request, Response, NextFunction } from "express";
import service from "./service";

const router = Router();

router.post('/load',
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.files ||
            !req.files.file ||
            !req.files.file['md5'] ||
            !req.files.file['mimetype'] ||
            !req.body.folder) {
            res.status(404);
            return res.json({
                message: "Solicitud rechazada"
            });
        }
        next();
    }, (req: Request, res: Response) => {
        const file = req.files.file;
        const fileName = file['md5'] + new Date().getTime() + '.' + (
            file['mimetype'].split('/')[1]
        );
        service.upload(fileName, req.body.folder, file['data'])
            .then(cdn => {
                res.json({ cdn });
            })
    })

router.delete('/remove/:file/:folder',
    (req: Request, res: Response) => {
        const file = req.params.file;
        service.remove(file, req.params.folder)
            .then(() => {
                res.json({
                    message: 'El archivo ha sido eliminado',
                    archivo: file
                })
            })
    })

export default router;