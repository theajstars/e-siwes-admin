import { useState, useEffect } from "react";

import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { validateEmail } from "../../App";

type ResetPasswordType = {
  code: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
const Reset = () => {
  const addToast = useToast();
  const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [isCodeResending, setCodeResending] = useState<boolean>(false);
  const [Form, SetForm] = useState<ResetPasswordType>({
    code: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const resetPassword = (e: any) => {
    e.preventDefault();
  };
  const resendCode = () => {
    const isEmailValid = validateEmail(Form.email);
    if (!isEmailValid) {
      addToast({
        description: "Please enter a valid email",
        status: "error",
      });
    } else {
      // Send new code
    }
  };

  return (
    <div className="login-container flex-column">
      <form action="#" onSubmit={(e) => resetPassword(e)}>
        <div className="login-form flex-column">
          <Text fontSize="2xl">Reset Password</Text>
          <Input
            variant="outline"
            value={Form.email}
            onChange={(e) => {
              SetForm({ ...Form, email: e.target.value });
            }}
            type="text"
            name="sefen-digit-code-ffs"
            placeholder="Email"
            spellCheck={false}
          />
          <Input
            variant="outline"
            value={Form.code}
            onChange={(e) => {
              SetForm({ ...Form, code: e.target.value });
            }}
            type="text"
            name="sefen-digit-code-ffs"
            placeholder="7 Digit Code"
            spellCheck={false}
            maxLength={7}
            textTransform="uppercase"
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={5}
            justifyContent="space-between"
            width="100%"
          >
            <Input
              variant="outline"
              value={Form.password}
              onChange={(e) => {
                SetForm({ ...Form, password: e.target.value });
              }}
              placeholder="Password"
              type={"password"}
            />
            <Input
              variant="outline"
              value={Form.passwordConfirm}
              onChange={(e) => {
                SetForm({ ...Form, passwordConfirm: e.target.value });
              }}
              placeholder="Confirm Password"
              type={"password"}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={5}
            justifyContent="space-between"
            width="100%"
          >
            <Button
              type="button"
              colorScheme="whatsapp"
              width={"100%"}
              onClick={resendCode}
              disabled={isCodeResending}
              opacity={isCodeResending ? 0.5 : 1}
            >
              Resend Code &nbsp;
              {isCodeResending && (
                <i className="far fa-spinner-third fa-spin" />
              )}
            </Button>
            <Button
              type="submit"
              colorScheme="linkedin"
              width={"100%"}
              disabled={isFormSubmitting}
              opacity={isFormSubmitting ? 0.5 : 1}
            >
              Continue &nbsp;
              {isFormSubmitting && (
                <i className="far fa-spinner-third fa-spin" />
              )}
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default Reset;
