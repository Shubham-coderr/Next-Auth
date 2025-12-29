import { TokenPayload } from "./types";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as TokenPayload;
    return decodedToken.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
