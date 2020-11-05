import React from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { sendRequest } from '../../util/helpers/helper-methods';
import { pageOneValidation as validationSchema } from '../../util/validation/form-validation';
import { 
	Grid,
	Link,
	Typography,
	Box, 
	Button,
	useMediaQuery
} from '@material-ui/core'
import TextField from '../FormElements/TextFieldForm'; 
import Checkbox from '../FormElements/CheckboxForm';

const PageOne = ({ initialValues, handleFormChange }) => {

	const history = useHistory();
	const screenAtSmall = useMediaQuery("(max-width:600px)");
 
	const handleSubmit = (values, { setErrors }) => {
		sendRequest('/email' ,'POST', {email: values.Email})
			.then(data => {
				if (data.found) {
					setErrors({Email: '*Email address already in use'})
				} else {
					handleFormChange(values, 0, 'cv')
				}
			})
	}

	return(
		<React.Fragment>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{
					({ values }) => {

						return(
							<Form>
								<Grid container spacing={5}>
									<Grid item xs={12}>
										<Typography
											className="header"
											variant="h6"
											style={{ marginBottom: "1rem" }}
											align="center"
											color='textSecondary'
										>
											Submit your application to our talent pool and find jobs matching to your profile
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Box width='100%' display='flex' justifyContent='center'>
											<Box width={screenAtSmall ? '100%' :'60%'} display='flex' justifyContent='center'>
												<Grid container spacing={3}>
													<Grid item xs={12}>
														<TextField 
															name='Email'
															label='Email'
														/>
													</Grid>
													<Grid item xs={12} md={6}>
														<TextField 
															name='First Name'
															label='First Name'
														/>
													</Grid>
													<Grid item xs={12} md={6}>
														<TextField 
															name="Last Name"
															label="Last Name"
														/>
													</Grid>
													<Grid item xs={12}>
														<Checkbox 
															name='TermsAndPrivacy'
															label={
																<React.Fragment>
																	By submitting the application I confirm I have read
																	and agreed to the{" "}
																	<Link
																		href="https://moyyn.com/terms-and-conditions-2/"
																		rel="noopener"
																		target="_blank"
																		style={{ cursor: "pointer" }}
																	>
																		Terms of Use
																	</Link>{" "}
																		and{" "}
																	<Link
																		href="https://moyyn.com/privacy/"
																		rel="noopener"
																		target="_blank"
																		style={{ cursor: "pointer" }}
																	>
																		Privacy Policy
																	</Link>
																	.{" "}
																</React.Fragment>
															}
														/>
													</Grid>
												</Grid>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={12}>
										<Box display='flex' justifyContent='center'>
											<Button type='submit' className='moyynButton--main'>
												Next
											</Button>
										</Box>
									</Grid>
									<Grid item xs={12}>
										<Typography variant='subtitle2' color='textSecondary' align="center">
											Already submitted an application? Check application status{" "}
											<Link
												onClick={() => history.push('/candidate')}
												style={{ cursor: "pointer" }}
											>
												{" "}
												here
											</Link>
										</Typography>
									</Grid>
								</Grid>
							</Form>
						)
					}
				}
			</Formik>
		</React.Fragment>
	)
}

export default PageOne;