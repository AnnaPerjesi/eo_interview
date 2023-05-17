import { AppShell, Header } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

interface ILayoutProps {
}

function Layout({ }: ILayoutProps) {
    return <AppShell
        padding="md"
        navbar={<Navbar />}
        header={<Header height={60} p="xs">Interview</Header>}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
    >
        <Outlet />
    </AppShell>
}

export default Layout;