import { useState, useEffect } from "react";

import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { validateEmail } from "../../App";
import { FetchData } from "../../lib/FetchData";
import { Endpoints } from "../../lib/Endpoints";
import {
  Admin,
  AdminResponse,
  ValidatePasswordResponse,
} from "../../lib/ResponseTypes";

export default function Profile() {
  const addToast = useToast();
  const [admin, setAdmin] = useState<Admin>();
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassowrd, setConfirmNewPassword] = useState<string>("");

  const GetAdminDetails = async () => {
    const adminDetails: AdminResponse = await FetchData({
      route: Endpoints.GetAdminProfile,
      type: "GET",
    });
    console.log(adminDetails);
    if (adminDetails.data.auth) {
      setAdmin(adminDetails.data.data);
    }
  };

  const ValidateAdminPassword = async (passwordToValidate: string) => {
    const validatePassword: ValidatePasswordResponse = await FetchData({
      type: "POST",
      route: Endpoints.ValidateAdminPassword,
      data: { password: passwordToValidate },
    });
    return validatePassword.data.auth;
  };
  const ChangePassword = async () => {
    if (currentPassword.length === 0) {
      addToast({
        description: "Please provide your current password",
        status: "warning",
      });
    } else if (newPassword.length < 7) {
      addToast({
        description: "Password must be at least 7 characters",
        status: "warning",
      });
    } else if (newPassword !== confirmNewPassowrd) {
      addToast({
        description: "Passwords do not match!",
        status: "warning",
      });
    }

    if (
      currentPassword.length > 0 &&
      newPassword.length > 7 &&
      newPassword === confirmNewPassowrd
    ) {
      const isPasswordValid = await ValidateAdminPassword(currentPassword);
      if (isPasswordValid) {
        FetchData({
          route: Endpoints.UpdateAdminPassword,
          type: "POST",
          data: { password: newPassword },
        });
      } else {
        addToast({
          description: "Password is not correct!",
          status: "error",
        });
      }
    }
  };

  const ChangeEmail = async () => {
    const isPasswordValid = await ValidateAdminPassword(password);
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      addToast({
        title: "Please enter a valid email!",
        status: "error",
      });
    } else {
      if (email !== confirmEmail) {
        addToast({
          title: "Emails do not match!",
          status: "error",
        });
      }
    }
    if (isEmailValid && email === confirmEmail) {
      // Change admin email
      if (isPasswordValid) {
        FetchData({
          route: Endpoints.UpdateAdminEmail,
          type: "POST",
          data: { newEmail: email },
        });
      } else {
        addToast({
          title: "Password is not correct!",
          status: "error",
        });
      }
    }
  };

  useEffect(() => {
    GetAdminDetails();
  }, []);
  return (
    <>
      <br />
      <br />
      <Text size={"24px"}>Update Email</Text>
      <br />
      <Stack spacing={45} direction="column">
        <Stack spacing={5} direction="column">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New Email"
            spellCheck={false}
          />
          <Input
            type="text"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm Email"
            spellCheck={false}
          />
          <Input
            type="password"
            placeholder="Input password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button colorScheme={"linkedin"} onClick={ChangeEmail}>
            Change Email
          </Button>
        </Stack>
        <Stack spacing={5} direction="column">
          <Text size={"24px"}>Update Password</Text>
          <Input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={confirmNewPassowrd}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button colorScheme={"linkedin"} onClick={ChangePassword}>
            Change Password
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
