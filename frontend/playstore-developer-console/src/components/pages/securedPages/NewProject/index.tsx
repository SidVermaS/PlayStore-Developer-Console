import {useRef} from 'react'
import {connect} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import styles from './index.module.scss'
import {TextFieldPrimary, LongButton,FileInput} from '../../../widgets'
import {appNameYup,packageUrlYup,versionNoYup} from  '../../../../utilities/forms/yupObject'

import {postprojectAPI} from '../../../../networks/apis/projectAPI'

import {setMessage} from '../../../../store/actions'
import {SUCCESS_MESSAGE, ERROR_MESSAGE} from '../../../../store/constants'

const NewProject = (props: any) => {
    const fileRef=useRef<any>(null)
    const validationSchema=Yup.object().shape({
        app_name: appNameYup,
        package_url: packageUrlYup,
        version_no: versionNoYup,
    })

    const formik=useFormik({
        initialValues:  {
            app_name: '',
            package_url: '',
            version_no: '',
        },
        validationSchema,
        onSubmit:(values)=> {
            if(fileRef.current.getFile())   {
                submitProject(values)
            }
        }
    })
    
    const submitProject=async (values: any)=> {
        try {
            const formData=new FormData()
            formData.append('title', values.app_name)
            formData.append('url', values.package_url)
            formData.append('version_no', values.version_no)
            formData.append('user_id',props.user._id)
            formData.append('file',fileRef.current.getFile())

            const {status, body}=await postprojectAPI(formData)

            if(status===201)    {
                props.setMessage({type: SUCCESS_MESSAGE, text: body.message})
                fileRef.current.clearFile()
                formik.resetForm()
            }   else    {
                props.setMessage({type: ERROR_MESSAGE, text: body.message})
            }

        }   catch(error)    {
            props.setMessage({type: ERROR_MESSAGE, text: 'Client side error'})
        }
    }

    return (
        <div className={`${styles.background} `}>
            
            <div className={`${styles.cardBackground}`}>
                <div className={styles.cardContent}>
                    <h3 className={`${styles.rightPanelHeading} mb-5`}>New Project</h3>      
                    <form>
                        <div className='mb-3'>
                            <FileInput ref={fileRef}    />
                        </div>
                        <div className='mb-3'>
                            <TextFieldPrimary name='app_name' type='text' error={formik.errors.app_name} value={formik.values.app_name} onChange={formik.handleChange} placeholder='App Name' label='App Name'   />    
                        </div>
                        <div className='mb-3'>
                            <TextFieldPrimary name='package_url' type='text' error={formik.errors.package_url} value={formik.values.package_url} onChange={formik.handleChange} placeholder='com.company.appname' label='Package URL'   />    
                        </div>
                        <div className='mb-4'>
                            <TextFieldPrimary name='version_no' type='text' error={formik.errors.version_no} value={formik.values.version_no} onChange={formik.handleChange} placeholder='1.0.4' label='Version No.'   />   
                        </div>
                       
                        <LongButton title='SUBMIT' onClick={formik.handleSubmit} />
                    </form>    
                </div>
            </div>
        </div>
    )
}
const mapStateToProps=({user}: any)=>  ({
    user: user.user
})
export default connect(mapStateToProps, {setMessage})(NewProject)
