import React from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';

// Define props interface with TypeScript
interface UserCardProps {
    name: string;
    role: string;
    avatarUrl?: string;
    onContact?: () => void;
}

// Component with typed props
const UserCard: React.FC<UserCardProps> = ({
    name,
    role,
    avatarUrl,
    onContact
}) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        src={avatarUrl}
                        alt={name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {role}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onContact}
                    disabled={!onContact}
                >
                    Contact
                </Button>
            </CardContent>
        </Card>
    );
};

export default UserCard;