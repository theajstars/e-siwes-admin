import { useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import { Endpoints } from "../../lib/Endpoints";
import { FetchData } from "../../lib/FetchData";
import {
  SingleSupervisorResponse,
  Student,
  StudentResponse,
  Supervisor,
  SupervisorResponse,
} from "../../lib/ResponseTypes";

import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Text,
  Button,
} from "@chakra-ui/react";

import Container from "../Container";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  useEffect(() => {
    // Get All Students
    FetchData({
      type: "GET",
      route: Endpoints.GetStudents,
    }).then((response: StudentResponse) => {
      if (response.data.auth) {
        setStudents(response.data.data);
      }
    });
    FetchData({
      type: "GET",
      route: Endpoints.GetSupervisorProfiles,
    }).then((response: SupervisorResponse) => {
      if (response.data.auth) {
        setSupervisors(response.data.data);
      }
    });
  }, []);

  const getSupervisor = (supervisorID: string) => {
    const isSupervisorFound = supervisors.filter(
      (supervisor) => supervisor.id === supervisorID
    );
    console.log(isSupervisorFound);
    console.log(supervisors);
    if (isSupervisorFound.length > 0) {
      return isSupervisorFound[0].firstName
        .concat(" ")
        .concat(isSupervisorFound[0].lastName);
    } else {
      return null;
    }
  };
  return (
    <>
      <br />
      <br />
      <br />
      <Container>
        {students.length > 0 ? (
          <TableContainer
            border={"1px"}
            borderRadius={20}
            borderColor="#E2E8F0"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Matric Number</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>Payment Status</Th>
                  <Th>Supervisor</Th>
                  <Th>Bank Name</Th>
                  <Th>Account Number</Th>
                  <Th>Sort Code</Th>
                  <Th>Master List Number</Th>
                  <Th>Level</Th>
                  <Th>Course</Th>
                  <Th>Internship Duration</Th>
                  <Th>Company Name</Th>
                  <Th>Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                {students.map((student, index) => {
                  console.log(student);
                  const supervisor = getSupervisor(student.supervisor);

                  return (
                    <Tr>
                      <Td color={"blue.500"}>{student.matricNumber}</Td>
                      <Td>{student.firstName}</Td>
                      <Td>{student.lastName}</Td>
                      <Td>{student.email}</Td>
                      <Td>{student.phone}</Td>
                      <Td color={student.hasPaid ? "blue.600" : "red.500"}>
                        {student.hasPaid ? "Paid" : "Not Paid"}
                      </Td>
                      <Td>
                        {supervisor === null
                          ? "No Supervisor assigned"
                          : supervisor}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <center>
              <br />
              <Button
                type="submit"
                colorScheme="linkedin"
                width={"300px"}
                height={35}
              >
                View All
              </Button>
              <br />
              <br />
            </center>
          </TableContainer>
        ) : (
          <center>
            <Text fontSize="xl">There are currently no students!</Text>
          </center>
        )}
      </Container>
    </>
  );
}
