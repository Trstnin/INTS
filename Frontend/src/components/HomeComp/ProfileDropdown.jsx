import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserDataContext } from '../../contexts/userContext';
import { Link } from 'react-router-dom';

export default function ProfileDropDown() {
  const { user } = React.useContext(UserDataContext);
  const [preferenceName, setPreferenceName] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Fetch preference name when the component is mounted
  React.useEffect(() => {
    const fetchPreferenceName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/preferenceName`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.preferenceName) {
          setPreferenceName(response.data.preferenceName);
        }
      } catch (error) {
        console.error('Error fetching preference name:', error);
      }
    };

    fetchPreferenceName();
  }, []); // Empty dependency array means it will run only once on mount

  // Handle dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ padding: 0, minWidth: 'auto' }}
      >
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={user.avatarUrl || '/default-avatar.png'}
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>
            {preferenceName && (
            <span className="text-green-500 text-sm font-medium">
              {preferenceName}
            </span>
          )}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            backgroundColor: '#262626',
            color: 'white',
            minWidth: '200px',
            borderRadius: '8px',
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ fontSize: '14px', '&:hover': { backgroundColor: '#363636' } }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontSize: '14px', '&:hover': { backgroundColor: '#363636' } }}>
          My account
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontSize: '14px', color: '#ff4d4d', '&:hover': { backgroundColor: '#363636' } }}>
          <Link to={'/Logout'} className="w-full">
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
