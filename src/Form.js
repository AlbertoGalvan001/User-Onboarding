import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, touched, errors, status }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        status && setUsers(users => [...users, status])
    }, [status])
    return (
        <div className="user-form">
            <h1>User Form</h1>
            <Form>
                <Field type="text"
                    name="name"
                    placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <br />
                <Field type="text"
                    name="email"
                    placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <br />
                <Field type="text"
                    name="password"
                    placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <br />
                <label className="checkbox-container">
                    {" "}
                    Terms Of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>
                <br />

                <button type="submit">Submit</button>
            </Form>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required().min(2),
        email: Yup.string().required(),
        password: Yup.string().required().min(4),
    }),
    handleSubmit(values, { setStatus }) {
        axios.post(' https://reqres.in/api/users/', values)
            .then(res => { setStatus(res.data); })
            .catch(err => console.log(err.response));
    }
})(UserForm);


export default FormikUserForm;
