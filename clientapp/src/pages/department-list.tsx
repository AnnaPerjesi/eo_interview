import { Table } from "@mantine/core";

const elements = [
    { name: 'QWE', shortcut: 'Q' },
    { name: 'ERTZ', shortcut: 'ER' },
    { name: 'FHD', shortcut: 'T' },
    { name: 'BLKGJ', shortcut: 'B' },
    { name: 'CFJ', shortcut: 'C' },
];

function DepartmentList() {
    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.name}</td>
            <td>{element.shortcut}</td>
        </tr>
    ));

    return (
        <Table striped highlightOnHover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Shortcut</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export default DepartmentList;