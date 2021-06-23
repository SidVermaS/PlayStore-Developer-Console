import React from 'react'
import {useFormik,} from 'formik'
import * as Yup from 'yup'
import {useHistory} from 'react-router-dom'

import {connect} from 'react-redux'
import cookie from 'react-cookies'
import {emailYup, passwordYup} from '../../../../../../utilities/forms/yupObject'
import {postauthloginAPI} from '../../../../../../networks/apis/authAPI'
import {path} from '../../../../../../PageRoutes/routes'
import {setMessage} from '../../../../../../store/actions/message'
import {save} from '../../../../../../store/actions/user'
import {SUCCESS_MESSAGE, ERROR_MESSAGE} from '../../../../../../store/constants'
import {LongButton, TextFieldPrimary} from '../../../../../widgets'

import styles from './index.module.scss'
const Login = (props:any) => {
    const validationSchema=Yup.object().shape({
        email: emailYup,
        password: passwordYup,
    })
    const formik=useFormik({
        initialValues:  {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit:(values)=> {
            submitLogin(values)
        }
    })
    const history=useHistory()
    const submitLogin=async (values: any)=>    {
        try {
            const {status, body}=await postauthloginAPI(values)
            if(status===200)    {
                props.setMessage({type: SUCCESS_MESSAGE, text: body.message})
                cookie.save('token', body.token, {})
                localStorage.setItem('user',JSON.stringify(body.user))
                props.save(body.user)
                history.replace(path.Home)
            }   else    {
                props.setMessage({type: ERROR_MESSAGE, text: body.message})
            }
        }   catch(error)    {
            props.setMessage({type: ERROR_MESSAGE, text: 'Client side error'})
        }
    } 
    return (
        <>
        <h3 className={`${styles.rightPanelHeading} mb-4`}>Sign in</h3>                      
            <form>
                <div className={styles.textFieldPrimaryParent}>
                    <TextFieldPrimary name='email' error={formik.errors.email} type='email' label='Email' placeholder='Enter email...' value={formik.values.email} onChange={formik.handleChange} />
                </div>
                <div className={`${styles.textFieldPrimaryParent} mt-4 mb-5`}>
                    <TextFieldPrimary name='password' error={formik.errors.password} type='password' label='Password' placeholder='Enter password...' value={formik.values.password} onChange={formik.handleChange} />
                </div>
                <div>
                    <LongButton title='LOGIN' onClick={formik.handleSubmit} />
                </div>
            </form>
        <p className={`${styles.newAccountSignUpText} mt-4`} onClick={props.toggle}>New Account? Sign up</p>
        </>
    )
}

const mapStateToProps=({message}: any)=>  ({
    message: message.message
})
export default connect(mapStateToProps,{setMessage,save})(Login)
