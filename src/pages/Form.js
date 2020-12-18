import React, { useState, useEffect } from 'react';
import { sendRequest, checkFormComplete } from '../util/helpers/helper-methods';
import { url } from '../util/data/base-url';
import { 
	Switch, 
	Route, 
	Redirect, 
	useRouteMatch, 
	useHistory
} from 'react-router-dom';
import { initialValues } from '../util/data/initial-values';
import PageOne from '../components/FormPages/PageOne';
import PageTwo from '../components/FormPages/PageTwo';
import PageThree from '../components/FormPages/PageThree';
import PageFour from '../components/FormPages/PageFour';
import PageFive from '../components/FormPages/PageFive';
import ErrorPage from '../components/Shared/ErrorPage';
import Loading from '../components/Shared/Loading';

const Form = ({ setEmail ,setSuggestions }) => {

	const [formValues, setFormValues] = useState(initialValues)
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const { path } = useRouteMatch();
	const history = useHistory();

	const [submitTrigger, setSubmitTrigger] = useState(false);

	useEffect(() => {
		//console.log('checking connection')
		sendRequest()
			.then(data => {
				//console.log(data)
				if (!data.found) {setError(true)}
			})
			.catch(err => setError(true)) //setError(true))
	},[])

	const moveToPage = (page) => {
		history.push(`/application/${page}`);
	}

	const handleFormChange = (values, part, next = false, complete = true, submit = false) => {
		if (complete) {
			setFormValues(prevState => {
				let newState = [...prevState];
				newState[part] = {...values, Complete: true};
				
				return newState;
			});	
		} else {
			setFormValues(prevState => {
				let newState = [...prevState];
				newState[part] = {...values};
				
				return newState;
			});	
		}

		if(!!next) {
			moveToPage(next)
		}

		if (submit) {
			setSubmitTrigger(true);
		}
	}

	const submitForm = () => {
		

		let form = [...formValues];

		const fileName = `${form[0].Email}.pdf`;

		const file_deName = `${form[0].Email}(GER).pdf`;

	
		const file = form[1].CV[0].file;
		let tempfile_de;
		try {tempfile_de = form[1].CV2[0].file;} catch{tempfile_de=""}
		const  file_de=tempfile_de;

		form.splice(1,1)

		
		
		form[2]["Desired Position"]=formValues[1]["Desired Position"];

		console.clear();

		let formData = new FormData();
		formData.append('payload', JSON.stringify(form));
		formData.append('file', file, fileName);
		try {formData.append('file_de', file_de, file_deName);} catch{console.log("German CV not uploaded")}

		//set timeout
		const timeout = setTimeout(() => {
			history.push('/candidate/partner');
		}, 1000 * 120)

		
		fetch(`${url}/store`, {method: 'POST',body: formData})
			.then(res => res.json())
			.then(data => {
				clearTimeout(timeout);
				//console.log('store returns:', data);
				setEmail(form[0].Email);
				setSuggestions(data.suggestions);
				history.push('/candidate/suggestions');
			})
			.catch(err => {
				clearTimeout(timeout);
				//console.log('store error:', err);
				setIsLoading(false);
				setError(true);
			})
	}

	useEffect(() => {
		window.scrollTo({
	   	top: 0,
	   	behavior: "auto"
	 	});
	})

	useEffect(() => {
		const [isComplete] = checkFormComplete(formValues)

		if (isComplete) {
			if (submitTrigger) {
				setIsLoading(true);
				submitForm()
			}
		}
	// eslint-disable-next-line
	}, [submitTrigger])

	const formComplete = () => {
		const [isComplete, missingParts] = checkFormComplete(formValues)
		return [isComplete, missingParts];
	}

	const handleError = () => {
		setFormValues(initialValues);
		history.push('/application');
		setError(false);
	}

	if (error) {
		return(
			<React.Fragment>
				<ErrorPage setError={handleError} />
			</React.Fragment>
		)
	}

	if (isLoading) {
		return(
			<React.Fragment>
				<Loading text='AI matchmaking in progress...' />
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			<Switch>
				<Route path={`${path}`} exact>
					<PageOne 
						initialValues={formValues[0]}
						handleFormChange={handleFormChange} 
					/>
				</Route>
				<Route path={`${path}/cv`} >
					<PageTwo 
						initialValues={formValues[1]}
						handleFormChange={handleFormChange} 
					/>
				</Route>
				<Route path={`${path}/information`} >
					<PageThree
						initialValues={formValues[2]}
						handleFormChange={handleFormChange} 
					/>
				</Route>
				<Route path={`${path}/preferences`} >
					<PageFour 
					 	initialValues={formValues[3]}
					 	handleFormChange={handleFormChange} 
					/>
				</Route>
				<Route path={`${path}/career`} >
					<PageFive 
						initialValues={formValues[4]}
						handleFormChange={handleFormChange}
						formComplete={formComplete}
					/>
				</Route>

				<Redirect to={`${path}`} />
			</Switch>
		</React.Fragment>
	)
}

export default Form;