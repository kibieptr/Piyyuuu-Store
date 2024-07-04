import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Users.module.scss";

type PropTypes = {
  users: any;
};

const UsersAdminView = (props: PropTypes) => {
  const { users } = props;
  console.log(users);
  return (
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
            {users.map((user: any, index: number) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <div className={styles.users__table__actions}>
                    <Button type="button">Update</Button>
                    <Button type="button">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UsersAdminView;
