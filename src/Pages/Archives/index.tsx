import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Box,
  Text,
  StackDivider,
  useToast,
} from "@chakra-ui/react";
import { CSVDownload, CSVLink } from "react-csv";

import {
  ArchiveResponse,
  Student,
  StudentResponse,
  Supervisor,
  SupervisorResponse,
  Year,
  YearResponse,
} from "../../lib/ResponseTypes";
import { FetchData } from "../../lib/FetchData";
import { Endpoints } from "../../lib/Endpoints";
import { useNavigate } from "react-router-dom";
import { getCourseName, getStudentBankName } from "../../App";
export default function Archives() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [exportData, setExportData] = useState<any[]>([]);

  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [archives, setArchives] = useState<Year[]>([]);
  const [isDownloadReady, setDownloadReady] = useState<boolean>(false);
  const getSupervisor = (supervisorID: string) => {
    const supervisorFound = supervisors.filter((s) => s.id === supervisorID)[0];
    if (!supervisorFound) {
      return "Not Assigned";
    }
    return `${supervisorFound.firstName} ${supervisorFound.lastName}`;
  };
  const DataHeaders = [
    { key: "MatricNumber", label: "Matric Number" },
    { key: "FirstName", label: "First Name" },
    { key: "LastName", label: "Last Name" },
    { key: "Email", label: "Email" },
    { key: "Phone", label: "Phone" },
    { key: "PaymentStatus", label: "Payment Status" },
    { key: "courseOfStudy", label: "Course of Study" },
    { key: "Supervisor", label: "Supervisor" },
    { key: "AttatchmentPeriod", label: "Attatchment Period" },
    { key: "BankName", label: "Bank Name" },
    { key: "BankNumber", label: "Bank Number" },
    { key: "SortCode", label: "Sort Code" },
    { key: "MasterListNumber", label: "Master List Number" },
    { key: "CompanyName", label: "Company Name" },
    { key: "CompanyAddress", label: "Company Address" },
  ];
  const GetArchive = async (year: string) => {
    setDownloadReady(false);
    const fetchYear: YearResponse = await FetchData({
      type: "POST",
      route: Endpoints.ObtainCurrentYear,
      data: { year: year },
    }).catch(() => {
      addToast({
        description: "An error occured!",
        status: "error",
      });
    });
    console.log(fetchYear);
    if (fetchYear.data.auth) {
      const { students } = fetchYear.data.data;
      const exportData = students.map((singleStudent) => {
        let obj = {
          AttatchmentPeriod: singleStudent.attachmentPeriod,
          BankName: getStudentBankName(singleStudent.bankAccount.name),
          BankNumber: singleStudent.bankAccount.number,
          SortCode: singleStudent.bankAccount.sortCode,
          MasterListNumber: singleStudent.bankAccount.masterListNumber,
          CompanyName: singleStudent.company.name,
          CompanyAddress: singleStudent.company.address,
          courseOfStudy: getCourseName(singleStudent.courseOfStudy),
          Email: singleStudent.email,
          FirstName: singleStudent.firstName,
          PaymentStatus: singleStudent.hasPaid ? "Paid" : "Not Paid",
          LastName: singleStudent.lastName,
          MatricNumber: singleStudent.matricNumber,
          Phone: singleStudent.phone,
          Supervisor: getSupervisor(singleStudent.supervisor),
        };
        return obj;
      });

      console.log("Data to export", exportData);
      setExportData(exportData);
      setDownloadReady(true);
      const downloadElement = (
        <CSVDownload
          data={exportData}
          headers={DataHeaders}
          filename={`SIWES Year ${year}`}
        />
      );
    }
  };
  useEffect(() => {
    FetchData({
      type: "GET",
      route: Endpoints.GetPastArchives,
    })
      .then((response: ArchiveResponse) => {
        if (response.data.auth) {
          console.log(response);

          setArchives(response.data.data);
        }
      })
      .catch(() => {
        addToast({
          description: "An error occured!",
          status: "error",
        });
      });

    // Get All Supervisors
    FetchData({
      type: "GET",
      route: Endpoints.GetSupervisorProfiles,
    })
      .then((response: SupervisorResponse) => {
        if (response.data.auth) {
          console.log(response);
          setSupervisors(response.data.data);
        }
      })
      .catch(() => {
        addToast({
          description: "An error occured!",
          status: "error",
        });
      });
  }, []);
  // Get All Students

  return (
    <>
      <br />
      <br />
      <Card>
        <CardHeader>
          <Heading size="md">Past Archives</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {archives.map((archiveItem) => {
              return (
                <Box>
                  <Heading fontSize="16px" textTransform="uppercase">
                    {archiveItem.year}
                  </Heading>

                  <Text
                    pt="2"
                    fontSize="16px"
                    color="linkedin.400"
                    cursor="pointer"
                    onClick={(e) => {
                      GetArchive(archiveItem.year);
                      setTimeout(() => {
                        document
                          .getElementById(`download${archiveItem.year}`)
                          ?.click();
                      }, 1500);
                    }}
                  >
                    Download
                  </Text>
                  <CSVLink
                    id={`download${archiveItem.year}`}
                    data={exportData}
                    headers={DataHeaders}
                    filename={`SIWES Year ${archiveItem.year}`}
                    onClick={() => {
                      return true;
                    }}
                  ></CSVLink>
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
