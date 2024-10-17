// import { CreateUserDto, GetUserDto, UpdateUserDto } from "@/dtos/user.dtos";
// import {
//   createUser,
//   deleteUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
// } from "@/controllers/user.controllers";
// import { NextRequest, NextResponse } from "next/server";

// // POST 요청 핸들러
// const handlePost = async (req: NextRequest, res: NextResponse) => {
//   try {
//     const dto: CreateUserDto = await req.json();

//     await createUser(dto);
//     return new NextResponse("User created successfully", { status: 200 });
//   } catch (error) {
//     return new NextResponse("Failed to create user", { status: 500 });
//   }
// };

// // GET 요청 핸들러
// const handleGet = async (req: NextRequest, res: NextResponse) => {
//   const { searchParams } = req.nextUrl;

//   const id = searchParams.get("id");

//   try {
//     if (id) {
//       const user: GetUserDto | null = await getUserById(id as string);

//       if (!user) return new Response("User not found", { status: 404 });

//       return NextResponse.json(user);
//     } else {
//       const users = await getAllUsers();

//       return NextResponse.json(users);
//     }
//   } catch (error) {
//     return new NextResponse("Failed to create user(s)", { status: 500 });
//   }
// };

// // PUT 요청 핸들러
// const handlePut = async (req: NextRequest, res: NextResponse) => {
//   try {
//     const { searchParams } = req.nextUrl;

//     const id = searchParams.get("id");

//     const dto: UpdateUserDto = await req.json();

//     await updateUser(id as string, dto);
//     return new NextResponse("User updated successfully", { status: 200 });
//   } catch (error) {
//     return new NextResponse("Failed to update user", { status: 500 });
//   }
// };

// // DELETE 요청 핸들러
// const handleDelete = async (req: NextRequest, res: NextResponse) => {
//   try {
//     const { searchParams } = req.nextUrl;

//     const id = searchParams.get("id");
//     const deletedUser = await deleteUser(id as string);
//     if (!deletedUser) return new Response("User not found", { status: 404 });
//     return new NextResponse("User deleted successfully", { status: 200 });
//   } catch (error) {
//     return new NextResponse("Failed to delete user", { status: 500 });
//   }
// };

// // 메인 핸들러 함수
// export async function handler(req: NextRequest, res: NextResponse<any>) {
//   const { method } = req;

//   switch (method) {
//     case "POST":
//       return handlePost(req, res);
//     case "GET":
//       return handleGet(req, res);
//     case "PUT":
//       return handlePut(req, res);
//     case "DELETE":
//       return handleDelete(req, res);
//     default:
//       return new NextResponse("NOT ACEESS", { status: 505 });
//   }
// }

export async function POST(req: Request) {}
