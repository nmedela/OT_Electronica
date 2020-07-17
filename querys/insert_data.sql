insert into ot_ebs_db.equipments (id,title) values (0,'TV');
insert into ot_ebs_db.equipments (id,title) values (1,'Microondas');
insert into ot_ebs_db.equipments (id,title) values (2,'Equipo de audio');
insert into ot_ebs_db.equipments (id,title) values (3,'Hornito Electrico');
insert into ot_ebs_db.equipments (id,title) values (4,'Horno Microondas');
insert into ot_ebs_db.equipments (id,title) values (5,'Otro');

insert into ot_ebs_db.status (id,title,icon,color) values (0,'Generada', 'access_time','orange');
insert into ot_ebs_db.status (id,title,icon,color) values (2,'Devuelto','close','red');
insert into ot_ebs_db.status(id,title,icon,color) values (3,'Reparado','check','green');
insert into ot_ebs_db.status(id,title,icon,color) values (4,'Reclamo','error_outline','orange');
insert into ot_ebs_db.status(id,title,icon,color) values (5,'Reclamo resuelto','done_outline','green' );
insert into ot_ebs_db.status(id,title,icon,color) values (6,'Reclamo devuelto','highlight_off','brown');

select * from equipments;
select * from status;