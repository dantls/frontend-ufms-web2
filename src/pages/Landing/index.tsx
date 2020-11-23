import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing3.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import './styles.css';

const Landing: React.FC = () => {
  const [totalConnections , setTotalConnections] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get('/connections');
      const {total} = response.data;
      setTotalConnections(total);
    }
    loadData();
  },[]);

  return (
      <div id="page-landing">
          <div id="page-landing-content" className="container">
            <div className="logo-container">
              <img src={logoImg} alt="Proffy"/>
              <h2>Sua plataforma de treinos online.</h2>
            </div>

            <img
              className="hero-image"
              src={landingImg}
              alt="Plataforma de estudos"
            />

            <div className="buttons-container">
              <Link to="study" className="study">
                <img src={studyIcon} alt="Praticar"/>
                Praticar
              </Link>
              <Link to="give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar aulas"/>
                Dar aulas
              </Link>
            </div>

            <span className="total-connections">
              Total de {totalConnections} conexões já realizadas.
              <img src={purpleHeartIcon} alt="Coração Roxo"/>
            </span>
        </div>
    </div>

  )
}

export default Landing;
