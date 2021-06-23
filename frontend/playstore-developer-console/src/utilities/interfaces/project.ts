interface LatestVersionI   {
    _id: string
    version_no: string
    created: string
}
interface ProjectI  {
    _id: string
    title: string
    url: string 
    user_id: string
}
interface ProjectTableI extends ProjectI    {
    total_versions: Number
    latest_version: LatestVersionI
}

interface ProjectSingleI extends ProjectI    {
    versions: Array<LatestVersionI>
}

export type {ProjectTableI,ProjectSingleI,LatestVersionI}