import React from "react";
import { useForm } from "react-hook-form";
import { addUser } from "../../services";

const Register = () => {

  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = (data) => addUser(data);

  return (
    <form className="login-form content" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <input {...register('name', { required: true } )} type="text" placeholder="Name" autoComplete="nope" />
      </div>
      <div className="input-field">
        <input {...register('mail', { required: true } )} type="email" placeholder="Email" autoComplete="nope" />
      </div>
      <div className="input-field">
        <input
          {...register('password', { required: true } )}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
      </div>
      <div className="input-field">
        <input
          {...register('password', { required: true } )}
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />
      </div>
      <button className="form-submit">Register</button>
    </form>
  );
};

export default Register;
