const jwt = require("jsonwebtoken");
module.exports = async(req, res, next) => {
  try {

    if(!req.headers.authorization){
        return res.status(400).json({message:"You are not authorized to access this route",success:false})
    }

        const token = req.headers.authorization.split(" ")[1];
    
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decryptedToken._id;
  
   

      next();

  } catch (error) {
    console.log(error)
    res.status(401).json({ message: error.message, success: false });
  }
};