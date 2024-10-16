// /page/api/mypage/route.ts
import { NextApiRequest, NextApiResponse } from "next";

import { CreateUserDto, GetUserDto, UpdateUserDto } from "@/dtos/user.dtos";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "@/controllers/user.controllers";

// Next.js API 핸들러
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      const dto: CreateUserDto = req.body;
      // 사용자 생성
      try {
        const response = await createUser(dto);
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
      }
      break;
    }
    case "GET": {
      const { query } = req;
      // 특정 ID의 사용자 조회
      if (query.id) {
        try {
          const user: GetUserDto | null = await getUserById(query.id as string);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch user" });
        }
      } else {
        // 모든 사용자 조회
        try {
          const users = await getAllUsers();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch users" });
        }
      }
      break;
    }
    case "PUT": {
      const { id } = req.query;
      const dto: UpdateUserDto = req.body;
      // 사용자 업데이트
      try {
        const updatedUser = await updateUser(id as string, dto);
        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
      }
      break;
    }
    case "DELETE": {
      const { id } = req.query;
      // 사용자 삭제
      try {
        const deletedUser = await deleteUser(id as string);
        if (!deletedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
      }
      break;
    }
    default: {
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
}
