import instance from "@/lib/firebase/axios/instance";

export const userServices = {
  getAllUsers: () => instance.get("/api/user"),
};

export default userServices;
