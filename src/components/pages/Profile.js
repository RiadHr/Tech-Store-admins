import React from 'react';
import {FaUserCircle} from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../../css/Profile.css";

function Profile(){
    return(
        <div className="delivry__container">
            <div className="delivry__header" >
                        <h1>Public Profil</h1>
            </div>
            <form>
                    <div className="profil__picbox1">
                        <div className="profil__pic">
                            <FaUserCircle className="add__profilpic"/>
                        </div>
                    
                    </div>

                    <div className="delivry__labelbox1">
                        <label className="l1">
                            first name
                        </label>
                    </div>
                    <div className="delivry__inputbox1">
                            <input type="text"/>
                    </div>


                    <div className="delivry__labelbox1">
                        <label className="l1">
                            Second name
                        </label>
                    </div>
                    <div className="delivry__inputbox1">
                            <input type="text"/>
                    </div>
                    

                    <div className="delivry__labelbox1">
                            <label>password</label>   
                    </div> 
                    <div className="delivry__inputbox1">
                            <input type="password" placeholder="password"/>
                    </div>
                    

                    <div className="delivry__labelbox1">
                        <label className="l1">
                            Confirme Password
                        </label>
                    </div>
                    <div className="delivry__inputbox1">
                            <input type="password"/>
                    </div>


                    <div className="delivry__labelbox1">
                        <label className="l1">
                            Email
                        </label>
                    </div>
                    <div className="delivry__inputbox1">
                            <input type="email"/>
                    </div>

                    <div className="delivry__labelbox1">
                        <label >
                            Telephone-number
                        </label>
                    </div>
                    <div className="delivry__inputbox1">
                            <input type="text"/>
                    </div>



                    


                    <div className="delivry__Linkbox1">
                            <Link to="/tran" className="delivry__Link" >continue</Link>
                    </div>
                    


            </form>
        </div>
    );
}

export default Profile;