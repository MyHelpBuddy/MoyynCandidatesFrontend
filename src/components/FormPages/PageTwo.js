import React from 'react';
import { Formik, Form } from 'formik';
import { pageTwoValidation as validationSchema } from '../../util/validation/form-validation';
import { Grid, Typography } from '@material-ui/core';
import ResumeUpload from '../FormElements/ResumeUpload';
import Buttons from '../FormElements/Buttons';
import { AvailableJobs } from '../../util/data/AvailableJobs'; 
import AutocompleteChips from '../FormElements/AutocompleteChipsForm';


const PageTwo = ({ initialValues, handleFormChange }) => {

	const handleSubmit = (values) => {
		handleFormChange(values, 1, 'information')
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

						//console.log(values)
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
											Upload CV
										</Typography>
									</Grid>
									<Grid item xs={1} md={2}>
									</Grid>
									<Grid item xs={12} md={8}>
										<ResumeUpload />
									</Grid>
									<Grid item xs={12}   >
									<Typography
											className="header"
											variant="h6"
											style={{ marginBottom: "1rem" }}
											align="center"
											color='textSecondary'
										>
											Positions applying for (If Any)
											</Typography>
{/* 										<TextField
											name="Desired Position"
											label="Please paste the exact job title of all positions that you are applying for"
											placeholder="Please paste the exact job titles of all positions that you are applying for"
														
										/> */}
																							<Grid item xs={12}>
														<AutocompleteChips
															name="Desired Position"
															label="Desired Positions"
															options={AvailableJobs}
														/>
													</Grid>

									</Grid>
									<Grid item xs={12}>

										<Buttons back={() => handleFormChange(values, 1, true, false)} />
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

export default PageTwo;