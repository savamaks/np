import { NextApiRequest, NextApiResponse } from "next";
import { mkdir } from "node:fs";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//     }
//     try {
//         const file = req.files.file;
//         const nameFile = file.name;
//          file.mv(`./public\\${nameFile}`);
//     } catch (error) {
//         console.log(error);
//     }

//      mkdir(`./public/lkus`, (error) => {
//          if (error) throw error;
//      });
// }

// export async function GET() {
//     try {
//         // console.log('ggggggggggggggggggggggggggggggggfffffffffffffffffffffffffffffffffffff');
//         const r = "hello";
//         return Response.json(r);
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function POST(req: Request) {
    try {
        // const file = req.files.file;
        console.log(req);
        // return Response
        return Response
        // const nameFile = file.name;
        // file.mv(`./public\\${nameFile}`);
    } catch (error) {
        console.log(error);
    }
}
