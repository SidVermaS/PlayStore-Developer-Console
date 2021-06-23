import {useState, } from 'react'
import {connect} from 'react-redux'
import {TextField,InputAdornment} from '@material-ui/core'
import {Search as SearchIcon} from '@material-ui/icons'
import {Autocomplete} from '@material-ui/lab'
import {getprojectsearchAPI} from '../../../networks/apis/projectAPI'
import styles from './index.module.scss'
const SearchAutocomplete = (props: any) => {
    const [projects, setProjects]=useState<any>([])
    const [selectedProject,setSelectedProject]=useState<any>(null)

    const handleChange=async (value: any)=> {
        try {
            setProjects([])
            setSelectedProject(null)
            const {status, body}=await getprojectsearchAPI(`search_text=${value}&user_id=${props.user._id}`)
            if(status===200)    {
                setProjects(body.projects)
                console.log('~~~ projects: ',projects)
            }
        }   catch(error)    {

        }
    }
    return (
        <div className={styles.background}>
            <Autocomplete onChange={(e,value)=>{
                setSelectedProject(value)
                setProjects([])
            }} autoComplete includeInputInList  options={projects} getOptionLabel={(option: any)=>option.title} renderInput={(params)=><TextField value={selectedProject} onChange={(e) => {
            if(e.target.value==='') {
                setProjects([])
                setSelectedProject(null)
            }   else    {
                handleChange(e.target.value)
            }
            }} variant='outlined'  {...params}  InputProps={{...params.InputProps, startAdornment:(<InputAdornment position="start">
        <div className={styles.searchIcon}>
            <SearchIcon/>
        </div>
      </InputAdornment>),endAdornment: null}}
         placeholder='Search projects ....' className={styles.search_text_field} />}   />
        </div>
    )
}
const mapStateToProps=({user}:any)=>({
    user: user.user
})
export default connect(mapStateToProps, {})(SearchAutocomplete)
