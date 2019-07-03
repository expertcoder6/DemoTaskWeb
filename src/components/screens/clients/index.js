import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ClientDetails from '../clientDetails/index'
import axios from 'axios'

export default class Clients extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedClient: [],
      clientList: [],
      clientListSidebar: [],
    }
    this.setSelectedClient = this.setSelectedClient.bind(this);
    this.searchClients = this.searchClients.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  doSearch = (list, value) =>{
    const result = list.filter(item =>{
      var search_inside = item.name +" "+item.jobTitle +" "+item.organization +" "+item.city +" "+item.email +" "+item.phone
      var isExist = search_inside.toLocaleLowerCase().indexOf(value)
      if(isExist >= 0){
        return item
      }
    });
    this.setState({clientListSidebar: result})
  }

  searchClients(e){
    let search_key = e.target.value
    if(search_key!=""){
      this.doSearch(this.state.clientList , search_key.toLocaleLowerCase())
    }else{
      this.setState({clientListSidebar: this.state.clientList})
    }
  }

  setSelectedClient(item){
    let selectedClient = []
    selectedClient.push(item);
    this.setState({selectedClient});
  }

  //function which is called the first time the component loads
  componentWillMount() {
    this.getClientData();
  }

  //Function to get the Client Data from json
  getClientData() {
    axios.get('assets/clientsjson/clients.json').then(response => {
      let selectedClient = []
      selectedClient = response.data.filter((item, index)=>{
        if(index==0)
          return item
      });
      this.setState({
        clientList: response.data,
        clientListSidebar: response.data,
        selectedClient: selectedClient,
      })
    })
  };

  render() {
    if (this.state.clientList.length<1)
      return (<p>Loading data</p>)
    else
    return (<div className="addmargin">
      <div className="container mt-50">
        <div className="row">
        <div className="col-md-3 col-md-ofset-1 col-sm-3 col-sm-offset-1">
          <div className="side-user-list">
            <div className="input-group">
              <input type="text"
                     id="filter"
                     className="form-control"
                     placeholder="Search"
                     style={{textAlign: 'center',height: 40,borderWidth: 1,borderColor: '#009688',borderRadius: 7,backgroundColor : "#FFFFFF"}}
                     onChange={this.searchClients}
              />
              <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
            </div>

          {
            this.state.clientListSidebar.length>0 ? this.state.clientListSidebar.map(client => <Panel bsStyle="info" key={client.name} className="centeralign">
              <a onClick={() => this.setSelectedClient(client)}>
              <Panel.Body>
                <div className="user-img">
                  <img src={client.avatar} />
                </div>
                <div className="user-details">
                  <h3>{client.name}</h3>
                  <p>{client.jobTitle}</p>
                </div>
              </Panel.Body>
              </a>
            </Panel>)
            :
            <div>No data found</div>
          }
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="right-user-details">
            <ClientDetails selectedClient={this.state.selectedClient}/>
          </div>
        </div>
        </div>
      </div>
    </div>)
  }

}
