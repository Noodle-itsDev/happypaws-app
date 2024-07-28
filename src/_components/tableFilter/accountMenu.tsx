import * as React from 'react';
import { useEffect, useRef } from 'react';

const ButtonWithDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) && anchorEl !== event.target) {
      handleClose();
    }
  };

  useEffect(() => {
    if (anchorEl) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
      <button style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#6200ea', color: '#fff', cursor: 'pointer' }}>Button 1</button>
      <button style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#6200ea', color: '#fff', cursor: 'pointer' }}>Button 2</button>
      <div>
        <button
          style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#6200ea', color: '#fff', cursor: 'pointer' }}
          onClick={handleClick}
        >
          Dropdown
        </button>
        {open && (
          <ul
            ref={menuRef}
            style={{
              position: 'absolute',
              top: '60px',
              right: '20px',
              padding: '10px',
              margin: '0',
              listStyle: 'none',
              backgroundColor: '#fff',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              borderRadius: '5px',
              zIndex: 1000,
            }}
          >
            <li style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={handleClose}>Item 1</li>
            <li style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={handleClose}>Item 2</li>
            <li style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={handleClose}>Item 3</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ButtonWithDropdown;
