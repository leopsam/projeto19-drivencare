# projeto19-drivencare

## Escopo do projeto
O objetivo deste projeto é desenvolver uma plataforma de agendamento de consultas médicas que permita que os pacientes agendem consultas com médicos de diferentes especialidades, escolhendo a data e horário disponíveis para cada médico. Os médicos poderão visualizar as consultas agendadas e confirmar ou cancelar cada uma delas. A plataforma também permitirá que os pacientes e médicos visualizem um histórico das consultas agendadas e realizadas.

### **Requisitos Funcionais**

- Os pacientes devem ser capazes de criar uma conta na plataforma e fazer login.
- Os pacientes devem ser capazes de pesquisar médicos por nome, especialidade ou localização.
- Os pacientes devem ser capazes de visualizar as datas e horários disponíveis para cada médico.
- Os pacientes devem ser capazes de agendar uma consulta com um médico, escolhendo a data e horário disponível.
- Os pacientes devem ser capazes de visualizar as consultas agendadas, incluindo a data e horário, nome do médico e especialidade.
- Os médicos devem ser capazes de criar uma conta na plataforma e fazer login.
- Os médicos devem ser capazes de visualizar as consultas agendadas, incluindo a data e horário, nome do paciente e especialidade.
- Os médicos devem ser capazes de confirmar ou cancelar uma consulta agendada.
- Os pacientes e médicos devem ser capazes de visualizar um histórico de consultas realizadas.

### **Requisitos Não Funcionais**

- A plataforma deve ser desenvolvida com a arquitetura de camadas (routes, controllers, services, repositories, schemas, config, middlewares) utilizando Express com JavaScript e PostgreSQL.
- A plataforma deve ser segura e protegida por autenticação e autorização de usuário.
- Não é permitido a utilização de TypeScript.

### **Requisitos Bônus**

- Utilização de Join, Union e Coalesce para associar as tabelas de pacientes, médicos e consultas, por exemplo, e permitir que as informações sejam recuperadas de forma mais eficiente.
- Utilização de On Cascade Delete para garantir a integridade referencial das tabelas e garantir que as consultas associadas a um paciente ou médico sejam excluídas caso o paciente ou médico em si seja excluído.
- Implementação de um sistema de notificação que envie lembretes aos pacientes e médicos sobre as consultas agendadas.
- Implementação de relatórios que permitam que os médicos visualizem informações estatísticas sobre as consultas realizadas, como número de consultas por especialidade, entre outros.
