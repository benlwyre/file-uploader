import axios from 'axios';

import React,{Component} from 'react';

const auth = `Bearer ${process.env.REACT_APP_SECRET_KEY}`;
const accountId = `${process.env.REACT_APP_ACCOUNT_ID}`;

class App extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = async () => {
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);

  const documentUrl = `https://api.testwyre.com/v3/accounts/${accountId}/individualGovernmentId?masqueradeAs=${accountId}&documentType=PASSPORT`;

  console.log(documentUrl);
	
	const docUpload = await axios.post(documentUrl, 
    this.state.selectedFile, 
    {headers:{
      'Content-Type': 'application/pdf',
      'Authorization': auth}  
    })
  console.log(docUpload);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			
<p>File Name: {this.state.selectedFile.name}</p>

			
<p>File Type: {this.state.selectedFile.type}</p>

			
<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div>
			<h1>
			Wyre Document Upload Demo
			</h1>
			<h3>
			File Upload using React
			</h3>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		{this.fileData()}
		</div>
	);
	}
}

export default App;
