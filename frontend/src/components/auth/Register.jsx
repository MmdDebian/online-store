import { ErrorMessage, Field, Form, Formik } from 'formik' ;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';
import { getUser } from '../../services/users.service';

function Register() {

    const [error , setError] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        getUser()
        .then((response)=>{
            navigate('/')
        })
    },[])

    return ( 
        <div>
            <Formik
                initialValues={{name : '' , email : '' , password : ''}}
                validate={value=>{
                    const errors = {};
                    if(!value.name){
                        errors.name = 'name is required'
                    }
                    if(value.email === ''){
                        errors.email = 'Email is required'
                    }
                    const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)
                    if(!isValidEmail){
                        errors.email = 'Invalid email address'
                    }
                    if(value.password.length < 5){
                        errors.password = 'password is not scure'
                    }

                    return errors ;
                }}
                onSubmit={(values , {setSubmitting})=>{
                    register(values.name , values.email , values.password)
                    .then((response)=>{
                        localStorage.setItem('token' , response.data.token);
                        window.location.reload()
                        navigate('/')
                        setSubmitting(false);
                    })
                    .catch(({response})=>{
                        setError(
                            response.data.message || 
                            'intranl server error')
                        setSubmitting(false)
                    })
                }}
            >
            {({isSubmitting})=>(
               <>
                <section className="vh-100">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                    <Form className="mx-1 mx-md-4">

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fa fa-user fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                        <label className="form-label" htmlFor="name">Your Name</label>
                                        <Field type="text" name="name" id="name" className="form-control" />
                                        <ErrorMessage name="name" className='text-danger' component='div' />                                        
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                        <label className="form-label" htmlFor="email">Your Email</label>
                                        <Field type="text" name="email" id="email" className="form-control" />
                                        <ErrorMessage name="email" className='text-danger' component='div' />                                       
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <Field type="text" name="password" id="password" className="form-control" />
                                        <ErrorMessage name="password" className='text-danger' component='div' />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg">Register</button>
                                    </div>

                                    </Form>
                                    {error && (
                                            <p className='alert alert-danger'>{error}</p>
                                        )
                                    }
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                    className="img-fluid" alt="Sample image" />
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
               </>
            )}
            </Formik>
        </div>
     );
}

export default Register;