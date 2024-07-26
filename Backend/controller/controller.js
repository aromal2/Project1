

const {
  getUserByEmail,
  comparePassword,
  generateToken,
  generateToken1,
  viewProfile,
  editStudent,
  insertUser
} = require("../helpers/helper");


exports.insertUsercontroller = async(req,res)=>{
try{
  console.log(req.body,"88888888888533333333333");
  const {fullname,email,mobileno,password}=req.body
   const response = await insertUser(fullname,email,mobileno,password);
   
  res.json(response)

}catch(error)
{
  console.log(error)
}
}

exports.loginController = async (req, res) => {
  try {

    console.log(req.body,"55555555");
    const { email, password } = req.body;

    const user = await getUserByEmail(email,password);

    console.log(user[0],"9888888888888888867");
    if (!user[0]) {
      return res.status(404).json({
        status: "failed",
        message: "User does not exist",
        user: {},
        token: "",
      });
    }

    const isPasswordValid = await comparePassword(password, user[0].password);
    console.log(isPasswordValid,"99999999");
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        message: "Password incorrect",
        user: {},
        token: "",
      });
    }

    const token = generateToken(user[0]);


    const refreshtoken = generateToken1(user[0]);
    user.password = "";
    console.log(token,"6666644444444");
    res.setHeader("Authorization", `Bearer ${token}`);
    
    res.json({
      status: "success",
      message: "Sign in Success",
      user,
      token,
      refreshtoken
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};



exports.viewProfileController = async (req, res) => {
  try {
    const viewStudents = await viewProfile();

    // Check if viewStudents is an array and has elements
    if (Array.isArray(viewStudents) && viewStudents.length > 0) {
      res.json(viewStudents)
    } else {
      console.log("No student records found.");
    }
  } catch (error) {
    console.error("Error fetching student profiles:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};




exports.editController = async (req, res) => {
  try {
    // Assuming studentId is passed in req.params.data
let {id,fullname,email,mobileno}=req.body
    console.log(req.body, "3333333");

     const editStudents = await editStudent(id,fullname, email,mobileno);
 console.log(editStudents,"diteeeeeeeeeeeeeeee");
     res.json(editStudents);
  } catch (error) {
    console.error("Error editing student:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
