import React, { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { getUser, loginedPerson } from "../../services";
import { getDataAction } from "../../redux/getData/getDataAction";
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.data)

  const {
    register,
    handleSubmit
  } = useForm()

  const onSubmit = (data) => {
    getUser(data).then(res => {
      dispatch(getDataAction(res))
    })
  }

  useEffect(() => {
    if (typeof userData === 'string') localStorage.setItem('user', userData)
  }, [userData])

  useLayoutEffect(() => {
    const data = localStorage.getItem('user')
    loginedPerson(data)
      .then(res => {
        if (res.data.msg === 'ok') window.location.href = '/feed'
      })
      .catch(err => console.log('err', err))
  }, [])

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
  )
}

export default Login;
