import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {logout} from "../actions/authActions";
import { connect } from 'react-redux';
import {SidebarData} from "./SideBarData";
import PropTypes from "prop-types";
import SubMenu from "./SubMenu";
import styled from 'styled-components';
import '../css/Navbar.css';

const Nav = styled.div`
background: #511281;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #511281;
text-decoration:none;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

class NavBar extends Component {
    state = {
      sidebar:false
    }
    showSideBar = () => {
      const currentState =this.state.sidebar;
      this.setState({sidebar:!currentState});
    }
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error : PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };
    render(){
        
        
        return(
          <div>
              <nav className='navbar'>
                    <div className="box1">
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={this.showSideBar} className="bar"/>
                        </Link>
                    </div>




                    <div className="box2">
                        <img src="Logo-v4.png"  alt=""/> 
                    </div>
                    
                    
                    <div className="box4">
                        <IoIcons.IoMdNotifications className="icon-nav"/>
                    </div>
                    
                    
                    <div className="box5">
                        <Link to="/Profile" >
                            <FaIcons.FaUserCircle className="icon-nav"/>
                        </Link>
                    </div>
                    

                    <div className="box7">
                        <Button className="Logout" onClick={this.props.logout}>
                          Logout
                        </Button> 
                    </div>
              </nav>     
                 
              
              <SidebarNav sidebar={this.state.sidebar}>
                  <SidebarWrap>
                    <NavIcon to="#">
                    <AiIcons.AiOutlineClose onClick={this.showSideBar} className="x" />
                    </NavIcon>
                    {SidebarData.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                    })}
                  </SidebarWrap>
              </SidebarNav>
                  
      
        </div>
        )

    }

    
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  error : state.error
});


export default connect(
  mapStateToProps,
  {logout}
)(NavBar);

