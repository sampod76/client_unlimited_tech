import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [registration, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");

    try {
      const res = await registration(data).unwrap();
      console.log("🚀 ~ onSubmit ~ res:", res);

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });

      if (res.data?.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      console.log("🚀 ~ onSubmit ~ err:", err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className="border p-5 min-w-96">
        <PHForm onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <PHInput type="text" name="firstName" label="First Name" />
            <PHInput type="text" name="lastName" label="Last Name" />
          </div>
          <PHInput className="-mt-6" type="email" name="email" label="Email" />
          <PHInput type="text" name="password" label="Password" />

          <Button htmlType="submit" className="w-full">
            Register
          </Button>
          <div className="flex justify-end items-center ">
            <Link className="my-2 border rounded-md w-fit p-1" to={"/login"}>
              login
            </Link>
          </div>
        </PHForm>
      </div>
    </Row>
  );
};

export default Register;
