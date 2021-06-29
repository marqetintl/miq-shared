import { getClassName } from "@miq/utils";

export const SectionBody = ({ children, id, className }) => (
    <div id={id} className={getClassName(["section-body", className])}>
        {children}
    </div>
);

export const SectionHeader = ({ children, Icon, id, className }) => (
    <div id={id} className={getClassName(["section-header", className])}>
        {Icon && (
            <div className="">
                <Icon className="icon" />
            </div>
        )}

        {children}
    </div>
);

export const SectionFooter = ({ children, id, className }) => (
    <div id={id} className={getClassName(["section-footer", className])}>
        {children}
    </div>
);
