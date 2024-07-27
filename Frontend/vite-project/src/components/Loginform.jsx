import { useFormik } from "formik";
import { useNavigate,Link } from "react-router-dom";
import * as Yup from "yup";
import styles from "./Loginform.module.css"; // Import the CSS module
import { login } from "../api/apiconnection";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slice";

export function Loginform() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Required"),
      password: Yup.string()
        .max(20, "Must be less than 20 characters")
        .min(8, "must be at least 8 characters")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      const response = await login(values);
      if (response.status == "success" && response.token) {
         dispatch(setToken(response.token));
        navigate("/home");
      } else {
        alert("Make sure is it correct");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.title}>
            <p className={styles.titleText}>Login</p>
          </p>
          <div className={styles.body}>
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
          </div>

          <div className={styles.footer}>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
          <div className={styles.create}>
            <Link to="/" >
            <p>Create an Account</p>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
