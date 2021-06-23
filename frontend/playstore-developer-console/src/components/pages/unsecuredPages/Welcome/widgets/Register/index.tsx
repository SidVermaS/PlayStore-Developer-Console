
import {useFormik,} from 'formik'
import * as Yup from 'yup'

import {connect} from 'react-redux'
import {nameYup, emailYup, passwordYup} from '../../../../../../utilities/forms/yupObject'
import {postauthregisterAPI} from '../../../../../../networks/apis/authAPI'

import {setMessage} from '../../../../../../store/actions/message'
import {SUCCESS_MESSAGE, ERROR_MESSAGE} from '../../../../../../store/constants'
import {LongButton, TextFieldPrimary} from '../../../../../widgets'

import styles from './index.module.scss'
const Register = (props:any) => {
    const validationSchema=Yup.object().shape({
        name: nameYup,
        email: emailYup,
        password: passwordYup,
    })
    const formik=useFormik({
        initialValues:  {
            name: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit:(values)=> {
            submitRegister(values)
        }
    })
    const submitRegister=async (values: any)=>    {
        try {
            const {status, body}=await postauthregisterAPI(values)
            if(status===201)    {
                props.setMessage({type: SUCCESS_MESSAGE, text: body.message})
                formik.resetForm()
                props.toggle()
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
            <div>
                    <TextFieldPrimary name='name' error={formik.errors.name} type='text' label='Name' placeholder='Enter name...' value={formik.values.name} onChange={formik.handleChange} />
                </div>
                <div className={`mt-4 mb-5`}>
                    <TextFieldPrimary name='email' error={formik.errors.email} type='email' label='Email' placeholder='Enter email...' value={formik.values.email} onChange={formik.handleChange} />
                </div>
                <div className={`mt-4 mb-5`}>
                    <TextFieldPrimary name='password' error={formik.errors.password} type='password' label='Password' placeholder='Enter password...' value={formik.values.password} onChange={formik.handleChange} />
                </div>
                <div>
                    <LongButton title='REGISTER' onClick={formik.handleSubmit} />
                </div>
            </form>
        <p className={`${styles.newAccountSignUpText} mt-4`} onClick={props.toggle}>Already signed in? Login</p>
        </>
    )
}

const mapStateToProps=({message}: any)=>  ({
    message: message.message
})
export default connect(mapStateToProps,{setMessage,})(Register)
