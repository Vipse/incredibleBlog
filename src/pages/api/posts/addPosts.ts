import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const posts = await Post.insertMany([
          {
            title: "Test title",
            body: "Looooooooooooooooooooooooooooooong post body",
            author: "Vladimir",
          },
          {
            title: "Test title",
            body: "Good post body",
            author: "Josh",
          },
          {
            title: "Test title",
            body: "Teeeeeeeeeeeeeeeeeeeeest nice post body",
            author: "Derek",
          },
        ]); /* create a new model in the database */
        res.status(201).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
