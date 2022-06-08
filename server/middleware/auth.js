import jwt from "jsonwebtoken"

const secret = "bigsecret"

const auth = async (req, res, next )=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500  // This is our own token, not created by Google
        let decodedData

        if (token && isCustomAuth){
            decodedData = jwt.verify(token, secret)
            req.userId = decodedData?.Id
            
        } else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub

        }

        next()

    } catch(error){
        console.log(error)
    }
}
export default auth