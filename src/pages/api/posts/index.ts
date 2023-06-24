import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";
import { pageLimit } from "@/config/pageLimit";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { page = "1", search = "" } = req.query as {
          page: string;
          search: string;
        };
        const parsedPage = parseInt(page, 10);

        const posts = await Post.find({
          $or: [
            { title: { $regex: search, $options: "i" } }, // "i" option for case-insensitive search
            { body: { $regex: search, $options: "i" } },
          ],
        })
          .skip((parsedPage - 1) * pageLimit)
          .limit(pageLimit)
          .exec();

        // Count the total number of posts
        const totalPosts = await Post.countDocuments({
          $or: [
            { title: { $regex: search, $options: "i" } }, // "i" option for case-insensitive search
            { body: { $regex: search, $options: "i" } },
          ],
        }).exec();

        // Return the posts and pagination metadata in the API response
        res.status(200).json({
          posts,
          currentPage: parsedPage,
          totalPages: Math.ceil(totalPosts / pageLimit),
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
