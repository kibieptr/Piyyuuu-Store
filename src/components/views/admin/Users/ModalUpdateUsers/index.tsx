import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { UpdatedUser, setUpdatedUser, setUsersData } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(UpdatedUser.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser(null);
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser(null)}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={UpdatedUser.email}
          disabled
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="Enter your fullname"
          defaultValue={UpdatedUser.fullname}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          placeholder="Enter your phone number"
          defaultValue={UpdatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={UpdatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
