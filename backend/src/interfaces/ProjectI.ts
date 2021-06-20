interface VersionI    {
    version_no: String    
    created: Date
}
interface ProjectI  {
    _id: String
    title: String   
    user_id: String
    url: String
    versions: Array<VersionI>
}

export { VersionI, ProjectI }