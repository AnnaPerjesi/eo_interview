import { Navbar as MantineNavbar } from "@mantine/core";

import React from 'react';
import {
    IconGitPullRequest,
    IconAlertCircle,
    IconMessages,
    IconDatabase,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useNavigate } from "react-router-dom";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function MainLink({ icon, color, label, onClick }: MainLinkProps) {
    return (
        <UnstyledButton
            onClick={onClick}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
            })}
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
}

const data = [
    { icon: <IconGitPullRequest size="1rem" />, color: 'blue', label: 'Home', path: "/" },
    { icon: <IconMessages size="1rem" />, color: 'violet', label: 'Employes', path: "/employes" },
    { icon: <IconAlertCircle size="1rem" />, color: 'teal', label: 'Departments', path: "/departments" },
    { icon: <IconDatabase size="1rem" />, color: 'grape', label: 'Supervisors', path: "/supervisors" },
];

function Navbar() {

    const navigate = useNavigate()


    const links = data.map((link) => <MainLink {...link} key={link.label} onClick={() => { navigate(link.path) }} />);

    return <MantineNavbar width={{ base: 300 }} height={500} p="xs">
        {links}
    </MantineNavbar>
}

export default Navbar;