import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';

interface User{
    id: string;
    avatar:string;
    bio:string;
    name: string;
    whatsapp: string;
}
export interface Classes{
    id: string;
    user: User;
    subject: string;
    cost: number;
}
interface TeacherItemProps{
  classes:Classes;
}


const TeacherItem: React.FC<TeacherItemProps> = ({classes}) => {


  const {id, avatar,name,bio,whatsapp} =classes.user;
  const {subject,cost} =classes;

  const createNewConnection = async () => {
    await api.post('/connections', {
      user_id: id,
    })
  }

  return (
    <article className="teacher-item">
            <header>
              <img
                src={avatar}
                alt={name}
              />
              <div>
                <strong>{name}</strong>
                <span>{subject}</span>
              </div>
            </header>
            <p>{bio}</p>

            <footer>
            <p>Preço/hora
              <strong>{cost}</strong>
            </p>
            <a
              // eslint-disable-next-line react/jsx-no-target-blank
              target="_blank"
              onClick={createNewConnection}
              href={`https://wa.me/${whatsapp}`}
            >
              <img src={whatsappIcon} alt="Whatsapp"/>
              Entrar em contato
            </a>

          </footer>
          </article>
  )

}

export default TeacherItem;


