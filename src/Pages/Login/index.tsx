import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Text, Input, Button } from "@chakra-ui/react";
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
  const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [Form, SetForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const loginAdmin = async (e: any) => {
    e.preventDefault();
    const response: LoginResponse = await FetchData({
      route: Endpoints.AdminLogin,
      type: "POST",
      data: Form,
    });

    console.log(response);
    if (response.data.auth) {
      Cookies.set("admin_token", response.data.data);
      navigate("/home");
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
    }, 1300);
  };
  return (
    <div className="login-container flex-column">
      <img src={Logo} alt="" className="login-image" />
      <br />
      <form action="#" onSubmit={loginAdmin}>
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
          <Button type="submit" colorScheme="linkedin" width={"100%"}>
            Continue &nbsp;
            {isFormSubmitting && <i className="far fa-spinner-third fa-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
};
