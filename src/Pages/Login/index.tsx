import { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import { Text, Input, Button, useToast } from "@chakra-ui/react";
import Logo from "../../Assets/IMG/Logo.png";
import { AxiosResponse } from "axios";
import { FetchData } from "../../lib/FetchData";
import { Endpoints } from "../../lib/Endpoints";
import { DefaultResponse, LoginResponse } from "../../lib/ResponseTypes";
import Cookies from "js-cookie";

type LoginFormType = {
  email: string;
  password: string;
};
export const Login = () => {
  const navigate = useNavigate();
  const addToast = useToast();
  const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [Form, SetForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const loginAdmin = async (e: any) => {
    if (Form.email.length > 0 && Form.password.length > 0) {
      e.preventDefault();
      setFormSubmitting(true);
      const response: LoginResponse = await FetchData({
        route: Endpoints.AdminLogin,
        type: "POST",
        data: Form,
      }).catch(() => {
        addToast({
          status: "error",
          description: "An error occured! Please try again",
        });
      });
      setFormSubmitting(false);
      console.log(response);
      if (response.data.auth) {
        Cookies.set("admin_token", response.data.data);
        window.location.href = "/home";
      } else {
        addToast({
          title: "Invalid login details",
          status: "error",
        });
      }
    }
  };
  return (
    <div className="login-container flex-column">
      <img src={Logo} alt="" className="login-image" />
      <br />
      <form action="#" onSubmit={(e) => loginAdmin(e)}>
        <div className="login-form flex-column">
          <Text fontSize="2xl">Login</Text>
          <Input
            variant="outline"
            value={Form.email}
            onChange={(e) => {
              SetForm({ ...Form, email: e.target.value });
            }}
            placeholder="Email"
            spellCheck={false}
          />
          <Input
            variant="outline"
            value={Form.password}
            onChange={(e) => {
              SetForm({ ...Form, password: e.target.value });
            }}
            placeholder="Password"
            type={"password"}
          />
          <Button
            type="submit"
            colorScheme="linkedin"
            width={"100%"}
            disabled={isFormSubmitting}
            opacity={isFormSubmitting ? 0.5 : 1}
          >
            Continue &nbsp;
            {isFormSubmitting && <i className="far fa-spinner-third fa-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
};
