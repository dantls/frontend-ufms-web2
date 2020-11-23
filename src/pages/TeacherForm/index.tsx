import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';


const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name,setName] = useState('');
  const [whatsapp,setWhatsapp] = useState('');
  const [bio,setBio] = useState('');

  const [subject,setSubject] = useState('');
  const [cost,setCost] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();


  const [scheduleItems, setScheduleItems ]= useState([
    {week_day: 0, from: '', to: '' },
  ])


 function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {week_day: 0, from: '', to: '' },
    ]);
 }
 function setScheduleItemValue(position: number, field: string,value: string){
  const updatedSchedule = scheduleItems.map((scheduleItem , index) =>{
    if(position === index){
      return {...scheduleItem, [field]:value };
    }
    return scheduleItem;
  })
  setScheduleItems(updatedSchedule);
 }

 async function handleCreateClass(event: FormEvent) {
    event.preventDefault();
    try {

        const data = new FormData();

        data.append('name',name);
        data.append('email',whatsapp);
        data.append('whatsapp',bio);

        if(selectedFile){
          data.append('image',selectedFile);
        }

        const response = await api.post('users', data);

        await api.post('classes', {
          user_id: response.data.id,
          subject,
          cost,
          schedule:scheduleItems
        });
       alert('Cadastro realizado com sucesso');

       history.push('/');
    } catch (error) {
      alert('Erro no cadastro');
    }
 }

 return (
   <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />
      <main>
        <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>
          <Input
            name="name"
            label="Nome completo"
            value={name}
            onChange={(event)=>{ setName(event.target.value)}}
          />

          <Dropzone label="Avatar"onFileUploaded={setSelectedFile} />
          <Input
            name="whatsapp"
            label="Whatsapp"
            value={whatsapp}
            onChange={(event)=>{ setWhatsapp(event.target.value)}}
          />
          <Textarea
            name="bio"
            label="Biografia"
            value={bio}
            onChange={(event)=>{ setBio(event.target.value)}}
          />
        </fieldset>
        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>+Novo horário</button>
          </legend>
          {scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week-day"
                  value={scheduleItem.week_day}
                  label="Dia da semana"
                  onChange={event => setScheduleItemValue(index,'week_day', event.target.value)}
                  options={[
                    {value:'0', label: 'Domingo'},
                    {value:'1', label: 'Segunda-feira'},
                    {value:'2', label: 'Terça-feira'},
                    {value:'3', label: 'Quarta-feira'},
                    {value:'4', label: 'Quinta-feira'},
                    {value:'5', label: 'Sexta-feira'},
                    {value:'6', label: 'Sábado'},
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={event => setScheduleItemValue(index,'from', event.target.value)}
                />

                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={event => setScheduleItemValue(index,'to', event.target.value)}
                />

              </div>
            );
          })}


        </fieldset>


        <fieldset>
          <legend>Sobre a aula</legend>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(event)=>{ setSubject(event.target.value)}}
            options={[
              {value:'Artes', label: 'Artes'},
              {value:'Ciências', label: 'Ciências'},
              {value:'Biologia', label: 'Biologia'},
              {value:'História', label: 'História'},
              {value:'Português', label: 'Português'},
            ]}
          />
          <Input
            name="cost"
            label="Custo da sua hora por aula"
            value={cost}
            onChange={(event)=>{ setCost(event.target.value)}}
          />
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="submit">
            Salvar cadastro
          </button>
        </footer>
        </form>
      </main>


   </div>
  )
}

export default TeacherForm;
