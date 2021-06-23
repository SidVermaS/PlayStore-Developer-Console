import * as Yup from 'yup'

const nameYup=Yup.string().matches(/^[A-Za-z ]*$/,'Name is invalid').min(3).max(32).required('Name is required')
const appNameYup=Yup.string().matches(/^[A-Za-z0-9 ]*$/,'App name is invalid').min(3, 'Atleast 3 characters').max(32,'Only 32 characters are allowed').required('App name is required')
const emailYup=Yup.string().email('Email is invalid').min(8, 'Atleast 8 characters').max(32, 'Only 32 characters are allowed').required('Email is required')

const passwordYup=Yup.string().min(6, 'Atleast 6 characters').max(32, 'Only 32 characters are allowed').matches(/[a-z]/,'Atleast one lowercase char').matches(/[A-Z]/,'Atleast one uppercase char').matches(/[0-9]/,'Atleast 1 number').matches(/[^a-zA-Z0-9\s]+/,'Atleast 1 special char (@, !, #, etc).').required('Password is required')

const packageUrlYup=Yup.string().min(8,'Atleast 8 characters').max(32,'Only 32 characters are allowed').matches(/^com\.[a-zA-Z]+\.[a-zA-Z]+$/,'Package URL is invalid').required('Package URL is required')

const versionNoYup=Yup.string().min(5, 'Version no. is invalid').max(5,'Version no. is invalid').matches(/^\d\.\d\.\d$/,'Version no. is invalid').required('Version no. is required')

export {nameYup,appNameYup, emailYup, passwordYup, packageUrlYup, versionNoYup}