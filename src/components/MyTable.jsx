import React from 'react';
import { Table } from 'react-bootstrap';

const MyTable = ({ users }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>№</th>
          <th>ID</th>
          <th>Full Name</th>
          <th>Full Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={u.id}>
            <td>{i + 1}</td>
            <td>{u.id}</td>
            <td>{u.fullName}</td>
            <td>{u.address}</td>
            <td>{u.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MyTable;
