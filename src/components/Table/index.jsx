import { isArray } from "lodash";
import { getClassName } from "@miq/utils";

import "./table.scss";

const Header = ({ headers }) => {
    if (!isArray(headers)) return null;

    return (
        <thead className="miq-table-header">
            <tr>
                {headers.map((label) => (
                    <th key={label}>{label}</th>
                ))}
            </tr>
        </thead>
    );
};

export default function Table({ children, ...props }) {
    const { headers, ...rest } = props;
    return (
        <table {...rest} className={getClassName(["miq-table", props.className])}>
            <Header {...props} {...{ headers }} />
            <tbody>{children}</tbody>
        </table>
    );
}
