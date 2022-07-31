import { IResponse, INext } from "../../interfaces/vendors";
import logger from "../../logger/logger";
import { fillChecklist } from "../../services/filledChecklistService";

export const fillChecklistHandler = async (req: any, res: IResponse, next: INext) => {
    try {
        const input = req.body;
        const orderId = req.params.orderId;
        const payload = req.decoded;
        const image = req.files;

        const filledChecklist = await fillChecklist(input, payload, orderId, image);

        return res.status(201).send({ status: true, message: "checklist filled successfully", data: filledChecklist });
    } catch (error: any) {
        logger.info(error.message);
        next(error);
    }
}
