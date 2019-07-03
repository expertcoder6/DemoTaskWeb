import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import { SearchBox } from 'react-instantsearch-dom';
import axios from 'axios'

//This Component is a child Component of Clients Component
export default class ClientDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedClient: [],
    }

  }
  componentWillMount(){
    this.setState({selectedClient: this.props.selectedClient})
  }

  componentDidUpdate(){
    this.setState({selectedClient: this.props.selectedClient})
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedClient !== prevProps.selectedClient) {
      this.setState({selectedClient: this.props.selectedClient});
    }
  }

  render() {
    if (!this.state.selectedClient)
      return (<p>Loading Data</p>)
    return (<div className="clientdetails">
      {
        this.state.selectedClient.length>0 && this.state.selectedClient.map((item)=>{
          return(

            <Panel bsStyle="info" className="centeralign">
              <Panel.Heading>
                <Panel.Title componentClass="h3"><img src={item.avatar} style={{height: 128, width: 128}}/></Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <div className="form-group">
                  <label>Name : </label>
                  <h4>{item.name}</h4>
                </div>
                <div className="form-group">
                  <label>Job Title : </label>
                  <h4>{item.jobTitle}</h4>
                </div>
                <div className="form-group">
                  <label>Email : </label>
                  <h4>{item.email}</h4>
                </div>
                <div className="form-group">
                  <label>Phone : </label>
                  <h4>{item.phone}</h4>
                </div>
                <div className="form-group">
                  <label>City : </label>
                  <h4>{item.city}</h4>
                </div>
                <div className="form-group">
                  <label>Organization : </label>
                  <h4>{item.organization}</h4>
                </div>
              </Panel.Body>
            </Panel>
          )
        })
      }
    </div>)
  }
}
