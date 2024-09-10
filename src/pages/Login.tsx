import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");

    try {
      const res = await login(data).unwrap();
      console.log("🚀 ~ onSubmit ~ res:", res);

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(
        setUser({
          user: user,
          userData: res.data.userData,
          token: res.data.accessToken,
        })
      );
      toast.success("Logged in", { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        // navigate(`/${user.role}/dashboard`);
        navigate(`/`);
      }
    } catch (err) {
      console.log("🚀 ~ onSubmit ~ err:", err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "0.25rem",
          borderWidth: "1px",
          borderColor: "black",
        }}
      >
        <PHForm onSubmit={onSubmit}>
          <PHInput type="email" name="email" label="Email" />
          <PHInput type="text" name="password" label="Password" />
          <Button htmlType="submit">Login</Button>
          <Button style={{ marginLeft: "15px" }}>
            <Link to={"/register"}>register</Link>
          </Button>
        </PHForm>
      </div>
    </Row>
  );
};

export default Login;
