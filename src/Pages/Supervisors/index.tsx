import { useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import { Endpoints } from "../../lib/Endpoints";
import { FetchData } from "../../lib/FetchData";
import {
  SingleSupervisorResponse,
  SingleStudentResponse,
  Student,
  StudentResponse,
  Supervisor,
  SupervisorResponse,
  DefaultResponse,
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
  Stack,
  Checkbox,
  InputGroup,
  InputLeftAddon,
  Input,
  StackDivider,
  CardBody,
  Heading,
  Box,
  Card,
  useToast,
} from "@chakra-ui/react";

export default function Supervisors() {
  const navigate = useNavigate();
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [isSupervisorsFetching, setSupervisorsFetching] =
    useState<boolean>(false);

  const fetchSupervisors = async () => {
    setSupervisorsFetching(true);
    const supervisorsData: SupervisorResponse = await FetchData({
      type: "GET",
      route: Endpoints.GetSupervisorProfiles,
    });

    setSupervisorsFetching(false);
    console.log(supervisorsData);
    if (supervisorsData.data.auth) {
      setSupervisors(supervisorsData.data.data);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  return (
    <>
      <br />
      <br />
      <Button
        colorScheme={"linkedin"}
        width={200}
        height={35}
        disabled={isSupervisorsFetching}
        onClick={fetchSupervisors}
      >
        Refresh &nbsp;
        {isSupervisorsFetching && (
          <i className="far fa-spinner-third fa-spin" />
        )}
      </Button>
      <br />
      <br />
      {isSupervisorsFetching && (
        <center>
          <Text fontSize={"20px"}>
            Loading &nbsp;
            <i className="far fa-spinner-third fa-spin" />
          </Text>
        </center>
      )}
      {supervisors.length > 0 && !isSupervisorsFetching ? (
        <TableContainer border={"1px"} borderRadius={20} borderColor="#E2E8F0">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>

                <Th>More Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {supervisors.map((supervisor, index) => {
                return (
                  <Tr key={supervisor.id}>
                    <Td color={"blue.500"}>{index}</Td>
                    <Td>{supervisor.firstName}</Td>
                    <Td>{supervisor.lastName}</Td>
                    <Td>{supervisor.email}</Td>
                    <Td>
                      <Button
                        onClick={() => {
                          navigate(`/home/supervisors/${supervisor.id}`);
                        }}
                        colorScheme={"linkedin"}
                        height={9}
                        fontSize={15}
                      >
                        View Details
                      </Button>
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
          {!isSupervisorsFetching && (
            <Text fontSize="xl">There are currently no supervisors!</Text>
          )}
        </center>
      )}
    </>
  );
}
