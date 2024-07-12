import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth/services";
import AuthLayout from "@/components/layouts/AuthLayout";
import { signIn } from "next-auth/react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      setSuccess("Registration successful! Redirecting to login page...");
      setTimeout(() => {
        push("/auth/login");
      }, 2000);
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <AuthLayout
      title="Register Page"
      error={error}
      link="/auth/login"
      linkText="Have an account? Sign in "
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="Enter your fullname"
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          placeholder="Enter your phone number"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <Button type="submit" className={styles.register__button}>
          {isLoading ? "Loading..." : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
