import { NextResponse } from "next/server";
import fs from "node:fs";

export async function GET(req: Request, res: NextResponse) {
    try {
        if (fs.existsSync("./public/3.jpg")) {
            return res.download('./public/3.jpg','1.jpg');
        }
    } catch (error) {
        console.log(error);
    }
}
 