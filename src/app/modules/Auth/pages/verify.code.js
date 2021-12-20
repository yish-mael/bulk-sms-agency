import React, { useState } from "react";
import { useFormik } from "formik";
import { connect,useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { verifyCode } from "../_redux/authCrud";
import countryCodes from "../../ECommerce/_redux/utils/countryCodes";
import { values } from "lodash-es";
const initialValues = {
  code: "",

};

function ForgotPassword(props) {
  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  const history = useHistory();
  const {token} = useSelector((store)=>({
      token: store.auth.ressetToken
  }))
  const ForgotPasswordSchema = Yup.object().shape({
    code: Yup.string()
      .min(4)
      .required("Enter code sent to your phone number"),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      verifyCode(
        values.code.toString(),
        token
      )
        .then((response) => {
          setIsRequested(true);
          history.push(`/auth/reset-password/${response.data.payload.token}`);
        })
        .catch((e) => {
          console.log(e.response);
          setIsRequested(false);
          setSubmitting(false);
          setStatus(e.response ? e.response.data.message : e.message);
        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Forgotten Password ?</h3>
            <div className="text-muted font-weight-bold">
              Enter verification code sent to your phone number
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}

                <div className="form-group fv-plugins-icon-container">
                  <input
                    type="number"
                    placeholder="Enter verification code"
                    className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                      "code"
                    )}`}
                    name="code"
                    {...formik.getFieldProps("code")}
                  />
                  {formik.touched.code && formik.errors.code ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.code}
                      </div>
                    </div>
                  ) : null}
                </div>
              
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
