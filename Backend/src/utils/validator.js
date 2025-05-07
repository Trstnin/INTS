import {body} from "express-validator"

//can be reused by many routes:

export const validate = (validations) =>{
    return async (req,res,next) => {
        //sequential processing , stops running validations chain if one fails.
        for(const validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                return res.status(400).json({errors: result.array()});
            }
        }
        next();
    };
};


export const registerValidator = [
    body('FirstName')
     .notEmpty()
     .withMessage("FirstName is Required")
     .isLength({min: 3})
     .withMessage("FirstName should be atleast of 3 character"),

     body("LastName")
     .notEmpty()
     .withMessage("LastName is required"),

     body("Email")
     .isEmail()
     .withMessage("Email should be in proper format")
     .notEmpty()
     .withMessage("Email is required")
     .isLength({min: 5})
     .withMessage("Email should atleast have 5 charcter"),

     body("Password")
     .notEmpty()
     .withMessage("Password is Required")
     .isLength({min: 8})
     .withMessage("Password should be atleast of 8 character")

]

export const loginValidator = [
    body('Email')
    .isEmail()
    .withMessage("Email should be in proper format")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({min:5})
    .withMessage("Email should atleast have 5 character"),

    body("Password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:8})
    .withMessage("Password should be atleast of 8 character")
]
