import { getClassName } from "@miq/utils";

import "./index.scss";

/**
 * SIDEBAR
 */

const SidebarBody = ({ children, footer, ...props }) => {
    return (
        <section {...props} className={getClassName(["miq-admin-aside-body", props.className])}>
            <div className="miq-admin-aside-body-content">{children}</div>
            {footer && <div className="miq-admin-aside-body-footer">{footer}</div>}
        </section>
    );
};

const sidebar = {
    /**
     *
     * @param {*} param0
     * @returns
     */
    Sidebar({ children, ...props }) {
        return (
            <nav {...props} className={getClassName(["miq-admin-aside", props.className])}>
                {children}
            </nav>
        );
    },
    SidebarHeader({ children, ...props }) {
        return (
            <header {...props} className={getClassName(["miq-admin-aside-header", props.className])}>
                {children}
            </header>
        );
    },
};

const Admin = {
    Layout({ children, ...props }) {
        return (
            <div {...props} className={getClassName(["miq-admin", props.className])}>
                {children}
            </div>
        );
    },
    Main({ children, ...props }) {
        return (
            <main {...props} className={getClassName(["miq-admin-main", props.className])} role="main">
                <section className="container">{children}</section>
            </main>
        );
    },

    MobileNavbar({ children, ...props }) {
        return (
            <nav {...props} className={getClassName(["miq-admin-mobile-nav", props.className])}>
                {children}
            </nav>
        );
    },
    ...sidebar,
    SidebarBody,
};

export default Admin;

// export default function AdminLayout(props) {
//     return <div>Admin</div>;
// }
