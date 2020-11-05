import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { pageFiveValidation as validationSchema } from '../../util/validation/form-validation';
import { careerLevelOptions, industries } from '../../util/data/static-data'; 
import { Grid, Typography, Divider } from '@material-ui/core'
import SelectMenu from '../FormElements/SelectMenuForm';
import WorkExperience from '../FormElements/WorkExperience';
import Languages from '../FormElements/Languages';
import AutocompleteChips from '../FormElements/AutocompleteChipsForm';
import Buttons from '../FormElements/Buttons';
import Skills from '../FormElements/Skills';
import MissingParts from '../FormElements/MissingParts';

const PageFive = ({ initialValues, handleFormChange, formComplete }) => {

	const [alert, setAlert] = useState([]);

	const handleSubmit = (values) => {
		const [isComplete, missingParts] = formComplete();

		if (isComplete) {
			handleFormChange(values, 4, false, true, true);
		} else {
			setAlert(missingParts);
		}
		//handleFormChange(values, 4, false, true, true);
	}

	const onKeyDown = (keyEvent) => {
		if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
			keyEvent.preventDefault();
		}
	}

	return(
		<React.Fragment>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
					{
						({ values }) => {
							
							return(
								<Form onKeyDown={onKeyDown}>
									<Grid container spacing={5}>
										<Grid item xs={12}>
											<Typography
												className="header"
												variant="h6"
												style={{ marginBottom: "1rem" }}
												align="center"
												color='textSecondary'
											>
												Career and skills
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<SelectMenu
												name='Career Level'
												label='Career level'
												options={careerLevelOptions}
											/>
										</Grid>
										<Grid item xs={12}>
											<Divider />
										</Grid>
										<Grid item xs={12}>
											<AutocompleteChips 
												name='Industries'
												label='Industries'
												options={industries}
											/>
										</Grid>
										<Grid item xs={12}>
											<Divider />
										</Grid>
										<Grid item xs={12}>
											<Skills />
										</Grid>
										<Grid item xs={12}>
											<Divider />
										</Grid>
										<Grid item xs={12}>
											<WorkExperience />
										</Grid>
										<Grid item xs={12}>
											<Languages />
										</Grid>
										<Grid item xs={12}>
											<MissingParts alert={alert}/>
										</Grid>
										<Grid item xs={12}>
											<Buttons back={() => handleFormChange(values, 4, 'preferences', false)} submit />
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

export default PageFive;