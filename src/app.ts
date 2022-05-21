import express, { NextFunction, Request, Response } from "express";
import router from "./infrastructure/router";
import fileUpload from "express-fileupload";

const app = express();

app.set("port", process.env.PORT || 3500);
app.use((req: Request, res: Response, next: NextFunction) => {

    if (req.headers['api-key'] === process.env.API_KEY) {
        return next();
    }
    res.status(404);
    res.json({
        message: 'No autorizado'
    })

})
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;