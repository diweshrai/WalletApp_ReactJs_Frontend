import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

import Card from 'react-bootstrap/Card';
import './reg.css';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminHomePage = () => {

  const [loading , setLoading] = useState(false);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(true);
    }, 2000); 
  }, []);  


    const cardStyle = {
        width: '20rem',
        margin: '5%', 
        transition: 'transform 0.3s',
       
      };
      
      const cards = [
        { title: 'All Customer ', text: 'Get Your All Customer Details.' ,   goto:'help' ,  btn:'Check Customers' ,     img:require('../img/all.png')  },
        // { title: 'Upload Bulk Customers', text: 'Upload Bulk Customers' ,    goto:'bulkCustomerUpload',    btn:'Upload Bulk Customer' ,     img:require('../img/deposite.jpg')},
        // { title: 'Deposite Money', text: 'Deposite Money to Your Acc.' , goto:'deposite', btn:'Deposite' , img:require('../img/deposite.jpg')},
        // { title: 'Fund Transfer', text: 'Transfer funds to any Acc.' , goto:'fundTransfer',   btn:'Fund Transfer',  img:require('../img/money.jpg')},
        // { title: 'Statement', text: 'Get Your Statements' ,            goto:'statement',     btn:'Statement',                          img:require('../img/statement.png')},
        // { title: 'Widhraw Money', text: 'Widhraw Money' ,              goto:'widhraw',   btn:'Widhraw' ,       img:require('../img/widraw.png')},
        // { title: 'Upload Documets', text: 'Add Your Documents Here' ,    goto:'uploadDoc',   btn:'Upload' ,       img:require('../img/doc.png')},
        // { title: 'Show Documets', text: 'Check Your Documents' ,    goto:'showDoc',   btn:'Show Doc' ,       img:require('../img/doc.png')},
      
      ];
  
  
    return (
    <div>
     
      <div>
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>


{loading ?(
<div><AdminNavbar/>

<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:"center" }}>
      {cards.map((card, index) => (
        <Card key={index} style={cardStyle}>
          <Card.Img variant="top" src={`${card.img}`} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <NavLink to={`/${card.goto}`} className="btn btn-primary">{card.btn}</NavLink>
          </Card.Body>
        </Card>
      ))}
    </div>
</div>

) : (
  
  <div className="loading"  style={{
    display:'flex',
    justifyContent:'center',
    alignContent:'center'
  }}>
    <img src={require('../img/wg.gif')} alt="Loading..."  style={{width:'30%'}}/>
  </div>
)}


      </div>


    </div>
  )
}

export default AdminHomePage
