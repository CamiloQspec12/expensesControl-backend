import { Router } from "express";

const router = Router();


router.get('/', (req, res) => {
    console.log(req.params)
})

export default router