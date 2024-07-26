import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "./Signup.module.css"; // Import the CSS module
import { signup } from "../api/apiconnection";

export function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      mobileno: "",
      password: "",
      confirmPassword: "", // Add confirmPassword to initialValues
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Required"), // Corrected key
      email: Yup.string().email("Invalid Email Address").required("Required"),
      mobileno: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be less than 20 characters")
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values, "99999999999");
        const response = await signup(values);
        if (response.data) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Signup error:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.container}>
      <div className={styles.card}>
        <p className={styles.title}>
          <span className={styles.titleText}>Create an Account</span>
        </p>
        <div className={styles.body}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            className={styles.input}
            {...formik.getFieldProps("fullname")}
          />
          <p className={styles.errorText}>
            {formik.touched.fullname && formik.errors.fullname
              ? formik.errors.fullname
              : null}
          </p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={styles.input}
            {...formik.getFieldProps("email")}
          />
          <p className={styles.errorText}>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null}
          </p>
          <input
            type="text"
            placeholder="Mobile No"
            name="mobileno"
            className={styles.input}
            {...formik.getFieldProps("mobileno")}
          />
          <p className={styles.errorText}>
            {formik.touched.mobileno && formik.errors.mobileno
              ? formik.errors.mobileno
              : null}
          </p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={styles.input}
            {...formik.getFieldProps("password")}
          />
          <p className={styles.errorText}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null}
          </p>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className={styles.input}
            {...formik.getFieldProps("confirmPassword")}
          />
          <p className={styles.errorText}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </p>
        </div>

        <div className={styles.footer}>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </div>
        <div className={styles.create}>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </form>
  );
}
