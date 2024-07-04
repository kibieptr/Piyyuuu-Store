import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children?: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bx-package",
  },
  {
    title: "User List",
    url: "/admin/users",
    icon: "bxs-group",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
