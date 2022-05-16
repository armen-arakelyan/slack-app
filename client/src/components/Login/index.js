import React from "react";
import { useForm } from "react-hook-form";
import { getUser } from "../../services";

const Login = () => {
  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = (data) => getUser(data);

  return (
    <form className="login-form content" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <input {...register('mail', { required: true }) } type="email" placeholder="Email" autoComplete="nope" />
      </div>
      <div className="input-field">
        <input
          {...register('password', { required: true }) }
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
      </div>
      <button className="form-submit">Login</button>
    </form>
  );
};

export default Login;
