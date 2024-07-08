import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDelete.module.scss";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;

  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id);
    setDeletedUser(null);
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };

  return (
    <Modal onClose={() => setDeletedUser(null)}>
      <h1 className={styles.modal__title}>Are You Sure?</h1>
      <Button type="button" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
