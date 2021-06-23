const downloadFile=async (blobFile: any)=>  {
    const href=URL.createObjectURL(blobFile)
    const link=document.createElement('a')
    link.href=href
    link.setAttribute('download','app.apk')
    document.body.appendChild(link)
    link.click()
}

export {
    downloadFile
}