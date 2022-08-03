
export const fileUpload = async (file) => {

    if ( !file ) throw new Error('No tenemos ningún archivo para subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwrwogzyb/upload';
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append( 'file', file );

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } );

        if ( !resp.ok ) throw new Error('No se pudo subir la imagen')  // el ( !resp.ok ) quiere decir que si no está ok se lanza el new Error

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error)
        throw new Error( error.message )
    }



}