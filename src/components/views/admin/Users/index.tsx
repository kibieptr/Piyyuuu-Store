import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Users.module.scss";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUsers";
import ModalDeleteUser from "./ModalDeleteUsers";

type User = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
};

type PropTypes = {
  users: User[];
};

const UsersAdminView = ({ users }: PropTypes) => {
  const [UpdatedUser, setUpdatedUser] = useState<User | null>(null);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [deletedUser, setDeletedUser] = useState<User | null>(null);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>User Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__actions}>
                      <Button
                        className={styles.users__table__actions__edit}
                        type="button"
                        onClick={() => setUpdatedUser(user)}
                      >
                        <i className="bx bxs-edit" />
                      </Button>
                      <Button
                        type="button"
                        className={styles.users__table__actions__delete}
                        onClick={() => setDeletedUser(user)}
                      >
                        <i className="bx bxs-trash" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {UpdatedUser && (
        <ModalUpdateUser
          UpdatedUser={UpdatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {deletedUser && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default UsersAdminView;
