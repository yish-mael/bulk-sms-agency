import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect,useHistory } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { requestPhoneNumberValidationPin } from "../_redux/authCrud";
import countryCodes from '../../ECommerce/_redux/utils/countryCodes'
import { values } from "lodash-es";
const initialValues = {
  phoneNumber: "",
  countryCode: ''
};

function ForgotPassword(props) {
  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  const history = useHistory();
  const ForgotPasswordSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    countryCode: Yup.string().length(2).required("Please select country code")
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
      requestPhoneNumberValidationPin(values.phoneNumber.toString(),values.countryCode)
        .then((response) => {
            setIsRequested(true);
            props.setRessetToken(response.data.payload.token);
            history.push('/auth/verify-code')
        })
        .catch((e) => {
          console.log(e.response)
          setIsRequested(false);
          setSubmitting(false);
          setStatus(
           e.response? e.response.data.message: e.message
          );
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
              Enter your Phone number to reset your password
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
          
            <div className="row">
                 <div className="col-md-8 col-sm-12">
                     <div className="form-group fv-plugins-icon-container">
                            <input
                                type="number"
                                placeholder="Enter phone number"
                                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                "phoneNumber"
                                )}`}
                                name="phoneNumber"
                                {...formik.getFieldProps("phoneNumber")}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.phoneNumber}</div>
                        </div>
                    ) : null}
                    </div>
                    
                 </div>
                 <div className="col-md-4 col-sm-12">
                          <div className="form-group fv-plugins-icon-container">
                            <select
                                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                "countryCode"
                                )}`}
                                name="countryCode"
                                {...formik.getFieldProps("countryCode")}
                            >
                               {
                                countryCodes.map((v)=>
                                  <option value={v}>
                                      {v}
                                  </option>
                                )
                               }
                            </select>
                            {formik.touched.countryCode && formik.errors.countryCode ? (
                                <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.countryCode}</div>
                                </div>
                            ) : null}
                         </div>
                    </div>
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
