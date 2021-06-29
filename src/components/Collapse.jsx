import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import { getClassName } from "@miq/utils";

import "./collapse.scss";

export function Collapse({ isOpen, header, children, throttleFor = 400, floating, ...props }) {
    const headerRef = useRef(null);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        const el = headerRef.current;
        if (!floating || !el || typeof window !== "object") return;

        const resize = throttle(
            () => {
                const rect = el.getBoundingClientRect();
                setWidth(rect.width);
            },
            throttleFor,
            { trailing: true }
        );

        window.addEventListener("resize", resize);
        resize();

        return () => window.removeEventListener("resize", resize);
    }, [throttleFor, floating]);

    return (
        <div className="dms-collapse">
            <div className="dms-collapse-header" ref={headerRef}>
                {header}
            </div>
            {isOpen && (
                <div className={getClassName(["dms-collapse-body", floating && "floating"])} style={{ width }}>
                    <div className="inner">{children}</div>
                </div>
            )}
        </div>
    );
}
