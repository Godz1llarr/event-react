import './style/ResetPass.scss'
import {
  checkEmpty,
  checkPassword,
  check2Password,
} from './data/UserSign_valid'
import React, { useState } from 'react'
import { UPDATE_PASS } from '../my-config'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import ModalNotification from '../components/ModalNotification'

function ResetPass() {
  const [errorResetMgP1, setErrorResetMgP1] = useState('')
  const [errorResetMgP2, setErrorResetMgP2] = useState('')
  const [resetFD, setResetFD] = useState({
    mbResetPass: '',
    mbResetPassConfirm: '',
  })
  const [showP1, setShowP1] = useState(false)
  const [showP2, setShowP2] = useState(false)

  // Modal
  const [isOpen, setIsOpen] = useState(false)
  const [headerMg, setHeaderMg] = useState('')
  const [bodyMg, setBodyMg] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const usp = new URLSearchParams(location.search)
  const usp_token = usp.get('token')
  // console.log(usp_token)

  const resetHandler = (e) => {
    const id = e.currentTarget.id
    const val = e.currentTarget.value
    // console.log({ id, val });

    setResetFD({ ...resetFD, [id]: val })
  }

  // console.log(resetFD);
  // console.log(resetFD.mbResetPass);

  // 驗證密碼
  const checkResetPass1 = (e) => {
    const val = e.currentTarget.value
    const checkError = checkPassword(val)
    if (checkError === '') {
      setErrorResetMgP1('')
      return true
    } else {
      setErrorResetMgP1(checkError)
      return false
    }
  }
  // 驗證密碼確認
  const checkResetPass2 = (e) => {
    const valResetP1 = resetFD.mbResetPass
    const valResetP2 = e.currentTarget.value
    // console.log(signUpFD.mbrPass);
    const checkError = check2Password(valResetP1, valResetP2)
    if (checkEmpty(valResetP2)) {
      if (checkError === '') {
        setErrorResetMgP2('')
      } else {
        setErrorResetMgP2(checkError)
      }
    } else {
      setErrorResetMgP2('密碼不能為空白')
    }
  }

  async function resetSubmit(e) {
    e.preventDefault()

    // console.log(usp)

    if (!errorResetMgP1 && !errorResetMgP2) {
      const { data } = await axios.put(UPDATE_PASS, resetFD, {
        headers: {
          Authorization: 'Bearer ' + usp_token,
        },
      })

      if (data.success) {
        openModal()
        setHeaderMg('修改密碼')
        setBodyMg('密碼修改成功')
      } else {
        openModal()
        setHeaderMg('修改密碼')
        setBodyMg('密碼修改失敗')
      }
    } else {
      openModal()
      setHeaderMg('修改密碼')
      setBodyMg('密碼修改失敗')
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)

    if (bodyMg === '密碼修改成功') {
      navigate('/')
    }
  }

  return (
    <>
      <div className="s-body-resetpass">
        <div className="s-rp-container">
          <div className="s-rp-resetBx">
            <form action="" onSubmit={resetSubmit} className="s-rp-form">
              <h2 className="s-rp-h2">重新輸入密碼</h2>
              <label htmlFor="mbResetPass" className="s-rp-label">
                密碼<span style={{ color: 'red' }}> *</span>
              </label>
              <div className="s-rp-input-eye">
                <input
                  type={showP1 ? 'text' : 'password'}
                  placeholder="請設定8位英數混合密碼(英文大小寫)"
                  id="mbResetPass"
                  onChange={resetHandler}
                  onBlur={checkResetPass1}
                  className="s-rp-input"
                />
                <i
                  onClick={() => {
                    setShowP1(!showP1)
                  }}
                  className={
                    showP1 ? 'fas fa-eye s-rp-eye' : 'fas fa-eye-slash s-rp-eye'
                  }
                ></i>
              </div>
              <div
                className="s-rp-errorMg"
                style={{ color: 'red' }}
                id="mblEmail_error"
              >
                {errorResetMgP1}
              </div>
              <label htmlFor="mbResetPassConfirm" className="s-rp-label">
                確認密碼<span style={{ color: 'red' }}> *</span>
              </label>
              <div className="s-rp-input-eye">
                <input
                  type={showP2 ? 'text' : 'password'}
                  placeholder="請再輸入一次密碼"
                  id="mbResetPassConfirm"
                  onChange={resetHandler}
                  onBlur={checkResetPass2}
                  className="s-rp-input"
                />
                <i
                  onClick={() => {
                    setShowP2(!showP2)
                  }}
                  className={
                    showP2 ? 'fas fa-eye s-rp-eye' : 'fas fa-eye-slash s-rp-eye'
                  }
                ></i>
              </div>
              <div
                className="s-rp-errorMg"
                style={{ color: 'red' }}
                id="mblEmail_error"
              >
                {errorResetMgP2}
              </div>
              <input
                type="submit"
                value="確認"
                className="s-rp-input-btn s-rp-resetSubmit"
              />
            </form>
          </div>
        </div>
      </div>

      <ModalNotification
        closeModal={closeModal}
        isOpen={isOpen}
        NotificationHeader={headerMg}
        NotificationBody={bodyMg}
      />
    </>
  )
}

export default ResetPass
