import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    // Use state to handle menu open/close
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Get current theme and check if the screen is mobile sized
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Menu items array - you can customize these
    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Products', path: '/products' },
        { text: 'Services', path: '/services' },
        { text: 'About Us', path: '/about' },
        { text: 'Contact', path: '/contact' }
    ];
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Material UI App
                </Typography>

                {/* Show hamburger on mobile, regular links on desktop */}
                {isMobile ? (
                    // Mobile view - hamburger menu
                    <>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                style: {
                                    width: '100%',
                                    maxWidth: '100%',
                                    left: 0,
                                    right: 0,
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    marginTop: '8px',
                                    borderRadius: 0
                                }
                            }}
                            MenuListProps={{
                                style: {
                                    padding: 0
                                }
                            }}
                            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                        >
                            {menuItems.map((item, index) => [
                                <MenuItem
                                    key={`item-${index}`}
                                    onClick={handleMenuClose}
                                    sx={{
                                        py: 2,
                                        justifyContent: 'center',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {item.text}
                                </MenuItem>,
                                index < menuItems.length - 1 && (
                                    <Box
                                        key={`divider-${index}`}
                                        sx={{
                                            height: '1px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            width: '100%'
                                        }}
                                    />
                                )
                            ]).flat().filter(Boolean)}
                            <Box
                                sx={{
                                    height: '1px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    width: '100%'
                                }}
                            />
                            <MenuItem
                                onClick={handleMenuClose}
                                sx={{
                                    py: 2,
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Login
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    // Desktop view - regular buttons
                    <Box sx={{ display: 'flex' }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                color="inherit"
                                sx={{ mx: 1 }}
                            >
                                {item.text}
                            </Button>
                        ))}
                        <Button
                            color="inherit"
                            variant="outlined"
                            sx={{ ml: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header