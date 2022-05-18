import React from "react"
import { useForm } from "react-hook-form"
import { addUser } from "../../services"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Notification } from "../../Helpers/Notification"

const Register = () => {
  const schema = yup.object().shape({
    name: yup.string().required().min(3),
    mail: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().min(6).required().equals([yup.ref('password')])
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    addUser(data)
      .then(res => {
        if (res.data.msg === 'ok') {
          Notification('User successfuly registered!', 'success')
          setTimeout(() => window.location.reload(), 2000)
        } else {
          Notification('User alredy registered!', 'warning')
        }
      })
  }

  return (
    <form className="login-form content" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <input {...register('name', { required: true } )} type="text" placeholder="Name" />
        <p className="error-message">{errors.name?.message}</p>
      </div>
      <div className="input-field">
        <input {...register('mail', { required: true } )} type="email" placeholder="Email" />
        <p className="error-message">{errors.mail?.message}</p>
      </div>
      <div className="input-field">
        <input
          {...register('password', { required: true } )}
          type="password"
          placeholder="Password"
        />
        <p className="error-message">{errors.password?.message}</p>
      </div>
      <div className="input-field">
        <input
          {...register('confirmPassword', { required: true } )}
          type="password"
          placeholder="Confirm Password"
        />
        <p className="error-message">{errors.confirmPassword?.message}</p>
      </div>
      <button className="form-submit">Register</button>
    </form>
  )
}

export default Register
