import React, { useEffect, useLayoutEffect } from "react"
import { useForm } from "react-hook-form"
import { getUser, loginedPerson } from "../../services"
import { getDataAction } from "../../redux/getData/getDataAction"
import { getUserDataAction } from "../../redux/getUserData/getUserDataAction"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './style.css'
import { Notification } from "../../Helpers/Notification"

const schema = yup.object().shape({
  mail: yup.string().required().email(),
  password: yup.string().required().min(6)
})

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.data)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    getUser(data).then(res => {
      if (res.data.msg === 'err') {
        Notification('No such user exists', 'warning')
      }
      dispatch(getDataAction(res))
    }).catch(() => Notification('Wrong Password', 'warning'))
  }

  useEffect(() => {
    if (typeof userData === 'string') localStorage.setItem('user', userData)
  }, [userData])

  useLayoutEffect(() => {
    const data = localStorage.getItem('user')
    loginedPerson(data)
      .then(res => {
        if (res.data.msg === 'ok') {
          dispatch(getUserDataAction(res.data.user))
          navigate('feed')
        }
      })
      .catch(err => console.log('err', err))
  }, [navigate, dispatch])

  return (
    <form className="login-form content" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <input {...register('mail', { required: true }) } type="email" placeholder="Email" />
        <p className="error-message">{errors.mail?.message}</p>
      </div>
      <div className="input-field">
        <input
          {...register('password', { required: "Please enter your password." }) }
          type="password"
          placeholder="Password"
        />
        <p className="error-message">{errors.password?.message}</p>
      </div>
      <button className="form-submit">Login</button>
    </form>
  )
}

export default Login
