import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

import './collapse.scss';

import { getClassName } from '@miq/utils';

export function Collapse({ isOpen, header, children, ...props }) {
  const headerRef = useRef(null);
  const [width, setWidth] = useState(null);
  const { throttleFor = 400, floating, autoResize } = props;

  useEffect(() => {
    const el = headerRef.current;
    if (!autoResize || !el || typeof window !== 'object') return;

    const resize = throttle(
      () => {
        const rect = el.getBoundingClientRect();
        setWidth(rect.width);
      },
      throttleFor,
      { trailing: true }
    );

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, [throttleFor, autoResize]);

  return (
    <div className="miq-collapse">
      <div className="miq-collapse-header" ref={headerRef}>
        {header}
      </div>
      {isOpen && (
        <div className={getClassName(['miq-collapse-body', floating && 'floating'])} style={{ width }}>
          <div className="inner">{children}</div>
        </div>
      )}
    </div>
  );
}
