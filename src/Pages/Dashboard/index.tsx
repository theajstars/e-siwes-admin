import { useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import { Endpoints } from "../../lib/Endpoints";
import { FetchData } from "../../lib/FetchData";
import {
  Student,
  StudentResponse,
  Supervisor,
  SupervisorResponse,
  Year,
  YearResponse,
} from "../../lib/ResponseTypes";
import Container from "../Container";
import Navbar from "../Navbar";
import Profile from "../Profile";
import Students from "../Students";
import Supervisors from "../Supervisors";

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
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import MegaLoader from "../MegaLoader";
export default function Dashboard() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const [areStudentsLoading, setStudentsLoading] = useState<boolean>(false);
  const [areSupervisorsLoading, setSupervisorsLoading] =
    useState<boolean>(false);
  useEffect(() => {
    // Get All Students
    setStudentsLoading(true);
    FetchData({
      type: "GET",
      route: Endpoints.GetStudents,
    })
      .then((response: StudentResponse) => {
        setStudentsLoading(false);
        if (response.data.auth) {
          setStudents(response.data.data);
        }
      })
      .catch(() => {
        setStudentsLoading(false);
      });

    // Get All Supervisors
    setSupervisorsLoading(true);
    FetchData({
      type: "GET",
      route: Endpoints.GetSupervisorProfiles,
    })
      .then((response: SupervisorResponse) => {
        setSupervisorsLoading(false);

        if (response.data.auth) {
          setSupervisors(response.data.data);
        }
      })
      .catch(() => {
        setSupervisorsLoading(false);
      });
  }, []);

  return (
    <>
      <br />
      <br />
      {areStudentsLoading || areSupervisorsLoading ? (
        <MegaLoader />
      ) : (
        <>
          <br />
          <Text fontSize="xl">Students</Text>
          <br />
          {students.length > 0 ? (
            <TableContainer
              border={"1px"}
              borderRadius={20}
              borderColor="#E2E8F0"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                    <Th>Matric Number</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {students.map((student, index) => {
                    return (
                      <Tr>
                        <Td color="blue.500">{index + 1}</Td>
                        <Td>{student.firstName}</Td>
                        <Td>{student.lastName}</Td>
                        <Td>{student.email}</Td>
                        <Td color={"blue.500"}>{student.matricNumber}</Td>
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
                  onClick={() => navigate("/home/students")}
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
          <br />
          <br />
          <Text fontSize="xl">Supervisors</Text>
          <br />
          {supervisors.length > 0 ? (
            <TableContainer
              border={"1px"}
              borderRadius={20}
              borderColor="#E2E8F0"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {supervisors.map((supervisor, index) => {
                    return (
                      <Tr>
                        <Td color="blue.500">{index + 1}</Td>
                        <Td>{supervisor.firstName}</Td>
                        <Td>{supervisor.lastName}</Td>
                        <Td>{supervisor.email}</Td>
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
                  onClick={() => navigate("/home/supervisors")}
                >
                  View All
                </Button>
                <br />
                <br />
              </center>
            </TableContainer>
          ) : (
            <center>
              <Text fontSize="xl">There are currently no supervisors!</Text>
            </center>
          )}
        </>
      )}
    </>
  );
}
